// ============================================================
// MICKYMARVELS LLC — Twilio SMS & WhatsApp Proxy v2
// ============================================================
// Deploy FREE to Vercel: npm install -g vercel → vercel deploy
// Set env vars in Vercel dashboard then vercel deploy --prod
// ============================================================

const express = require('express');
const cors    = require('cors');
const app     = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'ok', service: 'MickyMarvels Twilio Proxy v2',
    configured: !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN)
  });
});

// Format any phone to E.164 (+1XXXXXXXXXX)
function formatE164(phone) {
  if (!phone) return null;
  const d = phone.replace(/\D/g, '');
  if (d.length === 10) return '+1' + d;
  if (d.length === 11 && d[0] === '1') return '+' + d;
  if (d.length > 11) return '+' + d;
  return null;
}

function getTwilio() {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const tok = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !tok) throw new Error('Twilio credentials not set in env vars');
  return require('twilio')(sid, tok);
}

// SEND SMS
app.post('/send-sms', async (req, res) => {
  try {
    const { to, message } = req.body;
    if (!to || !message) return res.status(400).json({ success: false, error: 'Missing: to, message' });
    const formatted = formatE164(to);
    if (!formatted) return res.status(400).json({ success: false, error: 'Invalid phone format. Use +1XXXXXXXXXX' });
    const fromPhone = process.env.TWILIO_FROM_PHONE;
    if (!fromPhone) return res.status(500).json({ success: false, error: 'TWILIO_FROM_PHONE not set' });

    const client = getTwilio();
    const msg = await client.messages.create({ body: message, from: fromPhone, to: formatted });
    console.log('[SMS OK]', formatted, msg.sid);
    res.json({ success: true, sid: msg.sid, to: formatted });
  } catch (err) {
    console.error('[SMS ERR]', err.code, err.message);
    const friendly = {
      21211: 'Invalid phone number format',
      21608: 'Phone not in Twilio Verified Caller IDs (trial accounts)',
      20003: 'Invalid Twilio credentials',
    }[err.code] || err.message;
    res.status(500).json({ success: false, error: friendly, code: err.code });
  }
});

// SEND WHATSAPP
app.post('/send-whatsapp', async (req, res) => {
  try {
    const { to, message } = req.body;
    if (!to || !message) return res.status(400).json({ success: false, error: 'Missing: to, message' });
    const formatted = formatE164(to);
    if (!formatted) return res.status(400).json({ success: false, error: 'Invalid phone format' });

    const toWA   = 'whatsapp:' + formatted;
    const fromWA = process.env.TWILIO_WA_FROM || 'whatsapp:+14155238886';

    const client = getTwilio();
    const msg = await client.messages.create({ body: message, from: fromWA, to: toWA });
    console.log('[WA OK]', toWA, msg.sid);
    res.json({ success: true, sid: msg.sid, to: toWA });
  } catch (err) {
    console.error('[WA ERR]', err.code, err.message);
    const friendly = {
      63007: 'Recipient must join WhatsApp sandbox first: text "join <word>" to +1 415 523 8886',
      21211: 'Invalid phone number',
    }[err.code] || err.message;
    res.status(500).json({ success: false, error: friendly, code: err.code });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('MickyMarvels Proxy on port', PORT));
module.exports = app;
