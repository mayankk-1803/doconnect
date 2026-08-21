import React, { useEffect, useRef, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { generateWhatsAppLink } from '../utils/whatsapp';
import gsap from 'gsap';

const FloatingWhatsApp = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Pulse animation using GSAP
    const pulse = gsap.to(buttonRef.current, {
      scale: 1.08,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Show tooltip after 5 seconds of loading
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);

    // Hide tooltip automatically after 10 seconds
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 15000);

    return () => {
      pulse.kill();
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip */}
      <div
        className={`bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-2xl shadow-xl transition-all duration-500 border border-slate-800 relative whitespace-nowrap ${
          showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        Need Help? Talk to us!
        <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 border-l-slate-900" />
      </div>

      {/* Button */}
      <a
        ref={buttonRef}
        href={generateWhatsAppLink('general')}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:bg-[#20BA5A] transition-colors shadow-[#25D366]/30 cursor-pointer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <FaWhatsapp className="w-8 h-8" />
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
