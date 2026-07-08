import React, { useEffect, useRef } from 'react';
import partnersData from '../data/partners.json';
import gsap from 'gsap';

const Partners = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Fade in logos on scroll
    const logos = containerRef.current.querySelectorAll('.partner-logo-item');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              logos,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, stagger: 0.05, duration: 0.6, ease: 'power2.out' }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="py-12 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
          Trusted by India's Leading Insurance Partners
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 md:gap-8 items-center justify-items-center">
          {partnersData.map((partner) => (
            <div
              key={partner.id}
              className="partner-logo-item bg-slate-50 hover:bg-primary/5 border border-slate-100 hover:border-primary/10 px-4 py-3 rounded-2xl w-full text-center transition-all duration-300 transform hover:-translate-y-1 select-none filter grayscale hover:grayscale-0 cursor-pointer"
            >
              <span className="font-display font-bold text-slate-500 hover:text-primary transition-colors text-sm whitespace-nowrap block">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
