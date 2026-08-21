import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ClipboardCheck,
  Users,
  Headphones,
  Phone
} from 'lucide-react';
import { STATS, BRAND_CONFIG } from '../constants';
import gsap from 'gsap';
import { generateWhatsAppLink } from '../utils/whatsapp';

// Category Definitions mapping the main 8 categories
const HERO_CATEGORIES = [
  { id: 'car', title1: 'Car', title2: 'Insurance', badge: '', badgeColor: '', path: '/motor' },
  { id: 'bike', title1: 'Bike', title2: 'Insurance', badge: '', badgeColor: '', path: '/motor' },
  { id: 'health', title1: 'Health', title2: 'Insurance', badge: 'Upto 25% Off*', badgeColor: 'bg-[#2F6FAF]', path: '/health-insurance' },
  { id: 'term', title1: 'Term', title2: 'Insurance', badge: 'Save On Tax*', badgeColor: 'bg-[#2F6FAF]', path: 'https://wa.me/917683098648?text=Hello%20DoConnect%2C%20I%20am%20interested%20in%20a%20Term%20Insurance%20plan.' },
  { id: 'investment', title1: 'Investment', title2: 'Plans', badge: '', badgeColor: '', path: 'https://wa.me/917683098648?text=Hello%20DoConnect%2C%20I%20am%20interested%20in%20an%20Investment%20Plan.' },
  { id: 'business', title1: 'Corporate', title2: 'Insurance', badge: 'NEW', badgeColor: 'bg-red-500', path: '/contact' },
  { id: 'life', title1: 'Family Health', title2: 'Insurance', badge: '', badgeColor: '', path: '/family-insurance' },
  { id: 'travel', title1: 'Travel', title2: 'Insurance', badge: '', badgeColor: '', path: '/travel' }
];

const PARTNERS_LIST = [
  { name: 'Aditya Birla Group', src: '/adityabirlagroup.jpg' },
  { name: 'ICICI Lombard', src: '/icicilombard.jpg' },
  { name: 'Bajaj Allianz', src: '/bajaj.jpg' },
  { name: 'Cigna', src: '/cigna.jpg' },
  { name: 'HDFC ERGO', src: '/hdfcergo.jpg' },
  { name: 'SBI General Insurance', src: '/sbideneral.jpg' },
  { name: 'Star Health Insurance', src: '/star.jpg' },
  { name: 'Tata AIG', src: '/tataaig.jpg' },
  { name: 'Niva Bupa Health Insurance', src: '/nivabupa.jpg' },
  { name: 'LIC', src: '/lic.jpg' },
  { name: 'Tata AIA Life', src: '/tataaia.jpg' },
  { name: 'Max Life Insurance', src: '/maxlife.jpg' },
  { name: 'Digit Insurance', src: '/digit.jpg' }
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
            <path d="M15.5 25L18.5 15.5C18.9 14.2 20.1 13.5 21.5 13.5H26.5C27.9 13.5 29.1 14.2 29.5 15.5L32.5 25H15.5Z" fill="#67B7E8" />
            {/* Body */}
            <path d="M10 24C10 22.3431 11.3431 21 13 21H35C36.6569 21 38 22.3431 38 24V31C38 32.6569 36.6569 34 35 34H13C11.3431 34 10 32.6569 10 31V24Z" fill="#2F6FAF" />
            {/* Wheels */}
            <rect x="13" y="32" width="6" height="4" rx="2" fill="#16324F" />
            <rect x="29" y="32" width="6" height="4" rx="2" fill="#16324F" />
            {/* Lights */}
            <circle cx="14" cy="27.5" r="2.5" fill="#FDE047" />
            <circle cx="34" cy="27.5" r="2.5" fill="#FDE047" />
            {/* Grill */}
            <rect x="20" y="27" width="8" height="2" rx="1" fill="#67B7E8" opacity="0.8" />
          </svg>
        );
      case 'bike':
        return (
          <svg className="w-12 h-12 transition-transform duration-300" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Wheels */}
            <circle cx="15" cy="30" r="7" stroke="#2F6FAF" strokeWidth="3" fill="none" />
            <circle cx="15" cy="30" r="3" fill="#16324F" />
            <circle cx="33" cy="30" r="7" stroke="#2F6FAF" strokeWidth="3" fill="none" />
            <circle cx="33" cy="30" r="3" fill="#16324F" />
            {/* Frame */}
            <path d="M15 30L23 20H31L33 30" stroke="#2F6FAF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M23 20L20 13H17" stroke="#2F6FAF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M23 20L15 30" stroke="#67B7E8" strokeWidth="3" strokeLinecap="round" />
            {/* Engine / Tank */}
            <path d="M22 17C22 15.3431 23.3431 14 25 14H30C31.1046 14 32 14.8954 32 16V20H22V17Z" fill="#67B7E8" />
            {/* Seat */}
            <path d="M17 19.5C17 18.6716 17.6716 18 18.5 18H22.5V21H17V19.5Z" fill="#16324F" />
          </svg>
        );
      case 'health':
        return (
          <svg className="w-12 h-12 transition-transform duration-300" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Heart background */}
            <path d="M24 39.5L21.4 37.1C12.2 28.8 6 23.2 6 16.2C6 10.6 10.4 6.2 16 6.2C19.2 6.2 22.2 7.7 24 10.1C25.8 7.7 28.8 6.2 32 6.2C37.6 6.2 42 10.6 42 16.2C42 23.2 35.8 28.8 26.6 37.1L24 39.5Z" fill="#2F6FAF" />
            {/* Plus Sign */}
            <path d="M24 13V23M19 18H29" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );
      case 'term':
        return (
          <svg className="w-12 h-12 transition-transform duration-300" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Canopy */}
            <path d="M24 10C14 10 9 17 8 23H40C39 17 34 10 24 10Z" fill="#2F6FAF" />
            {/* Umbrella Panels */}
            <path d="M24 10C20 14 19 20 18.5 23" stroke="#67B7E8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M24 10C28 14 29 20 29.5 23" stroke="#67B7E8" strokeWidth="2.5" strokeLinecap="round" />
            {/* Handle */}
            <path d="M24 23V34C24 35.6569 22.6569 37 21 37C19.3431 37 18 35.6569 18 34" stroke="#67B7E8" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Tip */}
            <path d="M24 10V7" stroke="#67B7E8" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );
      case 'investment':
        return (
          <svg className="w-12 h-12 transition-transform duration-300" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Coin Circle */}
            <circle cx="24" cy="24" r="16" fill="#2F6FAF" />
            <circle cx="24" cy="24" r="12" stroke="#67B7E8" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
            {/* Rupee Symbol */}
            <path d="M19 16H29M19 20H29M24 16C20 16 19 23 24 23H27.5L19 32" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {/* Sparkle Stars */}
            <path d="M38 12L39 15L42 16L39 17L38 20L37 17L34 16L37 15L38 12Z" fill="#67B7E8" />
            <path d="M10 32L11 34L13 35L11 36L10 38L9 36L7 35L9 34L10 32Z" fill="#67B7E8" />
          </svg>
        );
      case 'business':
        return (
          <svg className="w-12 h-12 transition-transform duration-300" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Building */}
            <rect x="10" y="18" width="28" height="20" rx="3" fill="#2F6FAF" />
            {/* Awning */}
            <path d="M7 18C7 15.2386 9.23858 13 12 13H36C38.7614 13 41 15.2386 41 18V19H7V18Z" fill="#67B7E8" />
            {/* Door */}
            <rect x="21" y="28" width="6" height="10" rx="1" fill="#16324F" />
            {/* Windows */}
            <rect x="14" y="24" width="4" height="4" rx="1" fill="#67B7E8" />
            <rect x="30" y="24" width="4" height="4" rx="1" fill="#67B7E8" />
            {/* Small Sign */}
            <circle cx="24" cy="9" r="2" fill="#67B7E8" />
            <line x1="24" y1="11" x2="24" y2="13" stroke="#67B7E8" strokeWidth="2" />
          </svg>
        );
      case 'life':
        return (
          <svg className="w-12 h-12 transition-transform duration-300" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Adult Person (Blue) */}
            <circle cx="20" cy="18" r="5" fill="#2F6FAF" />
            <path d="M12 34C12 28.4772 16.4772 24 22 24H23C25.7614 24 28 26.2386 28 29V34H12Z" fill="#2F6FAF" />
            {/* Child Person (Cyan) */}
            <circle cx="31" cy="22" r="4" fill="#67B7E8" />
            <path d="M26 34C26 29.5817 29.5817 26 34 26H35C35.5523 26 36 26.4477 36 27V34H26Z" fill="#67B7E8" />
          </svg>
        );
      case 'travel':
        return (
          <svg className="w-12 h-12 transition-transform duration-300" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Money Sack / Bag (Blue) */}
            <path d="M24 10C20 10 18 14 17 18C15 20 14 24 14 29C14 34.5 18.5 39 24 39C29.5 39 34 34.5 34 29C34 24 33 20 31 18C30 14 28 10 24 10Z" fill="#2F6FAF" />
            {/* Tie Bow (Cyan) */}
            <path d="M19 17C21.5 18 26.5 18 29 17L31 15C29 14.5 27 15 24 15.5C21 15 19 14.5 17 15L19 17Z" fill="#67B7E8" />
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
      className="relative overflow-hidden pt-24 pb-12 lg:pt-32 lg:pb-20 bg-white flex flex-col justify-center min-h-[92vh] w-full border-b border-[#DCEAF4]"
    >
      {/* Ambient background glows in blue/cyan brand identity */}
      <div className="ambient-blob absolute top-[5%] left-[8%] w-[500px] h-[500px] bg-[#2F6FAF]/5 rounded-full blur-[110px] pointer-events-none z-0" />
      <div className="ambient-blob absolute bottom-[8%] right-[5%] w-[480px] h-[480px] bg-[#67B7E8]/8 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="ambient-blob absolute top-[40%] left-[40%] w-[350px] h-[350px] bg-[#2F6FAF]/4 rounded-full blur-[90px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        
        {/* Two-Column Premium Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16 relative">
          
          {/* Left Column: Headline, Subtitle, Checkmarks, and CTAs (60% width on desktop) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Trust Badge Pill */}
            <div ref={badgeRef} className="inline-flex items-center gap-1.5 bg-[#EAF6FC] border border-[#2F6FAF]/25 px-4 py-1.5 rounded-full shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#2F6FAF]" />
              <span className="text-[10px] font-extrabold text-[#2F6FAF] uppercase tracking-wider">
                IRDAI Certified Digital Insurance Marketplace
              </span>
            </div>

            {/* Title */}
            <h1 ref={headingRef} className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl text-[#16324F] leading-[1.1] tracking-tight">
              India's Most Trusted <br />
              <span className="text-[#2F6FAF]">Digital Insurance Marketplace</span>
            </h1>

            {/* Subtitle */}
            <p ref={subtitleRef} className="text-slate-500 text-sm md:text-base font-medium leading-relaxed max-w-xl">
              Compare quotes from 35+ leading insurers in 60 seconds. Get instant policy delivery, zero spam calls, and 24/7 dedicated claim assistance.
            </p>

            {/* Checkmarks / Trust Chips */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-xs md:text-sm text-[#16324F] font-bold">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#2F6FAF] shrink-0" />
                <span>IRDAI Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#2F6FAF] shrink-0" />
                <span>35+ Partners</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#2F6FAF] shrink-0" />
                <span>10,000+ Cashless Hospitals</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div ref={ctaGroupRef} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
              <button
                onClick={handleScrollToPartners}
                className="px-8 py-4 rounded-xl font-extrabold bg-[#2F6FAF] hover:bg-[#245B91] text-white text-xs md:text-sm shadow-md shadow-[#2F6FAF]/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Compare Plans</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
              
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-callback-modal'))}
                className="px-8 py-4 rounded-xl font-extrabold bg-white hover:bg-[#EAF6FC]/40 text-[#2F6FAF] border border-[#DCEAF4] text-xs md:text-sm shadow-2xs hover:shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#2F6FAF]" />
                <span>Talk To Advisor</span>
              </button>
            </div>
          </div>

          {/* Right Column: Family Image Composition with floating icon rings (40% width on desktop) */}
          <div className="lg:col-span-5 relative flex items-center justify-center w-full min-h-[380px] lg:min-h-[460px]">
            {/* Concentric dotted background rings */}
            <div className="absolute w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full z-0 flex items-center justify-center pointer-events-none">
              <div className="absolute inset-0 border border-[#2F6FAF]/10 border-dashed rounded-full animate-spin-slow" />
              <div className="absolute inset-[15%] border border-[#2F6FAF]/15 border-dashed rounded-full animate-spin-reverse-slow" />
            </div>

            {/* Core Family Photo Image Cutout (blends into white bg) */}
            <div className="relative z-10 w-full max-w-[420px] lg:max-w-none flex justify-center">
              <img 
                src="/family.jpg" 
                alt="Protected Family" 
                className="w-[92%] sm:w-[88%] h-auto object-contain select-none"
              />
            </div>

            {/* Floating Action Circles with Lucide icons */}
            {/* Heartbeat / Health icon - Top */}
            <div className="absolute top-[4%] left-[65%] -translate-x-1/2 bg-white border border-[#DCEAF4] w-12 h-12 rounded-full flex items-center justify-center text-[#2F6FAF] shadow-md z-20 hover:scale-110 transition duration-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            
            {/* Car icon - Top Right */}
            <div className="absolute right-[5%] top-[18%] bg-white border border-[#DCEAF4] w-12 h-12 rounded-full flex items-center justify-center text-[#2F6FAF] shadow-md z-20 hover:scale-110 transition duration-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" strokeLinecap="round" />
                <circle cx="7" cy="17" r="2" />
                <path d="M9 17h6" strokeLinecap="round" />
                <circle cx="17" cy="17" r="2" />
              </svg>
            </div>

            {/* Airplane / Travel icon - Mid Right */}
            <div className="absolute right-[2%] bottom-[38%] bg-white border border-[#DCEAF4] w-12 h-12 rounded-full flex items-center justify-center text-[#2F6FAF] shadow-md z-20 hover:scale-110 transition duration-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2 15 22 11 13 2 9Z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 2 11 13" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Users / Family icon - Mid Left */}
            <div className="absolute left-[3%] top-[30%] bg-white border border-[#DCEAF4] w-12 h-12 rounded-full flex items-center justify-center text-[#2F6FAF] shadow-md z-20 hover:scale-110 transition duration-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
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
                  <div className="text-center font-sans font-bold text-slate-700 text-[11px] md:text-[13px] leading-tight group-hover:text-[#2F6FAF] transition-colors duration-200">
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

        {/* Infinite Scrolling Logo Marquee */}
        <div className="pt-8 pb-4 max-w-5xl mx-auto px-4 overflow-hidden relative">
          <div className="text-center mb-8">
            <span className="text-[10px] md:text-xs font-bold text-[#64798D] uppercase tracking-wider bg-[#EAF6FC] border border-[#DCEAF4] px-3.5 py-1.5 rounded-full inline-block">
              Trusted by leading IRDAI-approved insurance providers
            </span>
          </div>

          <div className="relative w-full overflow-hidden py-4">
            {/* Fading glass gradients on sides for premium depth */}
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Marquee Track */}
            <div className="animate-marquee flex gap-5 items-center">
              {/* First Set of Logos */}
              {PARTNERS_LIST.map((partner, idx) => (
                <div 
                  key={`m1-${idx}`}
                  className="flex-shrink-0 bg-white border border-[#DCEAF4] rounded-[20px] p-4 flex items-center justify-center h-20 w-36 md:w-40 shadow-2xs hover:shadow-md hover:border-[#2F6FAF]/35 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <img 
                      src={partner.src} 
                      alt={partner.name} 
                      className="w-full h-full object-contain select-none pointer-events-none"
                    />
                  </div>
                </div>
              ))}
              
              {/* Second Set of Logos (Duplicated for seamless loop) */}
              {PARTNERS_LIST.map((partner, idx) => (
                <div 
                  key={`m2-${idx}`}
                  className="flex-shrink-0 bg-white border border-[#DCEAF4] rounded-[20px] p-4 flex items-center justify-center h-20 w-36 md:w-40 shadow-2xs hover:shadow-md hover:border-[#2F6FAF]/35 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <img 
                      src={partner.src} 
                      alt={partner.name} 
                      className="w-full h-full object-contain select-none pointer-events-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits of DoConnect Section (Transparent columns, no cards) */}
        <div className="py-16 max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-[#16324F]">
              Benefits of {BRAND_CONFIG.name}
            </h2>
            <p className="text-[#64798D] text-xs md:text-sm mt-2 leading-relaxed font-medium">
              Understand your insurance policy options. Identify the best value. Enjoy peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Benefit 1 */}
            <div className="flex flex-col items-center text-center p-4 max-w-sm mx-auto group">
              <div className="w-16 h-16 rounded-3xl bg-[#EAF6FC] border border-[#DCEAF4] flex items-center justify-center text-[#2F6FAF] mb-5 shrink-0 group-hover:scale-105 transition duration-300">
                <ClipboardCheck className="w-7 h-7" />
              </div>
              <h3 className="font-display font-extrabold text-base md:text-lg text-[#16324F] mb-3">
                5 Minutes Policy Issuance*
              </h3>
              <p className="text-[#64798D] text-xs leading-relaxed font-medium">
                Say no to spending hours and days in queues doing the paperwork for your insurance policy. Get your insurance issued instantly with {BRAND_CONFIG.name}. The entire process from selecting the best insurance policy to getting it issued takes just 5 minutes on {BRAND_CONFIG.name}.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="flex flex-col items-center text-center p-4 max-w-sm mx-auto group">
              <div className="w-16 h-16 rounded-3xl bg-[#EAF6FC] border border-[#DCEAF4] flex items-center justify-center text-[#2F6FAF] mb-5 shrink-0 group-hover:scale-105 transition duration-300">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="font-display font-extrabold text-base md:text-lg text-[#16324F] mb-3">
                Over 17 M+ Happy Customers
              </h3>
              <p className="text-[#64798D] text-xs leading-relaxed font-medium">
                {BRAND_CONFIG.name} is becoming a household name in India. Till now we have been successful in providing a delightful experience to more than 17 M+ customers with the help of our transparent and quick process, a dedicated support team along with the availability of numerous insurers.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="flex flex-col items-center text-center p-4 max-w-sm mx-auto group">
              <div className="w-16 h-16 rounded-3xl bg-[#EAF6FC] border border-[#DCEAF4] flex items-center justify-center text-[#2F6FAF] mb-5 shrink-0 group-hover:scale-105 transition duration-300">
                <Headphones className="w-7 h-7" />
              </div>
              <h3 className="font-display font-extrabold text-base md:text-lg text-[#16324F] mb-3">
                Dedicated Support Team
              </h3>
              <p className="text-[#64798D] text-xs leading-relaxed font-medium">
                Our dedicated support team is available for your assistance all the 7 days. Feel free to reach out to us in case of any confusion - be it related to the purchase of an insurance policy or assistance during the settlement of a claim, our team of experts is at your service all days.
              </p>
            </div>
          </div>
        </div>

        {/* Live Statistics Banner */}
        <div ref={statsRef} className="bg-white border border-slate-200/70 rounded-3xl p-6 shadow-xs max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="font-display font-extrabold text-2xl md:text-3xl text-[#2F6FAF]">
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
