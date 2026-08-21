import React, { useEffect, useRef } from 'react';
import { STATS } from '../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Stats = () => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal container
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );

      // Count up values
      const counters = containerRef.current.querySelectorAll('.stat-count');
      counters.forEach((counter) => {
        const targetValue = parseFloat(counter.getAttribute('data-target'));
        const isDecimal = targetValue % 1 !== 0;
        const valObj = { value: 0 };

        gsap.to(valObj, {
          value: targetValue,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: counter,
            start: 'top 85%',
          },
          onUpdate: () => {
            counter.innerHTML = isDecimal
              ? valObj.value.toFixed(1)
              : Math.floor(valObj.value).toLocaleString();
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-12 bg-[#F8FBFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Large Rounded White Glass Card */}
        <div
          ref={cardRef}
          className="bg-white/80 backdrop-blur-md border border-white/60 rounded-[36px] shadow-xl p-8 md:p-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 items-center text-center">
            {STATS.map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-center font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-dark">
                  <span
                    className="stat-count"
                    data-target={stat.value}
                  >
                    0
                  </span>
                  <span className="text-primary">{stat.suffix}</span>
                </div>
                <p className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Stats;
