import React from 'react';
import { useForm } from 'react-hook-form';
import SEO from '../../components/common/SEO';
import Breadcrumb from '../../components/common/Breadcrumb';
import InputField from '../../components/forms/InputField';
import TextareaField from '../../components/forms/TextareaField';
import Button from '../../components/ui/Button';
import { redirectToWhatsApp } from '../../utils/whatsapp';
import { Mail, Phone, MapPin, ShieldCheck, User } from 'lucide-react';
import { BRAND_CONFIG } from '../../constants';
import { toast } from 'react-toastify';

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues: {
      name: '',
      mobile: '',
      email: '',
      message: ''
    }
  });

  const breadcrumbItems = [{ label: 'Contact Us', path: '/contact' }];

  const onSubmit = (data) => {
    toast.loading('Redirecting to WhatsApp...', { id: 'contact-toast' });
    
    // Slight delay for toast visibility
    setTimeout(() => {
      toast.update('contact-toast', {
        render: 'Thank you for your enquiry!',
        type: 'success',
        isLoading: false,
        autoClose: 3000
      });
      redirectToWhatsApp('contact', data);
      reset();
    }, 1200);
  };

  return (
    <>
      <SEO
        title="Contact Our Insurance Advisors"
        description="Get in touch with SecureHealth advisors. Submit your questions or consult our relations desk directly on WhatsApp."
        keywords="contact advisor, insurance support phone, securehealth office"
        path="/contact"
      />

      <div className="bg-slate-50 border-b border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-dark mt-2">
            Talk to an Advisor
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl mt-1.5">
            Have questions about premiums, waiting periods, or cashless hospitals? Connect with us immediately.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Office Coordinates & Support Coordinates */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-xl">
            <div className="absolute top-[-30px] right-[-30px] w-24 h-24 bg-accent/20 rounded-full blur-xl pointer-events-none" />
            
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-bold text-accent uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full inline-block">
                  Support Channels
                </span>
                <h3 className="font-display font-bold text-xl text-white">
                  Get Instant Resolution
                </h3>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                  Call our toll-free support line or trigger WhatsApp chats to connect with our claims and relations specialists.
                </p>
              </div>

              <div className="space-y-6 text-sm text-slate-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-accent shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold block">Office Address</span>
                    <span className="text-xs md:text-sm mt-1 block">{BRAND_CONFIG.address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-accent shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold block">Phone</span>
                    <a href={`tel:${BRAND_CONFIG.supportPhone.replace(/\s+/g, '')}`} className="hover:text-white transition text-xs md:text-sm mt-1 block">
                      {BRAND_CONFIG.supportPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-accent shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-xs text-slate-400 font-bold block">Email</span>
                    {BRAND_CONFIG.emails.map((email) => (
                      <div key={email.value}>
                        <span className="text-[10px] text-slate-500 block">{email.label}</span>
                        <a
                          href={`mailto:${email.value}`}
                          className="hover:text-white transition text-xs md:text-sm block"
                        >
                          {email.value}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-accent shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold block">Leadership</span>
                    <span className="text-xs md:text-sm mt-1 block">
                      {BRAND_CONFIG.directorTitle} – {BRAND_CONFIG.directorName}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-6 mt-8 flex items-center gap-2.5 text-xs text-slate-400">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>IRDAI Certified Registration Number: IRDA/SH/1234/2026</span>
            </div>
          </div>

          {/* Right Column: Premium Contact Form */}
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-sm">
            <h3 className="font-display font-extrabold text-dark text-xl mb-1">
              Submit Inquiry
            </h3>
            <p className="text-slate-500 text-xs mb-6">
              Fill details below. Clicking submit opens WhatsApp with your pre-filled inquiry.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <InputField
                label="Full Name"
                placeholder="Rahul Sharma"
                {...register('name', { required: 'Name is required' })}
                error={errors.name}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Mobile Number"
                  type="tel"
                  placeholder="e.g. 9876543210"
                  {...register('mobile', {
                    required: 'Mobile is required',
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: 'Invalid Indian mobile number'
                    }
                  })}
                  error={errors.mobile}
                />

                <InputField
                  label="Email Address"
                  type="email"
                  placeholder="rahul@gmail.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address'
                    }
                  })}
                  error={errors.email}
                />
              </div>

              <TextareaField
                label="Your Message"
                placeholder="Enter details of what plans/guidelines you are interested in..."
                {...register('message', { required: 'Message is required' })}
                error={errors.message}
                rows={5}
              />

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                disabled={isSubmitting}
                className="mt-6"
              >
                {isSubmitting ? 'Redirecting...' : 'Submit Enquiry via WhatsApp'}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
};

export default Contact;
