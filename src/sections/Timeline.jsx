import React, { useEffect, useRef } from 'react';
import { ShoppingCart, HeartPulse, Send, UploadCloud, CheckCircle, Wallet } from 'lucide-react';
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
      title: 'Buy Policy',
      desc: 'Compare plans and secure your policy instantly via WhatsApp quote desk.',
      icon: <ShoppingCart className="w-5 h-5" />,
      color: 'bg-primary text-white border-primary/20'
    },
    {
      num: '2',
      title: 'Hospitalization',
      desc: 'Get admitted to any cashless network hospital or non-network empanelled clinic.',
      icon: <HeartPulse className="w-5 h-5" />,
      color: 'bg-secondary text-white border-secondary/20'
    },
    {
      num: '3',
      title: 'Inform Insurer',
      desc: 'Pre-authorize cashless approval desk or send emergency alerts within 24 hours.',
      icon: <Send className="w-5 h-5" />,
      color: 'bg-accent text-white border-accent/20'
    },
    {
      num: '4',
      title: 'Upload Documents',
      desc: 'Submit claims forms, bills, and discharge summaries online or at the desk.',
      icon: <UploadCloud className="w-5 h-5" />,
      color: 'bg-amber-500 text-white border-amber-500/20'
    },
    {
      num: '5',
      title: 'Approval Check',
      desc: 'Our claims relation desk evaluates details and issues pre-authorization clearances.',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'bg-emerald-500 text-white border-emerald-500/20'
    },
    {
      num: '6',
      title: 'Claim Settlement',
      desc: 'The insurer clears bills directly with the hospital or reimburses your bank account.',
      icon: <Wallet className="w-5 h-5" />,
      color: 'bg-indigo-500 text-white border-indigo-500/20'
    }
  ];

  return (
    <section ref={containerRef} className="py-20 md:py-28 bg-[#F8FBFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full inline-block">
            Claim Roadmap
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-dark mt-4">
            How Our Health Claims Process Works
          </h2>
          <p className="text-slate-500 text-xs md:text-sm mt-3 leading-relaxed">
            Painless claims approvals in six simple steps. We stand by you during medical emergencies with round-the-clock claim assistance.
          </p>
        </div>

        {/* Timeline body */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central tracker line (mobile line centered with w-14 avatar at 28px/7rem) */}
          <div className="absolute left-7 md:left-1/2 top-4 bottom-4 w-1 bg-slate-200 -translate-x-1/2 rounded-full" />
          
          {/* GSAP scroll-drawn progress indicator line */}
          <div
            className="absolute left-7 md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-primary via-secondary to-emerald-500 -translate-x-1/2 rounded-full origin-top timeline-progress"
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

                  {/* Central Node Avatar (Centered at 28px on mobile, half on desktop) */}
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
