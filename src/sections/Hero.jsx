import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Activity,
  Car,
  Bike,
  Clock,
  Heart,
  TrendingUp,
  Plane,
  Briefcase,
  Shield
} from 'lucide-react';
import { CATEGORIES, STATS } from '../constants';
import gsap from 'gsap';
import { generateWhatsAppLink } from '../utils/whatsapp';

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

      tl.fromTo(badgeRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0 })
        .fromTo(headingRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, '-=0.5')
        .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.6')
        .fromTo(ctaGroupRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.5')
        .fromTo(statsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.4')
        .fromTo(
          cardsRef.current.filter(Boolean),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.06, ease: 'power2.out' },
          '-=0.5'
        );

      // Slowly animate ambient background blobs
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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleCardMouseEnter = (index) => {
    const card = cardsRef.current[index];
    if (card) {
      gsap.to(card, {
        y: -8,
        scale: 1.02,
        boxShadow: '0 25px 30px -5px rgba(39, 111, 39, 0.12), 0 12px 12px -5px rgba(39, 111, 39, 0.04)',
        borderColor: 'rgba(39, 111, 39, 0.25)',
        duration: 0.35,
        ease: 'power2.out'
      });
    }
  };

  const handleCardMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (card) {
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
        borderColor: 'rgba(241, 245, 249, 1)',
        duration: 0.3,
        ease: 'power2.inOut'
      });
    }
  };

  const handleScrollToPartners = () => {
    const el = document.getElementById('partners-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper to render SVG icon for each category
  const renderCategorySvg = (catId) => {
    switch (catId) {
      case 'health':
        return <Activity className="w-7 h-7 stroke-[2.2]" />;
      case 'car':
        return <Car className="w-7 h-7 stroke-[2.2]" />;
      case 'bike':
        return <Bike className="w-7 h-7 stroke-[2.2]" />;
      case 'term':
        return <Clock className="w-7 h-7 stroke-[2.2]" />;
      case 'life':
        return <Heart className="w-7 h-7 stroke-[2.2]" />;
      case 'investment':
        return <TrendingUp className="w-7 h-7 stroke-[2.2]" />;
      case 'travel':
        return <Plane className="w-7 h-7 stroke-[2.2]" />;
      case 'business':
        return <Briefcase className="w-7 h-7 stroke-[2.2]" />;
      default:
        return <Shield className="w-7 h-7 stroke-[2.2]" />;
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

        {/* Categories Grid (Quick Access Shortcuts) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {CATEGORIES.map((cat, idx) => {
            return (
              <div
                key={cat.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                onMouseEnter={() => handleCardMouseEnter(idx)}
                onMouseLeave={() => handleCardMouseLeave(idx)}
                className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-xs flex flex-col items-center text-center transition-all duration-300 select-none h-full relative group overflow-hidden"
              >
                {/* Badge Tag */}
                {cat.badge && (
                  <span className="absolute top-3 right-3 bg-[#8ECA3C]/20 text-[#276F27] border border-[#8ECA3C]/40 text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full select-none">
                    {cat.badge}
                  </span>
                )}

                {/* Accent line on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#276F27] to-[#8ECA3C] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* High-Resolution SVG Vector Icon Container */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#276F27]/10 via-[#8ECA3C]/15 to-[#8ECA3C]/25 border border-[#8ECA3C]/30 flex items-center justify-center text-[#276F27] shadow-xs mb-4 shrink-0 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#276F27] group-hover:to-[#8ECA3C] group-hover:text-white group-hover:border-transparent transition-all duration-300">
                  {renderCategorySvg(cat.id)}
                </div>

                <h3 className="font-display font-extrabold text-[#1E293B] text-sm mb-1.5 leading-tight">
                  {cat.title}
                </h3>

                <p className="text-slate-500 text-[11px] leading-relaxed mb-5 line-clamp-2 font-medium">
                  {cat.desc}
                </p>

                {/* CTA Button */}
                {cat.path.startsWith('http') ? (
                  <a
                    href={cat.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-[#276F27] hover:bg-[#1B4D1B] text-white text-xs font-bold transition-all duration-300 w-full mt-auto block text-center shadow-xs"
                  >
                    {cat.ctaText}
                  </a>
                ) : (
                  <Link
                    to={cat.path}
                    className="px-4 py-2.5 rounded-xl bg-[#276F27] hover:bg-[#1B4D1B] text-white text-xs font-bold transition-all duration-300 w-full mt-auto block text-center shadow-xs cursor-pointer"
                  >
                    {cat.ctaText}
                  </Link>
                )}
              </div>
            );
          })}
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
