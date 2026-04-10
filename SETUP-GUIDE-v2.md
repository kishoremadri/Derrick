╔══════════════════════════════════════════════════════════════════╗
║         MICKYMARVELS LLC — COMPLETE SETUP GUIDE v2              ║
║         Email + SMS + WhatsApp + Admin + Ads + Hosting           ║
║         Estimated time: 45–60 minutes total · All Free           ║
╚══════════════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 HOW TO ACCESS THE ADMIN PANEL (customers cannot see this)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

 The Admin button is HIDDEN from all visitors.

 TO OPEN ADMIN:
   Option 1 (Keyboard):  Press  Ctrl + Shift + A  (Windows/Linux)
                                 Cmd  + Shift + A  (Mac)
                         → A gold toast appears: "Admin mode unlocked"
                         → You go straight to the login screen

   Option 2 (URL):       Go to:  https://yoursite.com#admin-access

 ADMIN LOGIN:
   Username: admin
   Password: admin123   ← Change this in index.html → ADMIN_PASSWORD

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 PART 1 — GOOGLE APPS SCRIPT (EMAIL + GOOGLE SHEETS)
 Time: ~15 minutes · Cost: FREE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

 WHAT YOU NEED FIRST:
   ✉ Gmail Account A = your SENDING email (sends confirmation + notifications)
   ✉ Gmail Account B = your RECEIVING email (gets lead notification emails)
   These can be the same account if you prefer.

 ─── STEP 1: Create the Google Spreadsheet ───────────────────────

   1. Open: https://sheets.google.com
   2. Click the big  [+]  button (Blank spreadsheet)
   3. At the top left, click "Untitled spreadsheet"
   4. Type the name:  MickyMarvels LLC
   5. Press Enter
   ✅ You now have a blank Google Sheet. Keep this tab open.

 ─── STEP 2: Open Google Apps Script ─────────────────────────────

   1. In your Google Sheet, click the menu:  Extensions
   2. Click:  Apps Script
   3. A new browser tab opens — this is the code editor
   4. You'll see some existing code like:
        function myFunction() {
        }
   5. SELECT ALL of that code (Ctrl+A) and DELETE it
   ✅ The editor is now empty.

 ─── STEP 3: Paste the Script ─────────────────────────────────────

   1. Open the file:  google-apps-script-v2.js  (from your download)
   2. Select ALL the code in that file (Ctrl+A)
   3. Copy it (Ctrl+C)
   4. Click back in the Apps Script editor
   5. Paste (Ctrl+V)
   6. Find lines 30–31 near the top:

        var SENDING_EMAIL   = "your-sender@gmail.com";
        var RECEIVING_EMAIL = "your-inbox@gmail.com";

   7. Replace them with your actual Gmail addresses:

        var SENDING_EMAIL   = "mickymarvels.send@gmail.com";
        var RECEIVING_EMAIL = "yourinbox@gmail.com";

   8. Click 💾 Save  (or press Ctrl+S)
   ✅ The script is saved.

 ─── STEP 4: Run Setup (First Time Authorization) ─────────────────

   1. Find the dropdown that says "Select function" at the top
   2. Click it → choose  setupSheet
   3. Click the  ▶ Run  button (triangle/play icon)
   4. A popup appears: "Authorization required"
   5. Click  "Review permissions"
   6. Choose your SENDING Gmail account
   7. You'll see a scary-looking screen: "Google hasn't verified this app"
   8. Click  "Advanced"  (bottom left)
   9. Click  "Go to MickyMarvels LLC (unsafe)"
   10. Read the permissions → Click  "Allow"
   11. Click ▶ Run again
   12. In the bottom panel, you should see:
         ✅ Created sheet: MickyMarvels_Leads
         ✅ Email settings look good.
   ✅ Setup complete!

   💡 TIP: If you see a warning about email settings, go back and
      update SENDING_EMAIL and RECEIVING_EMAIL (Step 3, lines 30-31)

 ─── STEP 5: Test Emails Work ─────────────────────────────────────

   Before deploying, test that emails actually send:

   1. In the function dropdown, choose  testEmailSending
   2. Click  ▶ Run
   3. Check your RECEIVING_EMAIL inbox — you should get:
      ✉ An admin notification email (with table of lead details)
      ✉ A client confirmation email (the one visitors receive)
   4. Check Spam folder if not in inbox
   ✅ If both emails arrived, everything is working!

 ─── STEP 6: Deploy as Web App ────────────────────────────────────

   1. Click  Deploy  (top right button)
   2. Click  New deployment
   3. Click the gear icon ⚙ next to "Type"
   4. Select  Web app
   5. Fill in the form:
        Description:          MickyMarvels v1
        Execute as:           Me (your Google Account)
        Who has access:       Anyone
   6. Click  Deploy
   7. A green success message appears with your Web App URL:
      https://script.google.com/macros/s/AKfycby.../exec
   8. Click  Copy  to copy the URL
   ✅ SAVE THIS URL — you need it in the next step!

 ─── STEP 7: Add URL to Your Website ──────────────────────────────

   1. Open  index.html  in a text editor (Notepad, VS Code, etc.)
   2. Near the top, find this line:

        var APPS_SCRIPT_URL = "PASTE_YOUR_APPS_SCRIPT_URL_HERE";

   3. Replace it with your actual URL from Step 6:

        var APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby.../exec";

   4. Save the file (Ctrl+S)

 ─── STEP 8: Test the Full Flow ───────────────────────────────────

   1. Open index.html in your browser (double-click the file)
   2. Go to the  Contact  page
   3. Fill in ALL fields including a real email and phone number
   4. Check the consent checkbox
   5. Click  Send Message
   6. The form should show the success screen
   7. Check your RECEIVING_EMAIL inbox — lead notification should arrive
   8. Check the submitted email's inbox — confirmation should arrive
   9. Open your Google Sheet — a new row should appear
   ✅ Email integration is complete and working!

 ─── TROUBLESHOOTING EMAILS ───────────────────────────────────────

   ❌ "Apps Script URL not configured" toast:
      → Check that you replaced the placeholder URL in index.html

   ❌ Form shows success but no email received:
      → Check Spam folder
      → Run testEmailSending in Apps Script to verify script works
      → Re-deploy Apps Script (Deploy → Manage Deployments → Edit → Deploy)

   ❌ "Script function not found" in Apps Script:
      → Make sure you pasted the ENTIRE google-apps-script-v2.js file

   ❌ Emails arrive but Google Sheet is empty:
      → Run setupSheet again
      → Make sure the spreadsheet is still open/accessible

   ⚠️  "Opaque" response in browser console — THIS IS NORMAL
      → no-cors fetch always returns opaque response
      → The script DOES execute even with opaque response
      → Data IS saved to Sheets and emails ARE sent


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 PART 2 — TWILIO SMS & WHATSAPP
 Time: ~20 minutes · Cost: FREE ($15 trial credit)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

 ─── STEP 1: Create Free Twilio Account ───────────────────────────

   1. Go to:  https://www.twilio.com/try-twilio
   2. Fill in:  First name, Last name, Email, Password
   3. Click  Start your free trial
   4. Verify your email (click the link they send)
   5. Enter your phone number for verification
   6. Enter the SMS verification code they send
   7. Answer: "What are you building?" → Choose SMS Notifications
   8. Click  Get Started with Twilio
   ✅ You're in! You have $15 free credit automatically.

 ─── STEP 2: Get Your Credentials ─────────────────────────────────

   1. You're on the Twilio Console: https://console.twilio.com
   2. On the dashboard, find the box labeled "Account Info"
   3. You'll see:
        Account SID:   ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   [Copy]
        Auth Token:    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx     [Copy] (click to reveal)
   4. Copy BOTH values and save them somewhere safe
   ✅ You'll need these for Vercel environment variables

 ─── STEP 3: Get a Free Phone Number ──────────────────────────────

   1. In Twilio Console left sidebar:  Phone Numbers → Manage → Buy a number
   2. In the search, make sure "SMS" checkbox is checked
   3. Search for a US area code (e.g., your area)
   4. Click  Buy  on any number (costs ~$1.15/month from your free credit)
   5. Click  Buy This Number  to confirm
   6. Your number appears:  +1XXXXXXXXXX
   7. Copy this number
   ✅ This is your TWILIO_FROM_PHONE

 ─── STEP 4: Set Up WhatsApp Sandbox (Free Testing) ───────────────

   1. In left sidebar:  Messaging → Try it out → Send a WhatsApp message
   2. You'll see the Sandbox setup page
   3. The sandbox number is:  +1 415 523 8886
   4. You'll see a JOIN code like:  join apple-mango
      (yours will be different random words)
   5. On your phone:
      → Open WhatsApp
      → Start a new chat with:  +1 415 523 8886
      → Type exactly:  join apple-mango   (use your actual code)
      → Send it
   6. You'll get a reply: "Ahoy! You've joined the sandbox..."
   ✅ Your phone is connected to the WhatsApp sandbox

   ⚠️  IMPORTANT for Twilio Trial Accounts:
      SMS can only be sent to VERIFIED phone numbers.
      To add a verified number:
      → Twilio Console → Phone Numbers → Manage → Verified Caller IDs
      → Click the + button → Enter the phone number → Verify via SMS
      (Add your phone and any client phones you want to test with)

 ─── STEP 5: Install Node.js ──────────────────────────────────────

   1. Go to:  https://nodejs.org
   2. Click the  LTS  version (recommended, left button)
   3. Download and run the installer
   4. Click Next through all screens (defaults are fine)
   5. Open a new Terminal / Command Prompt
   6. Type:  node --version
   7. Should show something like:  v20.x.x
   ✅ Node.js is installed

 ─── STEP 6: Install Vercel CLI ───────────────────────────────────

   1. In your Terminal / Command Prompt, type:
      npm install -g vercel
   2. Wait for it to finish (30-60 seconds)
   3. Type:  vercel --version
   4. Should show:  Vercel CLI 32.x.x or similar
   ✅ Vercel CLI is installed

 ─── STEP 7: Install Proxy Dependencies ───────────────────────────

   1. Navigate to the twilio-proxy folder:
      cd path/to/your/twilio-proxy
      (On Windows: cd C:\Users\YourName\Downloads\mickymarvels\twilio-proxy)
      (On Mac:     cd ~/Downloads/mickymarvels/twilio-proxy)
   2. Run:  npm install
   3. Wait for it to finish (you'll see a node_modules folder appear)
   ✅ Dependencies installed

 ─── STEP 8: Log In to Vercel ─────────────────────────────────────

   1. In Terminal:  vercel login
   2. Choose:  Continue with Email
   3. Enter your email address
   4. Vercel sends you a verification email → click the link
   5. Terminal should say:  Success! Email confirmed
   ✅ Logged in to Vercel

 ─── STEP 9: Deploy to Vercel ─────────────────────────────────────

   1. Make sure you're in the twilio-proxy folder in Terminal
   2. Type:  vercel deploy
   3. A series of questions appears:
      - "Set up and deploy ~/twilio-proxy?" → Press  Y  Enter
      - "Which scope?" → Choose your account → Press Enter
      - "Link to existing project?" → Press  N  Enter
      - "What's your project's name?" → Type  mickymarvels-proxy  Enter
      - "In which directory is your code located?" → Press Enter (current folder)
      - "Want to override settings?" → Press  N  Enter
   4. Vercel uploads and deploys (30-60 seconds)
   5. You'll see a URL like:
      ✅ Preview:  https://mickymarvels-proxy-abc123.vercel.app
   ✅ Note: This is a preview URL — we'll get the production URL next

 ─── STEP 10: Add Twilio Environment Variables in Vercel ──────────

   1. Go to:  https://vercel.com
   2. Sign in → Click your project  mickymarvels-proxy
   3. Click the  Settings  tab
   4. Click  Environment Variables  in the left sidebar
   5. Add each variable below (click  Add  after each one):

      Name:  TWILIO_ACCOUNT_SID
      Value: ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   ← your Account SID

      Name:  TWILIO_AUTH_TOKEN
      Value: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx    ← your Auth Token

      Name:  TWILIO_FROM_PHONE
      Value: +1XXXXXXXXXX                        ← your Twilio phone number

      Name:  TWILIO_WA_FROM
      Value: whatsapp:+14155238886               ← the sandbox number

   6. After adding all 4, click  Save

 ─── STEP 11: Re-deploy with Environment Variables ────────────────

   1. In Terminal, run:  vercel deploy --prod
   2. Wait for deployment (30 seconds)
   3. You'll see a production URL:
      ✅ Production:  https://mickymarvels-proxy.vercel.app
   4. Copy this URL
   ✅ Your proxy is live!

 ─── STEP 12: Test the Proxy ──────────────────────────────────────

   1. Open your browser
   2. Visit:  https://mickymarvels-proxy.vercel.app
   3. You should see:
        {"status":"ok","service":"MickyMarvels Twilio Proxy v2","configured":true}
   4. If  "configured":false  → check your environment variables (Step 10)
   ✅ Proxy is working!

 ─── STEP 13: Add Proxy URL to Your Website ───────────────────────

   1. Open  index.html  in your text editor
   2. Find these two lines near the top:

        var TWILIO_PROXY_URL  = "";
        var WHATSAPP_PROXY_URL= "";

   3. Replace them with your Vercel URL:

        var TWILIO_PROXY_URL  = "https://mickymarvels-proxy.vercel.app/send-sms";
        var WHATSAPP_PROXY_URL= "https://mickymarvels-proxy.vercel.app/send-whatsapp";

   4. Save the file
   ✅ SMS and WhatsApp are now connected!

 ─── STEP 14: Test SMS + WhatsApp ─────────────────────────────────

   1. Open index.html → Contact page
   2. Fill in a VERIFIED phone number (from Twilio Verified Caller IDs)
   3. Submit the form
   4. Within 30 seconds, your phone should receive:
      📱 An SMS: "Hi [Name]! MickyMarvels LLC received your inquiry..."
      💬 A WhatsApp: "Hello [Name] 👋 Thank you for reaching out..."
   ✅ SMS and WhatsApp are fully working!

 ─── TROUBLESHOOTING SMS/WHATSAPP ─────────────────────────────────

   ❌ "configured: false" on proxy health check:
      → Re-add environment variables in Vercel → Redeploy

   ❌ SMS received but wrong format / empty:
      → Check that phone number is in your Verified Caller IDs

   ❌ WhatsApp: "join the sandbox" error:
      → Recipient must text "join [word]" to +1 415 523 8886 first

   ❌ Error code 21608 (Trial account restriction):
      → Add the recipient's phone to:
        Twilio Console → Phone Numbers → Verified Caller IDs

   ❌ "TWILIO_FROM_PHONE not set" error:
      → Check environment variables in Vercel dashboard
      → Make sure value starts with + (e.g., +15550001234)
      → Redeploy after adding variables


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 PART 3 — ADDING ADS (GOOGLE ADSENSE)
 Time: ~10 minutes setup + waiting for approval
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

 The website already has 2 ad slots built in.
 They show "Advertisement — placeholder" until you paste real ad code.

 AD SLOT LOCATIONS:
   Ad Slot 1:  Between the Services section and How It Works (home page)
   Ad Slot 2:  Between Testimonials and the CTA band (home page)

 TO APPLY FOR GOOGLE ADSENSE:
   1. Your website must be LIVE on the internet first (not local file)
   2. Go to:  https://adsense.google.com
   3. Click  Get Started
   4. Enter your live website URL
   5. Choose your payment country
   6. Review and accept terms
   7. Google reviews your site (can take 1-14 days)
   8. Once approved, you get a Publisher ID:  ca-pub-XXXXXXXXXXXXXXXX

 TO ACTIVATE ADS AFTER APPROVAL:
   1. In AdSense → Ads → By ad unit → Create new ad unit
   2. Choose:  Display ads  (auto-sizing)
   3. Name it:  MickyMarvels Home Slot 1
   4. Click  Create
   5. Copy the code they give you (looks like):
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
        <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" data-ad-slot="XXXXXXXXXX" data-ad-format="auto" data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>

   6. In index.html, find Ad Slot 1:
        <!-- PASTE GOOGLE ADSENSE CODE HERE (replace the placeholder below) -->
        <div class="ad-placeholder">
   7. Delete the <div class="ad-placeholder">...</div> block
   8. Paste your AdSense code in its place
   9. In the <head> section, add the AdSense script tag (first line above)
   10. Repeat for Ad Slot 2

 ALTERNATIVE AD NETWORKS (no approval wait):
   - Carbon Ads (tech/developer audience):  https://www.carbonads.net
   - BuySellAds:                            https://www.buysellads.com
   - Media.net (Yahoo/Bing):               https://www.media.net
   - PropellerAds:                          https://www.propellerads.com

 AFFILIATE ADVERTISING (earn commissions):
   - Agile/Scrum course platforms:
     • Udemy Affiliate:        https://www.udemy.com/affiliate
     • Coursera Affiliate:     https://www.coursera.org/business/affiliate
     • LinkedIn Learning:      partner.linkedin.com
   - Book recommendations:
     • Amazon Associates:      https://affiliate-program.amazon.com
   
   For affiliate links, find a relevant product and replace the
   ad placeholder with a styled affiliate card or banner.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 PART 4 — HOSTING YOUR WEBSITE FREE
 Time: ~5 minutes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

 OPTION A — NETLIFY (Recommended, easiest)

   1. Go to:  https://www.netlify.com
   2. Click  Sign up → Continue with Email
   3. Create account and verify email
   4. On the dashboard, find the box:
      "Import an existing project" or "Deploy manually"
   5. Scroll down to:  "Want to deploy a new site without connecting to Git?"
   6. See the dotted box:  "Drag and drop your site folder here"
   7. Drag your entire  mickymarvels  folder onto that box
      (the folder containing index.html)
   8. Wait 30 seconds
   9. ✅ Your site is LIVE at:  https://random-name.netlify.app

   TO SET A CUSTOM DOMAIN (optional, ~$12/year):
   1. Buy domain at:  https://www.namecheap.com
      → Search for "mickymarvels.com" or similar
   2. In Netlify:  Site settings → Domain management → Add custom domain
   3. Type your domain → Verify → Set up DNS
   4. Netlify gives you DNS records to add at Namecheap
   5. SSL certificate is automatic and free
   ✅ Your site is live at:  https://www.mickymarvels.com

 OPTION B — GITHUB PAGES (Free, needs GitHub account)

   1. Create account at:  https://github.com
   2. Click  +  → New repository
   3. Name:  mickymarvels
   4. Set to  Public  → Create repository
   5. Upload your files:  Click  uploading an existing file
   6. Drag index.html onto the upload area → Commit changes
   7. Go to:  Settings → Pages
   8. Source:  Deploy from a branch → main → /(root)
   9. Click  Save
   10. ✅ Live at:  https://YOURUSERNAME.github.io/mickymarvels

 IMPORTANT AFTER GOING LIVE:
   Update your Google Apps Script deployment URL if your domain changes.
   Re-deploy Apps Script: Deploy → Manage Deployments → Edit → Deploy


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 PART 5 — GOOGLE ANALYTICS (Optional but Recommended)
 Time: ~10 minutes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   1. Go to:  https://analytics.google.com
   2. Click  Start measuring
   3. Account name:  MickyMarvels LLC → Next
   4. Property name:  MickyMarvels Website → Next
   5. Business info → Next → Create
   6. Choose  Web  platform
   7. Enter your website URL and stream name
   8. You get a Measurement ID:  G-XXXXXXXXXX  → Copy it
   9. Open index.html, find this section near the top:

        <!-- Google Analytics GA4 - replace G-XXXXXXXXXX with your Measurement ID -->
        <!-- <script async ...

   10. REMOVE the <!-- and --> comment markers to uncomment it
   11. Replace  G-XXXXXXXXXX  with your actual Measurement ID
   12. Save and re-upload to Netlify
   ✅ Analytics tracking is live!


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 QUICK REFERENCE — FILL IN YOUR VALUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

 Fill this in as you complete each step:

 Website URL:
   https://________________________________

 Google Apps Script URL:
   https://script.google.com/macros/s/_______________________/exec

 Twilio Proxy URL:
   https://________________________________.vercel.app

 Sending Gmail:
   _______________________________@gmail.com

 Receiving Gmail:
   _______________________________@gmail.com

 Twilio Account SID:
   AC_____________________________________

 Twilio Auth Token:
   _______________________________________

 Twilio Phone Number:
   +1_____________________________________

 Google Analytics ID:
   G-_____________________________________

 Admin Password (change from admin123):
   _______________________________________


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 FINAL CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

 Google Apps Script:
   ☐ Script pasted and saved
   ☐ SENDING_EMAIL and RECEIVING_EMAIL updated
   ☐ setupSheet run successfully
   ☐ testEmailSending — both emails received ✅
   ☐ Deployed as Web App (Anyone access)
   ☐ Web App URL pasted into index.html → APPS_SCRIPT_URL

 Twilio:
   ☐ Account created (free $15 credit)
   ☐ Phone number purchased
   ☐ WhatsApp sandbox joined from test phone
   ☐ Twilio proxy deployed to Vercel
   ☐ 4 environment variables set in Vercel
   ☐ Redeployed with --prod flag
   ☐ Proxy health check shows "configured: true" ✅
   ☐ Proxy URLs pasted into index.html

 Admin:
   ☐ ADMIN_PASSWORD changed from default
   ☐ Tested Ctrl+Shift+A unlock
   ☐ Admin login working
   ☐ Lead submitted → appears in Leads tab
   ☐ Message sent from admin → logged in Messages tab
   ☐ Monthly report generating correctly

 Ads:
   ☐ AdSense application submitted (or alternative ad network chosen)
   ☐ Ad placeholder shows correctly on home page
   ☐ Real ad code pasted after approval

 Hosting:
   ☐ Site deployed to Netlify or GitHub Pages
   ☐ Live URL working in browser
   ☐ Custom domain connected (if purchased)
   ☐ SSL certificate active (https://)

 Analytics:
   ☐ Google Analytics ID added to index.html
   ☐ Test visit tracked in Analytics dashboard

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 COST SUMMARY — EVERYTHING FREE TO START
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

 Service                    Monthly Cost
 ─────────────────────────────────────────────────────────────
 Google Apps Script          FREE — unlimited
 Google Sheets               FREE — unlimited rows
 Twilio Trial Credit         FREE $15 (~600+ SMS messages)
 Twilio SMS (after trial)    ~$0.0079 per message
 Twilio WhatsApp             FREE sandbox / ~$0.005 per msg
 Vercel Proxy Hosting        FREE (Hobby plan, 100GB/month)
 Netlify Website Hosting     FREE (100GB/month)
 GitHub                      FREE
 Google Analytics            FREE
 Domain (optional)           ~$12/year (one-time)
 SSL Certificate             FREE (included with Netlify)
 ─────────────────────────────────────────────────────────────
 TOTAL TO LAUNCH:            $0.00
