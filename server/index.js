import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import emailjs from '@emailjs/nodejs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// Middleware
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'DoConnect Email API'
  });
});

// Send Email Endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;

    // Input Validation
    if (!name || !email || !mobile || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields. Please provide name, email, mobile, and message.'
      });
    }

    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    const isPlaceholderKey =
      !serviceId ||
      !templateId ||
      !publicKey ||
      serviceId.includes('your_emailjs') ||
      templateId.includes('your_emailjs') ||
      publicKey.includes('your_emailjs');

    const templateParams = {
      from_name: name,
      from_email: email,
      mobile: mobile,
      message: message,
      submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    if (isPlaceholderKey) {
      console.log('----------------------------------------------------');
      console.log('📧 [MOCK EMAIL SENT - EmailJS credentials not set in server/.env]');
      console.log('To send actual emails, update EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID & EMAILJS_PUBLIC_KEY in server/.env');
      console.log('Payload:', templateParams);
      console.log('----------------------------------------------------');

      return res.status(200).json({
        success: true,
        message: 'Enquiry received successfully! (Simulated mode: update EmailJS credentials in server/.env for production email delivery)',
        data: templateParams,
        isMock: true
      });
    }

    // Actual EmailJS dispatch using @emailjs/nodejs
    const options = { publicKey };
    if (privateKey && !privateKey.includes('your_emailjs')) {
      options.privateKey = privateKey;
    }

    const emailResponse = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      options
    );

    console.log('✅ EmailJS dispatch successful:', emailResponse.status, emailResponse.text);

    return res.status(200).json({
      success: true,
      message: 'Enquiry sent successfully via EmailJS!',
      status: emailResponse.status
    });

  } catch (error) {
    console.error('❌ Error sending email via EmailJS:', error);

    return res.status(500).json({
      success: false,
      error: error.text || error.message || 'Failed to send email enquiry'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 DoConnect EmailJS Backend Server running on http://localhost:${PORT}`);
  console.log(`📡 Accepting requests from ${CORS_ORIGIN}`);
});
