import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.RESEND_API_KEY;

const isPlaceholder = (val) => {
  return !val || val.trim() === '' || val.includes('your_resend');
};

export const isMockMode = isPlaceholder(apiKey);

let resend = null;

if (!isMockMode) {
  resend = new Resend(apiKey);
}

export default resend;
