import emailService from '../services/emailService.js';

/**
 * Handle contact form submission using Resend API integration
 */
export const handleContactSubmit = async (req, res, next) => {
  try {
    const { name, email, phone, mobile, service, message } = req.body;

    // 1. Sanitize incoming inputs by trimming whitespace
    const cleanName = typeof name === 'string' ? name.trim() : '';
    const cleanEmail = typeof email === 'string' ? email.trim() : '';
    const cleanPhone = typeof phone === 'string' ? phone.trim() : (typeof mobile === 'string' ? mobile.trim() : '');
    const cleanService = typeof service === 'string' ? service.trim() : '';
    const cleanMessage = typeof message === 'string' ? message.trim() : '';

    // 2. Validation
    if (!cleanName) {
      return res.status(400).json({ success: false, message: 'Name is required.' });
    }

    if (!cleanEmail) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    if (!cleanPhone) {
      return res.status(400).json({ success: false, message: 'Phone number is required.' });
    }

    if (!cleanService) {
      return res.status(400).json({ success: false, message: 'Service name is required.' });
    }

    if (!cleanMessage) {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    if (cleanMessage.length < 5) {
      return res.status(400).json({ success: false, message: 'Message must be at least 5 characters long.' });
    }

    const payload = {
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      service: cleanService,
      message: cleanMessage,
    };

    console.log(`📩 Processing Resend enquiry from ${cleanName} (${cleanEmail})`);

    // 3. Send business enquiry email
    try {
      await emailService.sendBusinessEnquiryEmail(payload);
    } catch (err) {
      console.error(`Email delivery failed: ${err.message || err}`);
      return res.status(500).json({
        success: false,
        message: "We couldn't submit your request right now. Please try again.",
      });
    }

    // 4. Send customer thank-you confirmation email
    try {
      await emailService.sendCustomerThankYouEmail(cleanName, cleanEmail);
    } catch (err) {
      // Log error but proceed or report safely depending on criticality.
      // Since it's requested not to tell frontend success if the email failed:
      console.error(`Email delivery failed: ${err.message || err}`);
      return res.status(500).json({
        success: false,
        message: "We couldn't submit your request right now. Please try again.",
      });
    }

    // 5. Return success JSON response to frontend
    return res.status(200).json({
      success: true,
      message: 'Your enquiry has been received successfully. Our team will connect with you within 24 hours.',
    });

  } catch (error) {
    // Global fallback error logging
    console.error('❌ Contact controller error:', error);
    
    return res.status(500).json({
      success: false,
      message: "We couldn't process your request right now. Please try again later.",
    });
  }
};
