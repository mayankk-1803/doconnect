import React, { useState, useEffect, useRef } from 'react';
import { X, Phone, User, Mail, MessageSquare, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';
import gsap from 'gsap';

const CallbackModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsSuccess(false);
      setFormData({ name: '', mobile: '', email: '', message: '' });
      setErrors({});
    };

    window.addEventListener('open-callback-modal', handleOpen);
    return () => window.removeEventListener('open-callback-modal', handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen && modalRef.current && overlayRef.current) {
      document.body.style.overflow = 'hidden';
      // GSAP Entrance
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(modalRef.current, 
        { opacity: 0, y: 30, scale: 0.95 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.2)', delay: 0.05 }
      );
    } else if (!isOpen) {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleClose = () => {
    if (modalRef.current && overlayRef.current) {
      gsap.to(modalRef.current, { opacity: 0, y: 20, scale: 0.95, duration: 0.25, ease: 'power2.in' });
      gsap.to(overlayRef.current, { 
        opacity: 0, 
        duration: 0.25, 
        ease: 'power2.in',
        onComplete: () => setIsOpen(false)
      });
    } else {
      setIsOpen(false);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please specify how we can help you';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate API callback submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success('Callback request submitted successfully!');
      
      // Auto close after 3.5 seconds on success
      setTimeout(() => {
        handleClose();
      }, 3500);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-slate-955/60 backdrop-blur-xs z-[100] flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleClose}
    >
      <div 
        ref={modalRef}
        className="bg-white border border-[#DCEAF4] rounded-[32px] w-full max-w-md p-8 md:p-10 shadow-2xl relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-[#DCEAF4] hover:bg-[#EAF6FC]/50 text-slate-500 hover:text-slate-800 transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="flex flex-col items-center text-center space-y-5 py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#16324F] tracking-tight">
              Request Received!
            </h3>
            <p className="text-slate-650 text-sm leading-relaxed max-w-xs font-semibold">
              Thank you, <span className="font-bold text-primary">{formData.name}</span>. A certified senior advisor will call you back on <span className="font-bold text-[#16324F]">{formData.mobile}</span> within 15 minutes.
            </p>
            <div className="w-full border-t border-[#DCEAF4] pt-4 mt-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Working Hours: 9:00 AM - 8:00 PM
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2 pr-6">
              <span className="inline-flex items-center gap-1.5 bg-[#EAF6FC] border border-[#2F6FAF]/20 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-[#2F6FAF]">
                <Phone className="w-3 h-3 text-[#2F6FAF]" />
                Instant Consultation
              </span>
              <h3 className="font-display font-extrabold text-2xl text-[#16324F] tracking-tight">
                Request a Callback
              </h3>
              <p className="text-[#64798D] text-xs font-medium leading-normal">
                Enter your contact info below. An expert insurance advisor will reach out to resolve your queries.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              {/* Name Field */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-2xl text-sm font-semibold text-[#16324F] placeholder-slate-400 focus:outline-none transition-all ${
                      errors.name ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-[#DCEAF4] focus:border-[#2F6FAF] focus:bg-white'
                    }`}
                  />
                </div>
                {errors.name && <span className="text-red-500 text-[10px] font-semibold">{errors.name}</span>}
              </div>

              {/* Mobile Field */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                  Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="tel"
                    name="mobile"
                    maxLength="10"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-2xl text-sm font-semibold text-[#16324F] placeholder-slate-400 focus:outline-none transition-all ${
                      errors.mobile ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-[#DCEAF4] focus:border-[#2F6FAF] focus:bg-white'
                    }`}
                  />
                </div>
                {errors.mobile && <span className="text-red-500 text-[10px] font-semibold">{errors.mobile}</span>}
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-2xl text-sm font-semibold text-[#16324F] placeholder-slate-400 focus:outline-none transition-all ${
                      errors.email ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-[#DCEAF4] focus:border-[#2F6FAF] focus:bg-white'
                    }`}
                  />
                </div>
                {errors.email && <span className="text-red-500 text-[10px] font-semibold">{errors.email}</span>}
              </div>

              {/* Message Field */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                  Message / Requirements
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-slate-400">
                    <MessageSquare className="w-4 h-4" />
                  </span>
                  <textarea
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what plan you are interested in..."
                    className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-2xl text-sm font-semibold text-[#16324F] placeholder-slate-400 focus:outline-none transition-all resize-none ${
                      errors.message ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-[#DCEAF4] focus:border-[#2F6FAF] focus:bg-white'
                    }`}
                  />
                </div>
                {errors.message && <span className="text-red-500 text-[10px] font-semibold">{errors.message}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-[#2F6FAF] hover:bg-[#245B91] text-white text-xs font-extrabold uppercase tracking-widest shadow-md shadow-[#2F6FAF]/25 transition duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-400 disabled:shadow-none"
              >
                {isSubmitting ? 'Sending Request...' : 'Call Me Back'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallbackModal;
