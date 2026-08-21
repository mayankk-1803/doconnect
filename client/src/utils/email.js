/**
 * Submits contact enquiry to the Node.js backend server via POST request
 * @param {Object} data - Form input data containing name, email, mobile, and message
 * @returns {Promise<Object>} Response object from the server
 */
export const sendEmailEnquiry = async (data) => {
  const BACKEND_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const payload = {
    name: data.name,
    email: data.email,
    phone: data.mobile || data.phone || '',
    service: data.service || 'General Inquiry',
    message: data.message
  };

  try {
    const response = await fetch(`${BACKEND_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to send enquiry via email');
    }

    return result;
  } catch (error) {
    console.error('API Error in sendEmailEnquiry:', error);
    throw error;
  }
};
