// ============================================================
// MICKYMARVELS LLC — Google Apps Script Backend v2
// ============================================================
// WHY THIS WORKS:
//   Browsers send to Apps Script using fetch() with mode:'no-cors'.
//   This means the Content-Type arrives as 'text/plain;charset=utf-8'
//   (not 'application/json'). This script handles BOTH content types
//   so it works whether called from a browser OR tested directly.
//
// SETUP (one-time, ~10 minutes):
//   1. Go to https://sheets.google.com → New Spreadsheet
//      Name it: MickyMarvels LLC
//   2. Click Extensions → Apps Script
//   3. DELETE all existing code, paste this entire file
//   4. Edit SENDING_EMAIL and RECEIVING_EMAIL below (lines 30–31)
//   5. Click 💾 Save (Ctrl+S)
//   6. Select function "setupSheet" → click ▶ Run
//      → Click "Review permissions" → Advanced → Allow
//   7. Click Deploy → New Deployment
//      → Type: Web App
//      → Execute as: Me
//      → Who has access: Anyone
//      → Click Deploy → Copy the URL
//   8. Paste that URL into index.html → APPS_SCRIPT_URL variable
// ============================================================

// ── YOUR EMAIL ADDRESSES — EDIT THESE TWO LINES ────────────
var SENDING_EMAIL   = "your-sender@gmail.com";    // Sends the emails (must be YOUR Gmail)
var RECEIVING_EMAIL = "your-inbox@gmail.com";     // Gets the lead notification emails
// ───────────────────────────────────────────────────────────

var SHEET_NAME = "MickyMarvels_Leads";

// ── MAIN HANDLER ───────────────────────────────────────────
// Handles POST from browser (no-cors) — content arrives as text/plain
function doPost(e) {
  try {
    var raw = "";

    // Handle both content types:
    // - 'text/plain' = from browser fetch() with no-cors (normal)
    // - 'application/json' = from direct API calls / testing
    if (e.postData && e.postData.contents) {
      raw = e.postData.contents;
    } else if (e.parameter && e.parameter.data) {
      raw = e.parameter.data;
    }

    if (!raw) {
      return respond({ success: false, error: "No data received" });
    }

    var data = JSON.parse(raw);
    var action = data.action || "contact";

    if (action === "contact")  return handleContact(data);
    if (action === "notify")   return handleNotify(data);
    if (action === "send_msg") return handleSendMsg(data);

    return respond({ success: false, error: "Unknown action: " + action });

  } catch (err) {
    // Log error to spreadsheet for debugging
    try {
      var errSheet = getOrCreateSheet("Error_Log");
      errSheet.appendRow([new Date(), err.message, err.stack || ""]);
    } catch(e2) {}
    return respond({ success: false, error: err.message });
  }
}

// GET handler — use this to test the script is deployed correctly
// Visit the Web App URL in your browser — you should see {"success":true}
function doGet(e) {
  return respond({
    success: true,
    message: "MickyMarvels API is live ✓",
    timestamp: new Date().toISOString()
  });
}

// ── CONTACT FORM HANDLER ───────────────────────────────────
function handleContact(data) {
  // 1. Save to Google Sheets
  var sheet = getOrCreateSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) addHeaders(sheet);
  sheet.appendRow([
    new Date(),
    (data.fname || "") + " " + (data.lname || ""),
    data.email  || "",
    data.phone  || "",
    data.service || "",
    data.level  || "",
    data.msg    || "",
    "New",   // Status column
    ""       // Notes column
  ]);

  // 2. Send notification email to you (admin)
  sendAdminNotification(data);

  // 3. Send confirmation email to the person who submitted
  sendConfirmationEmail(data);

  return respond({ success: true, message: "Lead saved, emails sent" });
}

// ── STORE WAITLIST HANDLER ─────────────────────────────────
function handleNotify(data) {
  var sheet = getOrCreateSheet("Store_Waitlist");
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Date Added", "Email"]);
    sheet.getRange(1,1,1,2).setFontWeight("bold").setBackground("#0a1628").setFontColor("#c9a84c");
  }
  sheet.appendRow([new Date(), data.email || ""]);

  // Notify admin
  try {
    GmailApp.sendEmail(
      RECEIVING_EMAIL,
      "🛍️ New Store Waitlist Signup — MickyMarvels",
      (data.email || "Someone") + " just joined the MickyMarvels store waitlist.",
      { from: SENDING_EMAIL, name: "MickyMarvels LLC" }
    );
  } catch(e) {}

  return respond({ success: true, message: "Added to waitlist" });
}

// ── MANUAL EMAIL SEND FROM ADMIN PANEL ────────────────────
function handleSendMsg(data) {
  if (!data.to_email) return respond({ success: false, error: "No recipient email" });

  GmailApp.sendEmail(
    data.to_email,
    data.subject || "Message from MickyMarvels LLC",
    data.body    || "",
    { from: SENDING_EMAIL, name: "MickyMarvels LLC", htmlBody: bodyToHtml(data.body || "") }
  );

  // Log to Messages sheet
  var sheet = getOrCreateSheet("Messages_Log");
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Date","To Name","To Email","Channel","Subject","Preview"]);
    sheet.getRange(1,1,1,6).setFontWeight("bold").setBackground("#1a7a6e").setFontColor("#ffffff");
  }
  sheet.appendRow([
    new Date(),
    data.to_name  || "",
    data.to_email || "",
    data.channel  || "Email",
    data.subject  || "",
    (data.body || "").substring(0, 120)
  ]);

  return respond({ success: true, message: "Email sent and logged" });
}

// ── ADMIN NOTIFICATION EMAIL ───────────────────────────────
function sendAdminNotification(data) {
  var name    = (data.fname || "") + " " + (data.lname || "");
  var subject = "🔔 New Lead: " + name.trim() + " — " + (data.service || "General Inquiry");

  var htmlBody =
    "<div style='font-family:Arial,sans-serif;max-width:600px;margin:0 auto;'>" +
    // Header
    "<div style='background:#0a1628;padding:28px 32px;border-radius:12px 12px 0 0;'>" +
      "<table style='width:100%;'><tr>" +
        "<td><div style='width:40px;height:40px;background:#c9a84c;border-radius:10px;display:inline-flex;align-items:center;justify-content:center;font-size:18px;font-weight:900;color:#0a1628;font-family:Georgia,serif;'>M</div></td>" +
        "<td style='padding-left:12px;'><div style='color:#c9a84c;font-size:18px;font-weight:700;font-family:Georgia,serif;'>MickyMarvels<span style=\"color:white;\"> LLC</span></div><div style='color:rgba(255,255,255,0.5);font-size:12px;margin-top:2px;'>New Lead Notification</div></td>" +
      "</tr></table>" +
    "</div>" +
    // Body
    "<div style='background:#f8f6f0;padding:32px;border:1px solid #e8e8ec;border-top:none;'>" +
      "<div style='background:#fff;border-radius:10px;border:1px solid #e8e8ec;padding:24px;margin-bottom:20px;'>" +
        "<h2 style='margin:0 0 20px;color:#0a1628;font-size:18px;'>🔔 New Contact Form Submission</h2>" +
        "<table style='width:100%;border-collapse:collapse;'>" +
          row_html("Full Name", name.trim()) +
          row_html("Email",    "<a href='mailto:" + (data.email||"") + "' style='color:#1a7a6e;'>" + (data.email||"—") + "</a>") +
          row_html("Phone",    data.phone   || "Not provided") +
          row_html("Service",  data.service || "Not selected") +
          row_html("Level",    data.level   || "Not selected") +
          row_html("Date",     new Date().toLocaleString()) +
        "</table>" +
      "</div>" +
      // Message block
      "<div style='background:#fff;border-radius:10px;border:1px solid #e8e8ec;padding:20px;'>" +
        "<div style='font-size:11px;font-weight:700;color:#9b9bac;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px;'>Message from " + (data.fname||"visitor") + "</div>" +
        "<p style='margin:0;color:#2d2d3a;font-size:14px;line-height:1.7;'>" + (data.msg || "<em style='color:#9b9bac;'>No message provided</em>") + "</p>" +
      "</div>" +
      "<p style='margin-top:20px;font-size:13px;color:#9b9bac;text-align:center;'>Log in to your Admin Dashboard to follow up →</p>" +
    "</div>" +
    // Footer
    "<div style='background:#0a1628;padding:16px;border-radius:0 0 12px 12px;text-align:center;'>" +
      "<p style='margin:0;font-size:11px;color:rgba(255,255,255,0.3);'>© 2025 MickyMarvels LLC · Agile Coaching & Mentoring</p>" +
    "</div>" +
    "</div>";

  try {
    GmailApp.sendEmail(RECEIVING_EMAIL, subject,
      "New lead: " + name.trim() + " (" + (data.email||"") + ") — " + (data.service||"General Inquiry"),
      { from: SENDING_EMAIL, htmlBody: htmlBody, name: "MickyMarvels LLC" }
    );
  } catch(e) {
    Logger.log("Admin email failed: " + e.message);
  }
}

// ── CLIENT CONFIRMATION EMAIL ──────────────────────────────
function sendConfirmationEmail(data) {
  var fname   = data.fname || "there";
  var subject = "✅ We received your message — MickyMarvels LLC";

  var htmlBody =
    "<div style='font-family:Arial,sans-serif;max-width:600px;margin:0 auto;'>" +
    // Header
    "<div style='background:#0a1628;padding:36px;border-radius:12px 12px 0 0;text-align:center;'>" +
      "<div style='width:52px;height:52px;background:#c9a84c;border-radius:14px;display:inline-flex;align-items:center;justify-content:center;font-size:24px;font-weight:900;color:#0a1628;font-family:Georgia,serif;margin-bottom:14px;'>M</div>" +
      "<div style='color:#c9a84c;font-size:24px;font-weight:700;font-family:Georgia,serif;'>MickyMarvels LLC</div>" +
      "<div style='color:rgba(255,255,255,0.5);font-size:13px;margin-top:6px;'>Practical Agile Mentoring for Real-World Success</div>" +
    "</div>" +
    // Body
    "<div style='background:#ffffff;padding:40px;border:1px solid #e8e8ec;border-top:none;'>" +
      "<h2 style='color:#0a1628;margin-top:0;font-size:22px;'>Hi " + fname + "! 👋</h2>" +
      "<p style='color:#5a5a70;font-size:15px;line-height:1.75;margin-bottom:24px;'>Thank you for reaching out to <strong>MickyMarvels LLC</strong>. We've received your message and a real person will get back to you <strong style='color:#0a1628;'>within 24 hours</strong>.</p>" +
      // Service badge
      "<div style='background:#f8f6f0;border-left:4px solid #c9a84c;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:28px;'>" +
        "<div style='font-size:11px;font-weight:700;color:#9b9bac;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;'>Service Requested</div>" +
        "<div style='font-size:15px;font-weight:700;color:#0a1628;'>" + (data.service || "General Inquiry") + "</div>" +
      "</div>" +
      // Next steps
      "<h3 style='color:#0a1628;font-size:16px;margin-bottom:14px;'>What happens next?</h3>" +
      "<table style='width:100%;'>" +
        step_html("1", "#c9a84c", "We review your goals", "We read your message carefully and prepare relevant questions.") +
        step_html("2", "#1a7a6e", "We reach out within 24hrs", "Expect an email or call to discuss your situation.") +
        step_html("3", "#0a1628", "Free discovery call", "A 30-minute no-commitment call to map out a plan.") +
        step_html("4", "#c9a84c", "Your journey begins", "We start your personalized Agile mentoring program.") +
      "</table>" +
      // Reply CTA
      "<div style='background:#0a1628;border-radius:10px;padding:24px;margin-top:28px;text-align:center;'>" +
        "<p style='color:rgba(255,255,255,0.6);font-size:13px;margin:0 0 8px;'>Questions? Just reply to this email or contact us directly</p>" +
        "<a href='mailto:" + SENDING_EMAIL + "' style='color:#c9a84c;font-weight:700;font-size:15px;text-decoration:none;'>" + SENDING_EMAIL + "</a>" +
      "</div>" +
    "</div>" +
    // Footer
    "<div style='background:#f8f6f0;padding:18px;border-radius:0 0 12px 12px;border:1px solid #e8e8ec;border-top:none;text-align:center;'>" +
      "<p style='margin:0;font-size:11px;color:#9b9bac;'>© 2025 MickyMarvels LLC · Agile Coaching & Mentoring · You're receiving this because you submitted our contact form.</p>" +
    "</div>" +
    "</div>";

  var plainText =
    "Hi " + fname + "!\n\n" +
    "We received your inquiry about " + (data.service || "Agile mentoring") + " and will be in touch within 24 hours.\n\n" +
    "— MickyMarvels LLC Team\n" + SENDING_EMAIL;

  try {
    GmailApp.sendEmail(data.email, subject, plainText,
      { from: SENDING_EMAIL, htmlBody: htmlBody, name: "MickyMarvels LLC" }
    );
  } catch(e) {
    Logger.log("Confirmation email failed: " + e.message);
  }
}

// ── HTML HELPERS ───────────────────────────────────────────
function row_html(label, value) {
  return "<tr style='border-bottom:1px solid #f4f4f6;'>" +
    "<td style='padding:10px 12px 10px 0;font-size:11px;color:#9b9bac;text-transform:uppercase;letter-spacing:0.06em;white-space:nowrap;width:100px;font-weight:700;'>" + label + "</td>" +
    "<td style='padding:10px 0;font-size:14px;color:#2d2d3a;font-weight:500;'>" + value + "</td>" +
    "</tr>";
}

function step_html(num, color, title, text) {
  return "<tr><td style='padding:8px 14px 8px 0;vertical-align:top;width:36px;'>" +
    "<div style='width:32px;height:32px;border-radius:50%;background:" + color + ";display:inline-flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:" + (color==='#c9a84c' ? '#0a1628' : '#ffffff') + ";'>" + num + "</div>" +
    "</td><td style='padding:8px 0;vertical-align:top;'>" +
    "<div style='font-size:14px;font-weight:700;color:#0a1628;margin-bottom:2px;'>" + title + "</div>" +
    "<div style='font-size:13px;color:#5a5a70;line-height:1.5;'>" + text + "</div>" +
    "</td></tr>";
}

function bodyToHtml(text) {
  return "<div style='font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#2d2d3a;'>" +
    text.replace(/\n/g, "<br>") + "</div>";
}

// ── SHEET HELPERS ──────────────────────────────────────────
function getOrCreateSheet(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  return sheet;
}

function addHeaders(sheet) {
  sheet.appendRow([
    "Submitted Date","Full Name","Email","Phone",
    "Service","Experience Level","Message","Status","Notes"
  ]);
  var headerRange = sheet.getRange(1, 1, 1, 9);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#0a1628");
  headerRange.setFontColor("#c9a84c");
  headerRange.setFontSize(11);
  sheet.setFrozenRows(1);
  // Auto-resize columns
  for (var i = 1; i <= 9; i++) sheet.autoResizeColumn(i);
}

function respond(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── RUN THIS ONCE TO SET UP ────────────────────────────────
// Select this function in the dropdown → click Run → Authorize
function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // Main leads sheet
  var leads = ss.getSheetByName(SHEET_NAME);
  if (!leads) {
    leads = ss.insertSheet(SHEET_NAME);
    addHeaders(leads);
    Logger.log("✅ Created sheet: " + SHEET_NAME);
  } else {
    Logger.log("ℹ️  Sheet already exists: " + SHEET_NAME);
  }

  // Verify email settings
  if (SENDING_EMAIL.indexOf("your-") !== -1) {
    Logger.log("⚠️  WARNING: Update SENDING_EMAIL and RECEIVING_EMAIL at the top of this script!");
  } else {
    Logger.log("✅ Email settings look good.");
    Logger.log("   Sending from: " + SENDING_EMAIL);
    Logger.log("   Sending to:   " + RECEIVING_EMAIL);
  }

  Logger.log("✅ Setup complete. Now deploy as Web App.");
}

// ── OPTIONAL: TEST EMAIL SENDING ───────────────────────────
// Run this function to send a test email and verify everything works
function testEmailSending() {
  sendAdminNotification({
    fname: "Test", lname: "User",
    email: RECEIVING_EMAIL,
    phone: "+1 555 000 0000",
    service: "Agile Coaching",
    level: "Intermediate (1–3 years)",
    msg: "This is a test submission from Google Apps Script. If you received this, emails are working correctly! ✅"
  });
  sendConfirmationEmail({
    fname: "Test",
    email: RECEIVING_EMAIL,
    service: "Agile Coaching"
  });
  Logger.log("✅ Test emails sent to: " + RECEIVING_EMAIL);
}
