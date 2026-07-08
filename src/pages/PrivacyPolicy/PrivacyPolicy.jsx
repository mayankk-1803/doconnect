import React from 'react';
import SEO from '../../components/common/SEO';
import Breadcrumb from '../../components/common/Breadcrumb';

const PrivacyPolicy = () => {
  const breadcrumbItems = [{ label: 'Privacy Policy', path: '/privacy-policy' }];

  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Privacy policy guidelines, cookie disclosures, and data security parameters at SecureHealth."
        keywords="privacy policy, data terms, cookie info"
        path="/privacy-policy"
      />

      <div className="bg-slate-50 border-b border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="font-display font-extrabold text-3xl text-dark mt-2">
            Privacy Policy
          </h1>
          <p className="text-slate-500 text-xs md:text-sm mt-1">
            Last Updated: July 07, 2026
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 text-slate-600 text-sm md:text-base leading-relaxed space-y-6">
        <p>
          At SecureHealth, we prioritize the privacy of our visitors. This Privacy Policy document outlines the types of information we collect, how we use it, and the security measures we take to protect your data.
        </p>

        <h3 className="font-display font-bold text-dark text-lg pt-4 border-b border-slate-100 pb-2">
          1. Information We Collect
        </h3>
        <p>
          Since our website operates strictly on a frontend-only comparison model, we do not host databases to save your private inputs. When you submit a quote request or contact enquiry, our website dynamically translates your inputs into a URL query parameter which is sent directly to WhatsApp. We do not store these details on any backend server.
        </p>

        <h3 className="font-display font-bold text-dark text-lg pt-4 border-b border-slate-100 pb-2">
          2. Log Files & Analytics
        </h3>
        <p>
          SecureHealth follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and click counts. These are not linked to any personally identifiable information.
        </p>

        <h3 className="font-display font-bold text-dark text-lg pt-4 border-b border-slate-100 pb-2">
          3. Cookies & Session Storage
        </h3>
        <p>
          We use local session storage to improve your browsing experience. E.g., we set a session marker when you dismiss our floating WhatsApp popup widget. This ensures the widget does not disrupt your navigation on subsequent page loads. Session storage markers expire automatically when you close your web browser.
        </p>

        <h3 className="font-display font-bold text-dark text-lg pt-4 border-b border-slate-100 pb-2">
          4. Contact Us
        </h3>
        <p>
          If you have questions about our privacy policies, please reach out to us at our corporate office or email us at support@securehealth.in.
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;
