import React, { useEffect, useRef } from 'react';
import { WHY_CHOOSE_US, BRAND_CONFIG } from '../constants';
import FeatureCard from '../components/cards/FeatureCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll('.feature-wrapper');
      
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-[60px] md:py-[90px] lg:py-[120px] bg-white relative border-b border-slate-100/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 border border-secondary/20 px-3.5 py-1.5 rounded-full">
            Our Advantage
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-dark mt-4">
            Why Millions Trust {BRAND_CONFIG.name}
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-3 leading-relaxed">
            We simplify complex jargon to help you choose the best plans. Secure your family's health with India's most transparent insurance advisors.
          </p>
        </div>

        {/* Features Flex Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div key={idx} className="feature-wrapper">
              <FeatureCard
                title={item.title}
                desc={item.desc}
                iconName={item.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
