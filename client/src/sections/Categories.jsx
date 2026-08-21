import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { CATEGORIES } from '../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Categories = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal on scroll
      gsap.fromTo(
        cardRefs.current.filter(Boolean),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCardMouseEnter = (index) => {
    const card = cardRefs.current[index];
    if (card) {
      gsap.to(card, {
        y: -10,
        scale: 1.02,
        boxShadow: '0 25px 35px -5px rgba(47, 111, 175, 0.12), 0 12px 12px -5px rgba(47, 111, 175, 0.04)',
        borderColor: 'rgba(47, 111, 175, 0.3)',
        duration: 0.35,
        ease: 'power2.out'
      });
    }
  };

  const handleCardMouseLeave = (index) => {
    const card = cardRefs.current[index];
    if (card) {
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
        borderColor: '#DCEAF4',
        duration: 0.3,
        ease: 'power2.inOut'
      });
    }
  };

  return (
    <section
      id="categories-section"
      ref={containerRef}
      className="pt-[100px] pb-[70px] md:py-[100px] bg-white relative border-b border-[#DCEAF4] scroll-mt-24"
    >
      <div className="site-container">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#2F6FAF] uppercase tracking-widest bg-[#EAF6FC] border border-[#2F6FAF]/20 px-4 py-1.5 rounded-full inline-block mb-3">
            Coverage Options
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#16324F]">
            Explore Insurance Categories
          </h2>
          <p className="text-slate-500 text-xs md:text-sm mt-3 leading-relaxed font-medium">
            Select your required policy domain. Compare plans from top insurers with instant quotes and 24/7 expert advisor support.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
          {CATEGORIES.map((cat, idx) => {
            const IconComponent = Icons[cat.icon] || Icons.Shield;
            const ctaLabel = cat.cta || cat.ctaText || 'Get Quote';
            const cardDesc = cat.description || cat.desc;

            return (
              <div
                key={cat.id}
                ref={(el) => (cardRefs.current[idx] = el)}
                onMouseEnter={() => handleCardMouseEnter(idx)}
                onMouseLeave={() => handleCardMouseLeave(idx)}
                className="bg-white border border-[#DCEAF4] rounded-3xl p-6 md:p-7 shadow-xs flex flex-col items-center text-center transition-all duration-300 select-none h-full relative group overflow-hidden"
              >
                {/* Badge Tag */}
                {cat.badge && (
                  <span className="absolute top-4 right-4 bg-[#67B7E8]/15 text-[#2F6FAF] border border-[#67B7E8]/30 text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full select-none">
                    {cat.badge}
                  </span>
                )}

                {/* Blue accent line on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2F6FAF] to-[#67B7E8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Image & Icon container */}
                <div className="relative mb-5 shrink-0">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-xs border border-slate-100 bg-[#F7FAFC] group-hover:scale-105 transition-transform duration-300">
                    <img 
                      src={cat.image} 
                      alt={cat.title} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2F6FAF] to-[#67B7E8] flex items-center justify-center text-white shadow-md">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-display font-extrabold text-[#16324F] text-base md:text-lg mb-2 leading-tight">
                  {cat.title}
                </h3>

                <p className="text-slate-600 text-xs leading-relaxed mb-4 font-medium">
                  {cardDesc}
                </p>

                {/* Key Coverage Tags */}
                {cat.coverage && cat.coverage.length > 0 && (
                  <div className="flex flex-wrap items-center justify-center gap-1.5 mb-6 w-full">
                    {cat.coverage.slice(0, 4).map((cov, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[10px] font-semibold text-[#2F6FAF] bg-[#EAF6FC] border border-[#2F6FAF]/15 px-2 py-0.5 rounded-md"
                      >
                        {cov}
                      </span>
                    ))}
                    {cat.coverage.length > 4 && (
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
                        +{cat.coverage.length - 4} more
                      </span>
                    )}
                  </div>
                )}

                {/* Button Link */}
                {cat.path.startsWith('http') ? (
                  <a
                    href={cat.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-[#2F6FAF] hover:bg-[#245B91] text-white text-xs font-bold transition-all duration-300 w-full mt-auto block text-center shadow-md shadow-[#2F6FAF]/15 hover:shadow-lg active:scale-[0.98]"
                  >
                    {ctaLabel}
                  </a>
                ) : (
                  <Link
                    to={cat.path}
                    className="px-5 py-3 rounded-xl bg-[#2F6FAF] hover:bg-[#245B91] text-white text-xs font-bold transition-all duration-300 w-full mt-auto block text-center shadow-md shadow-[#2F6FAF]/15 hover:shadow-lg active:scale-[0.98] cursor-pointer"
                  >
                    {ctaLabel}
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

export default Categories;
