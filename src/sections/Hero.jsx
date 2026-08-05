import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { STATS } from '../constants';
import gsap from 'gsap';
import { generateWhatsAppLink } from '../utils/whatsapp';

// Category Definitions mapping the main 8 categories
const HERO_CATEGORIES = [
  { id: 'car', title1: 'Car', title2: 'Insurance', badge: '', badgeColor: '', path: '/motor' },
  { id: 'bike', title1: 'Bike', title2: 'Insurance', badge: '', badgeColor: '', path: '/motor' },
  { id: 'health', title1: 'Health', title2: 'Insurance', badge: 'Upto 25% Off*', badgeColor: 'bg-[#276F27]', path: '/health-insurance' },
  { id: 'term', title1: 'Term', title2: 'Insurance', badge: 'Save On Tax*', badgeColor: 'bg-[#276F27]', path: 'https://wa.me/917683098648?text=Hello%20DoConnect%2C%20I%20am%20interested%20in%20a%20Term%20Insurance%20plan.' },
  { id: 'investment', title1: 'Investment', title2: 'Plans', badge: '', badgeColor: '', path: 'https://wa.me/917683098648?text=Hello%20DoConnect%2C%20I%20am%20interested%20in%20an%20Investment%20Plan.' },
  { id: 'business', title1: 'Corporate', title2: 'Insurance', badge: 'NEW', badgeColor: 'bg-red-500', path: '/contact' },
  { id: 'life', title1: 'Family Health', title2: 'Insurance', badge: '', badgeColor: '', path: '/family-insurance' },
  { id: 'travel', title1: 'Travel', title2: 'Insurance', badge: '', badgeColor: '', path: '/travel' }
];

const Hero = () => {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const statsRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Entrance animations on load
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 0.8 } });

      if (badgeRef.current) tl.fromTo(badgeRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0 });
      if (headingRef.current) tl.fromTo(headingRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, '-=0.5');
      if (subtitleRef.current) tl.fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.6');
      if (ctaGroupRef.current) tl.fromTo(ctaGroupRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.5');
      if (statsRef.current) tl.fromTo(statsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.4');
      
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        tl.fromTo(
          validCards,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.06, ease: 'power2.out' },
          '-=0.5'
        );
      }

      // Slowly animate ambient background blobs
      if (heroRef.current) {
        const blobs = heroRef.current.querySelectorAll('.ambient-blob');
        blobs.forEach((blob, idx) => {
          gsap.to(blob, {
            x: idx % 2 === 0 ? 35 : -35,
            y: idx % 2 === 0 ? -30 : 30,
            duration: 9 + idx * 3,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut'
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToPartners = () => {
    const el = document.getElementById('partners-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper to render high-res modern flat colorful SVG icons matching the PolicyBazaar layout style
  const renderCategorySvg = (catId) => {
    switch (catId) {
      case 'car':
        return (
          <svg className="w-12 h-12 transition-transform duration-300" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Windshield */}
            <path d="M15.5 25L18.5 15.5C18.9 14.2 20.1 13.5 21.5 13.5H26.5C27.9 13.5 29.1 14.2 29.5 15.5L32.5 25H15.5Z" fill="#8ECA3C" />
            {/* Body */}
            <path d="M10 24C10 22.3431 11.3431 21 13 21H35C36.6569 21 38 22.3431 38 24V31C38 32.6569 36.6569 34 35 34H13C11.3431 34 10 32.6569 10 31V24Z" fill="#276F27" />
            {/* Wheels */}
            <rect x="13" y="32" width="6" height="4" rx="2" fill="#1E293B" />
            <rect x="29" y="32" width="6" height="4" rx="2" fill="#1E293B" />
            {/* Lights */}
            <circle cx="14" cy="27.5" r="2.5" fill="#FDE047" />
            <circle cx="34" cy="27.5" r="2.5" fill="#FDE047" />
            {/* Grill */}
            <rect x="20" y="27" width="8" height="2" rx="1" fill="#8ECA3C" opacity="0.8" />
          </svg>
        );
      case 'bike':
        return (
          <svg className="w-12 h-12 transition-transform duration-300" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Wheels */}
            <circle cx="15" cy="30" r="7" stroke="#276F27" strokeWidth="3" fill="none" />
            <circle cx="15" cy="30" r="3" fill="#1E293B" />
            <circle cx="33" cy="30" r="7" stroke="#276F27" strokeWidth="3" fill="none" />
            <circle cx="33" cy="30" r="3" fill="#1E293B" />
            {/* Frame */}
            <path d="M15 30L23 20H31L33 30" stroke="#276F27" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M23 20L20 13H17" stroke="#276F27" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M23 20L15 30" stroke="#8ECA3C" strokeWidth="3" strokeLinecap="round" />
            {/* Engine / Tank */}
            <path d="M22 17C22 15.3431 23.3431 14 25 14H30C31.1046 14 32 14.8954 32 16V20H22V17Z" fill="#8ECA3C" />
            {/* Seat */}
            <path d="M17 19.5C17 18.6716 17.6716 18 18.5 18H22.5V21H17V19.5Z" fill="#1E293B" />
          </svg>
        );
      case 'health':
        return (
          <svg className="w-12 h-12 transition-transform duration-300" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Heart background */}
            <path d="M24 39.5L21.4 37.1C12.2 28.8 6 23.2 6 16.2C6 10.6 10.4 6.2 16 6.2C19.2 6.2 22.2 7.7 24 10.1C25.8 7.7 28.8 6.2 32 6.2C37.6 6.2 42 10.6 42 16.2C42 23.2 35.8 28.8 26.6 37.1L24 39.5Z" fill="#276F27" />
            {/* Plus Sign */}
            <path d="M24 13V23M19 18H29" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );
      case 'term':
        return (
          <svg className="w-12 h-12 transition-transform duration-300" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Canopy */}
            <path d="M24 10C14 10 9 17 8 23H40C39 17 34 10 24 10Z" fill="#276F27" />
            {/* Umbrella Panels */}
            <path d="M24 10C20 14 19 20 18.5 23" stroke="#8ECA3C" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M24 10C28 14 29 20 29.5 23" stroke="#8ECA3C" strokeWidth="2.5" strokeLinecap="round" />
            {/* Handle */}
            <path d="M24 23V34C24 35.6569 22.6569 37 21 37C19.3431 37 18 35.6569 18 34" stroke="#8ECA3C" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Tip */}
            <path d="M24 10V7" stroke="#8ECA3C" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );
      case 'investment':
        return (
          <svg className="w-12 h-12 transition-transform duration-300" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Coin Circle */}
            <circle cx="24" cy="24" r="16" fill="#276F27" />
            <circle cx="24" cy="24" r="12" stroke="#8ECA3C" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
            {/* Rupee Symbol */}
            <path d="M19 16H29M19 20H29M24 16C20 16 19 23 24 23H27.5L19 32" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {/* Sparkle Stars */}
            <path d="M38 12L39 15L42 16L39 17L38 20L37 17L34 16L37 15L38 12Z" fill="#8ECA3C" />
            <path d="M10 32L11 34L13 35L11 36L10 38L9 36L7 35L9 34L10 32Z" fill="#8ECA3C" />
          </svg>
        );
      case 'business':
        return (
          <svg className="w-12 h-12 transition-transform duration-300" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Building */}
            <rect x="10" y="18" width="28" height="20" rx="3" fill="#276F27" />
            {/* Awning */}
            <path d="M7 18C7 15.2386 9.23858 13 12 13H36C38.7614 13 41 15.2386 41 18V19H7V18Z" fill="#8ECA3C" />
            {/* Door */}
            <rect x="21" y="28" width="6" height="10" rx="1" fill="#1E293B" />
            {/* Windows */}
            <rect x="14" y="24" width="4" height="4" rx="1" fill="#8ECA3C" />
            <rect x="30" y="24" width="4" height="4" rx="1" fill="#8ECA3C" />
            {/* Small Sign */}
            <circle cx="24" cy="9" r="2" fill="#8ECA3C" />
            <line x1="24" y1="11" x2="24" y2="13" stroke="#8ECA3C" strokeWidth="2" />
          </svg>
        );
      case 'life':
        return (
          <svg className="w-12 h-12 transition-transform duration-300" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Adult Person (Green) */}
            <circle cx="20" cy="18" r="5" fill="#276F27" />
            <path d="M12 34C12 28.4772 16.4772 24 22 24H23C25.7614 24 28 26.2386 28 29V34H12Z" fill="#276F27" />
            {/* Child Person (Lime) */}
            <circle cx="31" cy="22" r="4" fill="#8ECA3C" />
            <path d="M26 34C26 29.5817 29.5817 26 34 26H35C35.5523 26 36 26.4477 36 27V34H26Z" fill="#8ECA3C" />
          </svg>
        );
      case 'travel':
        return (
          <svg className="w-12 h-12 transition-transform duration-300" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Money Sack / Bag (Green) */}
            <path d="M24 10C20 10 18 14 17 18C15 20 14 24 14 29C14 34.5 18.5 39 24 39C29.5 39 34 34.5 34 29C34 24 33 20 31 18C30 14 28 10 24 10Z" fill="#276F27" />
            {/* Tie Bow (Lime) */}
            <path d="M19 17C21.5 18 26.5 18 29 17L31 15C29 14.5 27 15 24 15.5C21 15 19 14.5 17 15L19 17Z" fill="#8ECA3C" />
            {/* Checkmark (White) */}
            <path d="M21.5 28L23.5 30.5L27 25" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section 
      ref={heroRef} 
      className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24 bg-[#F8FAF8] flex flex-col justify-center min-h-[92vh] w-full border-b border-slate-200/60"
    >
      {/* Ambient background glows in green brand identity */}
      <div className="ambient-blob absolute top-[5%] left-[8%] w-[500px] h-[500px] bg-[#276F27]/10 rounded-full blur-[110px] pointer-events-none z-0" />
      <div className="ambient-blob absolute bottom-[8%] right-[5%] w-[480px] h-[480px] bg-[#8ECA3C]/15 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="ambient-blob absolute top-[40%] left-[40%] w-[350px] h-[350px] bg-[#276F27]/8 rounded-full blur-[90px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          
          {/* Trust Badge Pill */}
          <div ref={badgeRef} className="inline-flex items-center gap-2 bg-[#F3F8F2] border border-[#276F27]/20 px-4 py-1.5 rounded-full mb-5 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#276F27]" />
            <span className="text-xs font-extrabold text-[#276F27] uppercase tracking-wider">
              IRDAI Certified Digital Insurance Marketplace
            </span>
          </div>

          {/* Main Headline */}
          <h1 
            ref={headingRef}
            className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[56px] text-[#1E293B] leading-[1.15] tracking-tight"
          >
            India's Most Trusted <br className="hidden sm:inline" />
            <span className="text-gradient">Digital Insurance Marketplace</span>
          </h1>

          {/* Subtitle Description */}
          <p 
            ref={subtitleRef}
            className="text-slate-600 text-sm sm:text-base md:text-lg mt-4 leading-relaxed max-w-2xl mx-auto font-medium"
          >
            Compare quotes from 35+ leading insurers in 60 seconds. Get instant policy delivery, zero spam calls, and 24/7 dedicated claim assistance.
          </p>

          {/* Primary Action Buttons */}
          <div ref={ctaGroupRef} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleScrollToPartners}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold bg-[#276F27] hover:bg-[#1B4D1B] text-white text-sm shadow-lg shadow-[#276F27]/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Compare Plans</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <a
              href={generateWhatsAppLink('advisor')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold bg-white hover:bg-[#F3F8F2] text-slate-800 border border-slate-200 text-sm shadow-xs transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#276F27]" />
              <span>Talk To Advisor</span>
            </a>
          </div>

          {/* Quick Trust Chips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#276F27]" />
              <span>IRDAI Approved</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#276F27]" />
              <span>35+ Insurance Partners</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#276F27]" />
              <span>10,000+ Cashless Hospitals</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#276F27]" />
              <span>Fast Claims Assistance</span>
            </div>
          </div>
        </div>

        {/* Categories Grid (Quick Access Shortcuts matching PolicyBazaar layout style) */}
        <div className="bg-white border border-slate-200/50 rounded-[32px] p-6 md:p-10 shadow-xl shadow-slate-100/50 max-w-5xl mx-auto mb-12 relative z-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10 justify-items-center justify-center">
            {HERO_CATEGORIES.map((cat, idx) => {
              const isExternal = cat.path.startsWith('http');
              const ItemElement = isExternal ? 'a' : Link;
              const itemProps = isExternal
                ? { href: cat.path, target: '_blank', rel: 'noopener noreferrer' }
                : { to: cat.path };

              return (
                <ItemElement
                  {...itemProps}
                  key={cat.id}
                  ref={(el) => (cardsRef.current[idx] = el)}
                  className="flex flex-col items-center group relative cursor-pointer select-none"
                >
                  {/* Icon Container */}
                  <div className="relative mb-3 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                    {/* Badge */}
                    {cat.badge && (
                      <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-white text-[8px] md:text-[9px] font-extrabold px-1.5 py-0.5 rounded-[4px] shadow-xs uppercase tracking-wide ${cat.badgeColor}`}>
                        {cat.badge}
                      </span>
                    )}
                    {/* Custom SVG Icon */}
                    {renderCategorySvg(cat.id)}
                  </div>

                  {/* Text Label */}
                  <div className="text-center font-sans font-bold text-slate-700 text-[11px] md:text-[13px] leading-tight group-hover:text-[#276F27] transition-colors duration-200">
                    <span>{cat.title1}</span>
                    {cat.title2 && (
                      <>
                        <br />
                        <span>{cat.title2}</span>
                      </>
                    )}
                  </div>
                </ItemElement>
              );
            })}
          </div>
        </div>

        {/* Live Statistics Banner */}
        <div ref={statsRef} className="bg-white border border-slate-200/70 rounded-3xl p-6 shadow-xs max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="font-display font-extrabold text-2xl md:text-3xl text-[#276F27]">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs font-semibold text-slate-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Hero;
