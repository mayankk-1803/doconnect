import React, { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, ArrowRight } from 'lucide-react';
import { generateWhatsAppLink } from '../utils/whatsapp';
import gsap from 'gsap';

const WhatsAppPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    // Check if dismissed in this session
    const isDismissed = sessionStorage.getItem('wa_popup_dismissed') === 'true';
    if (isDismissed) return;

    let timer;
    let scrolledPastThreshold = false;

    // Trigger open
    const openPopup = () => {
      setIsOpen(true);
      // Clean up scroll listener
      window.removeEventListener('scroll', handleScroll);
    };

    // 1. Time-based trigger (20 seconds)
    timer = setTimeout(() => {
      openPopup();
    }, 20000);

    // 2. Scroll-based trigger (40% page scroll)
    const handleScroll = () => {
      if (scrolledPastThreshold) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent >= 40) {
        scrolledPastThreshold = true;
        clearTimeout(timer); // Cancel timer if scroll happens first
        openPopup();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // GSAP animation on open
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        popupRef.current,
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(popupRef.current, {
      y: 50,
      opacity: 0,
      scale: 0.9,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        setIsOpen(false);
        sessionStorage.setItem('wa_popup_dismissed', 'true');
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 left-6 z-45 max-w-sm w-full px-4 sm:px-0">
      <div
        ref={popupRef}
        className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-5 relative overflow-hidden"
      >
        {/* Accent bubble background decorations */}
        <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-[#EAF6FC] rounded-full -z-10" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition cursor-pointer"
          aria-label="Close message popup"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF6FC] border border-[#075FC1]/20 flex items-center justify-center text-[#075FC1] shrink-0">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#075FC1] tracking-wide uppercase">
              Advisor Active
            </span>
            <h4 className="font-display font-bold text-dark mt-1 text-[15px] leading-snug">
              Need help choosing the right Health Insurance?
            </h4>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Talk with our senior insurance expert instantly and clear your doubts.
            </p>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <a
            href={generateWhatsAppLink('advisor', { subject: 'Popup Expert Advice' })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="flex-1 py-2.5 rounded-2xl bg-[#075FC1] hover:bg-[#0B3B7A] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#075FC1]/20 transition-all cursor-pointer"
          >
            Chat on WhatsApp
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={handleClose}
            className="px-4 py-2.5 rounded-2xl border border-slate-100 hover:bg-slate-50 text-slate-600 font-semibold text-xs transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppPopup;
