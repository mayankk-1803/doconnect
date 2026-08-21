import express from 'express';
import rateLimit from 'express-rate-limit';
import { handleContactSubmit } from '../controllers/contactController.js';

const router = express.Router();

// Rate limiting: 5 contact form submissions max per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    success: false,
    message: 'Too many enquiries from this IP. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/contact', contactLimiter, handleContactSubmit);

export default router;
