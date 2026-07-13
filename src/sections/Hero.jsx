import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { CATEGORIES } from '../constants';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Entrance animations on load
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 0.8 } });

      tl.fromTo(badgeRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0 })
        .fromTo(headingRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, '-=0.5')
        .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.6')
        .fromTo(
          cardsRef.current.filter(Boolean),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.08, ease: 'power2.out' },
          '-=0.5'
        );

      // Slowly animate background blobs
      const blobs = heroRef.current.querySelectorAll('.ambient-blob');
      blobs.forEach((blob, idx) => {
        gsap.to(blob, {
          x: idx % 2 === 0 ? 30 : -30,
          y: idx % 2 === 0 ? -25 : 25,
          duration: 8 + idx * 4,
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
        y: -10,
        scale: 1.02,
        boxShadow: '0 25px 30px -5px rgba(39, 111, 39, 0.06), 0 12px 12px -5px rgba(39, 111, 39, 0.03)',
        borderColor: 'rgba(39, 111, 39, 0.15)',
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

  return (
    <section 
      ref={heroRef} 
      className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24 bg-[#F8FAF8] flex items-center min-h-[90vh] w-full"
    >
      {/* Ambient background glows */}
      <div className="ambient-blob absolute top-[8%] left-[5%] w-[450px] h-[450px] bg-primary/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="ambient-blob absolute bottom-[10%] right-[5%] w-[450px] h-[450px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="ambient-blob absolute top-[35%] left-[45%] w-[300px] h-[300px] bg-secondary/3 rounded-full blur-[80px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span 
            ref={badgeRef}
            className="text-xs font-bold text-primary uppercase tracking-widest bg-secondary/10 border border-secondary/20 px-4 py-1.5 rounded-full inline-block mb-3"
          >
            Insurance Slabs
          </span>
          <h1 
            ref={headingRef}
            className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[48px] text-[#1E293B] leading-tight"
          >
            Insurance Solutions For Every Need
          </h1>
          <p 
            ref={subtitleRef}
            className="text-slate-500 text-xs md:text-sm mt-3 leading-relaxed max-w-2xl mx-auto font-medium"
          >
            Select the category that matches your requirements. We provide tailormade policies covering all stages of life.
          </p>
        </div>

        {/* Categories Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => {
            return (
              <div
                key={cat.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                onMouseEnter={() => handleCardMouseEnter(idx)}
                onMouseLeave={() => handleCardMouseLeave(idx)}
                className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col items-center text-center transition-all duration-300 select-none h-full relative group overflow-hidden"
              >
                {/* Badge Tag */}
                {cat.badge && (
                  <span className="absolute top-4 right-4 bg-secondary/10 text-primary border border-secondary/20 text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full select-none transition group-hover:scale-95 duration-300">
                    {cat.badge}
                  </span>
                )}

                {/* Accent glow line at top */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Premium Pexels Photo */}
                <div className="w-20 h-20 rounded-2xl overflow-hidden mb-5 shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm border border-slate-100/80 bg-slate-50">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="w-full h-full object-cover" 
                    loading="lazy" 
                  />
                </div>

                <h3 className="font-display font-extrabold text-dark text-sm md:text-base mb-2 leading-tight">
                  {cat.title}
                </h3>

                <p className="text-slate-500 text-xs leading-relaxed mb-6">
                  {cat.desc}
                </p>

                {/* Button Link */}
                {cat.path.startsWith('http') ? (
                  <a
                    href={cat.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-all duration-300 w-full mt-auto block text-center shadow-md shadow-primary/10 hover:shadow-lg active:scale-[0.98]"
                  >
                    {cat.ctaText}
                  </a>
                ) : (
                  <Link
                    to={cat.path}
                    className="px-5 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-all duration-300 w-full mt-auto block text-center shadow-md shadow-primary/10 hover:shadow-lg active:scale-[0.98] cursor-pointer"
                  >
                    {cat.ctaText}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
