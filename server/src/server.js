import app from './app.js';
import { isMockMode } from './config/resend.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Doconnect Services Backend running on http://localhost:${PORT}`);
  if (isMockMode) {
    console.log('📧 running in MOCK MAILER mode (RESEND_API_KEY not configured in .env)');
  } else {
    console.log('📧 running in REAL MAILER mode (Resend API client configured)');
  }
});
