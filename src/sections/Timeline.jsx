import React, { useEffect, useRef } from 'react';
import { Search, GitCompare, CreditCard, Zap } from 'lucide-react';
import { BRAND_CONFIG } from '../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = containerRef.current.querySelectorAll('.timeline-node');
      const progressLine = containerRef.current.querySelector('.timeline-progress');

      // Animate progress line growth on scroll
      gsap.fromTo(
        progressLine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 30%',
            end: 'bottom 80%',
            scrub: true,
          }
        }
      );

      // Staggered fade up reveal for timeline blocks
      items.forEach((item) => {
        gsap.fromTo(
          item.querySelector('.timeline-card'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: '1',
      title: 'Choose Plan',
      desc: 'Browse and select from top-rated health, motor, life, travel, or pet plans tailored for you.',
      icon: <Search className="w-5 h-5" />,
      color: 'bg-primary text-white border-primary/20'
    },
    {
      num: '2',
      title: 'Compare Quotes',
      desc: 'Evaluate premiums, benefits, cashless network hospitals, and claim ratios side-by-side.',
      icon: <GitCompare className="w-5 h-5" />,
      color: 'bg-secondary text-white border-secondary/20'
    },
    {
      num: '3',
      title: 'Buy Online',
      desc: 'Lock in your direct-to-customer rate with zero broker commission and paperless checkout.',
      icon: <CreditCard className="w-5 h-5" />,
      color: 'bg-accent text-white border-accent/20'
    },
    {
      num: '4',
      title: 'Instant Policy',
      desc: 'Get your official policy document sent straight to your email address and WhatsApp within 60 seconds.',
      icon: <Zap className="w-5 h-5" />,
      color: 'bg-amber-500 text-white border-amber-500/20'
    }
  ];

  return (
    <section ref={containerRef} className="py-20 md:py-28 bg-[#F1F5F9] relative overflow-hidden border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full inline-block">
            Simple Process
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-dark mt-4">
            How {BRAND_CONFIG.name} Works
          </h2>
          <p className="text-slate-500 text-xs md:text-sm mt-3 leading-relaxed">
            Get your insurance policy in four easy steps. Our digital workflow guarantees instant approvals and direct pricing.
          </p>
        </div>

        {/* Timeline body */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central tracker line (mobile line centered with w-14 avatar at 28px/7rem) */}
          <div className="absolute left-7 md:left-1/2 top-4 bottom-4 w-1 bg-slate-200 -translate-x-1/2 rounded-full" />
          
          {/* GSAP scroll-drawn progress indicator line */}
          <div
            className="absolute left-7 md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-primary via-secondary to-accent -translate-x-1/2 rounded-full origin-top timeline-progress"
            style={{ transform: 'scaleY(0)' }}
          />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`timeline-node flex flex-col md:flex-row items-start md:items-center relative ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Left spacer for desktop */}
                  <div className="w-full md:w-1/2 hidden md:block" />

                  {/* Central Node Avatar */}
                  <div className="absolute left-0 md:left-1/2 top-1.5 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 z-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white ${step.color}`}>
                      {step.icon}
                    </div>
                  </div>

                  {/* Timeline Description Block */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-8">
                    <div className="timeline-card bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm hover:shadow-md transition duration-300">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-extrabold text-primary bg-primary/10 border border-primary/25 rounded-lg px-2.5 py-0.5">
                          Step {step.num}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-dark text-lg mb-2">
                        {step.title}
                      </h3>
                      <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
