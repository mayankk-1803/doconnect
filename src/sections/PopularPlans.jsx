import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import plansData from '../data/plans.json';
import InsuranceCard from '../components/cards/InsuranceCard';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PopularPlans = () => {
  const sectionRef = useRef(null);

  // Filter 3 best plans to show on home screen
  const popularPlans = plansData.filter((p) =>
    ['hdfc-optima-secure', 'niva-reassurance', 'care-supreme'].includes(p.id)
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll('.plan-wrapper');
      
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
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
    <section ref={sectionRef} className="py-[60px] md:py-[90px] lg:py-[120px] bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full">
              Handpicked Plans
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-dark mt-4">
              Popular Health Insurance Plans
            </h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl">
              Highly rated options featuring comprehensive features, high claim settlement ratios, and premium cashless hospital facilities.
            </p>
          </div>

          <Link
            to="/health-insurance"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline hover:gap-2.5 transition-all shrink-0"
          >
            Explore all 100+ plans
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Insurance Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularPlans.map((plan) => (
            <div key={plan.id} className="plan-wrapper">
              <InsuranceCard plan={plan} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularPlans;
