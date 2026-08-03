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
        boxShadow: '0 25px 35px -5px rgba(39, 111, 39, 0.12), 0 12px 12px -5px rgba(39, 111, 39, 0.04)',
        borderColor: 'rgba(39, 111, 39, 0.3)',
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
        borderColor: 'rgba(241, 245, 249, 1)',
        duration: 0.3,
        ease: 'power2.inOut'
      });
    }
  };

  return (
    <section
      id="categories-section"
      ref={containerRef}
      className="py-[70px] md:py-[100px] bg-white relative border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#276F27] uppercase tracking-widest bg-[#F3F8F2] border border-[#276F27]/20 px-4 py-1.5 rounded-full inline-block mb-3">
            Coverage Options
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#1E293B]">
            Explore Insurance Categories
          </h2>
          <p className="text-slate-500 text-xs md:text-sm mt-3 leading-relaxed font-medium">
            Select your required policy domain. Compare plans from top insurers with instant quotes and 24/7 expert advisor support.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
          {CATEGORIES.map((cat, idx) => {
            const IconComponent = Icons[cat.icon] || Icons.Shield;
            
            return (
              <div
                key={cat.id}
                ref={(el) => (cardRefs.current[idx] = el)}
                onMouseEnter={() => handleCardMouseEnter(idx)}
                onMouseLeave={() => handleCardMouseLeave(idx)}
                className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs flex flex-col items-center text-center transition-all duration-300 select-none h-full relative group overflow-hidden"
              >
                {/* Badge Tag */}
                {cat.badge && (
                  <span className="absolute top-4 right-4 bg-[#8ECA3C]/20 text-[#276F27] border border-[#8ECA3C]/40 text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full select-none">
                    {cat.badge}
                  </span>
                )}

                {/* Green accent line on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#276F27] to-[#8ECA3C] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Image & Icon container */}
                <div className="relative mb-6 shrink-0">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-xs border border-slate-100 bg-[#F8FAF8] group-hover:scale-105 transition-transform duration-300">
                    <img 
                      src={cat.image} 
                      alt={cat.title} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-gradient-to-tr from-[#276F27] to-[#8ECA3C] flex items-center justify-center text-white shadow-md">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-display font-extrabold text-[#1E293B] text-base mb-2 leading-tight">
                  {cat.title}
                </h3>

                <p className="text-slate-500 text-xs leading-relaxed mb-6 font-medium flex-grow">
                  {cat.desc}
                </p>

                {/* Button Link */}
                {cat.path.startsWith('http') ? (
                  <a
                    href={cat.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-[#276F27] hover:bg-[#1B4D1B] text-white text-xs font-bold transition-all duration-300 w-full mt-auto block text-center shadow-md shadow-[#276F27]/10 hover:shadow-lg active:scale-[0.98]"
                  >
                    {cat.ctaText}
                  </a>
                ) : (
                  <Link
                    to={cat.path}
                    className="px-5 py-3 rounded-xl bg-[#276F27] hover:bg-[#1B4D1B] text-white text-xs font-bold transition-all duration-300 w-full mt-auto block text-center shadow-md shadow-[#276F27]/10 hover:shadow-lg active:scale-[0.98] cursor-pointer"
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

export default Categories;
