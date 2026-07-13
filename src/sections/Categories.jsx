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
        boxShadow: '0 25px 30px -5px rgba(15, 76, 129, 0.08), 0 12px 12px -5px rgba(15, 76, 129, 0.03)',
        borderColor: 'rgba(15, 76, 129, 0.15)',
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
      className="py-[60px] md:py-[90px] lg:py-[120px] bg-white relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Insurance Slabs
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-dark">
            Insurance Solutions For Every Need
          </h2>
          <p className="text-slate-500 text-xs md:text-sm mt-3 leading-relaxed">
            Select the category that matches your requirements. We provide tailormade policies covering all stages of life.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const IconComponent = Icons[cat.icon] || Icons.Shield;
            
            return (
              <div
                key={cat.id}
                ref={(el) => (cardRefs.current[idx] = el)}
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
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Large rounded icon with blue gradient */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg shadow-primary/15 mb-6 shrink-0 group-hover:rotate-[6deg] transition-transform duration-300">
                  <IconComponent className="w-7 h-7" />
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

export default Categories;
