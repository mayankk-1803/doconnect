import { BRAND_CONFIG } from '../constants';

/**
 * Generates a WhatsApp URL with pre-filled content based on the CTA type
 * @param {string} type - The type of CTA ('quote', 'plan', 'contact', 'hospital', 'advisor', 'general')
 * @param {Object} data - Content details for the pre-filled template
 * @returns {string} - WhatsApp redirect URL
 */
export const generateWhatsAppLink = (type, data = {}) => {
  const phone = BRAND_CONFIG.whatsappNumber;
  let text = '';

  switch (type) {
    case 'quote':
      text = `Hello,

I'm interested in a Health Insurance Plan.

Name: ${data.name || 'N/A'}
Mobile: ${data.mobile || 'N/A'}
Email: ${data.email || 'N/A'}
Age: ${data.age || 'N/A'}
City: ${data.city || 'N/A'}
Coverage Amount: ${data.coverage || 'N/A'}
Family Members: ${data.familyMembers || 'N/A'}
Smoking Status: ${data.smokingStatus || 'No'}

Please assist me with the best available options.`;
      break;

    case 'plan':
      text = `Hello,

I'm interested in purchasing this specific Health Insurance Plan:

Plan Name: ${data.planName || 'N/A'}
Insurance Provider: ${data.companyName || 'N/A'}
Estimated Premium: ₹${data.premium || 'N/A'}/year
Coverage: ₹${data.coverage || 'N/A'}
Claim Settlement Ratio: ${data.claimRatio || 'N/A'}

Please guide me with the purchase process.`;
      break;

    case 'hospital':
      text = `Hello,

I want to check cashless hospital network details:

Hospital Name: ${data.hospitalName || 'N/A'}
City: ${data.city || 'N/A'}
Insurers Accepted: ${data.insurers || 'All'}

Is cashless hospital admission pre-approved for my plan?`;
      break;

    case 'contact':
      text = `Hello,

I'm submitting a contact inquiry from your website.

Name: ${data.name || 'N/A'}
Mobile: ${data.mobile || 'N/A'}
Email: ${data.email || 'N/A'}
Message: ${data.message || 'N/A'}`;
      break;

    case 'advisor':
      text = `Hello,

I need to consult an insurance expert to choose the right policy.

Name: ${data.name || 'Visitor'}
Contact Mobile: ${data.mobile || 'N/A'}
Subject: ${data.subject || 'Free Consultation'}

Please call me back.`;
      break;

    default:
      text = `Hello SecureHealth,

I am interested in exploring Health Insurance plans. Please connect me with a senior advisor.`;
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};

/**
 * Triggers a page redirect to WhatsApp with a brief delay (for toasts to display)
 * @param {string} type 
 * @param {Object} data 
 */
export const redirectToWhatsApp = (type, data = {}) => {
  const url = generateWhatsAppLink(type, data);
  window.open(url, '_blank', 'noopener,noreferrer');
};
