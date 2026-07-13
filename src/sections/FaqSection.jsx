import React, { useState, useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import faqsData from '../data/faqs.json';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const FaqSection = () => {
  const [activeId, setActiveId] = useState(null);
  const panelRefs = useRef({});

  // Display only the 5 most common/important insurance FAQs
  const commonFaqs = faqsData.filter((faq) => [1, 6, 8, 13, 16].includes(faq.id));

  const toggleFAQ = (id) => {
    const isOpening = activeId !== id;
    const currentPanel = panelRefs.current[id];
    
    // Close the currently active panel if any
    if (activeId !== null && activeId !== id) {
      const activePanel = panelRefs.current[activeId];
      if (activePanel) {
        gsap.to(activePanel, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut'
        });
      }
    }

    if (isOpening) {
      setActiveId(id);
      gsap.fromTo(
        currentPanel,
        { height: 0, opacity: 0 },
        {
          height: 'auto',
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out'
        }
      );
    } else {
      setActiveId(null);
      gsap.to(currentPanel, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut'
      });
    }
  };

  return (
    <section className="py-[60px] md:py-[90px] lg:py-[100px] bg-white relative border-b border-slate-100/50">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full">
            Help Desk
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-dark mt-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-xs md:text-sm mt-3">
            Quick answers to the questions our customers ask most.
          </p>
        </div>

        {/* Compact Accordion */}
        <div className="space-y-4">
          {commonFaqs.map((faq) => {
            const isOpen = activeId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all duration-300 bg-white ${
                  isOpen ? 'border-primary shadow-sm shadow-primary/5' : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between text-left px-6 py-4.5 focus:outline-none cursor-pointer group"
                >
                  <span className={`font-bold text-sm leading-snug transition-colors ${
                    isOpen ? 'text-primary' : 'text-dark group-hover:text-primary'
                  }`}>
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ml-4 ${
                    isOpen ? 'rotate-180 text-primary' : ''
                  }`} />
                </button>

                {/* Collapsible Answer */}
                <div
                  ref={(el) => (panelRefs.current[faq.id] = el)}
                  className="h-0 opacity-0 overflow-hidden"
                >
                  <div className="px-6 pb-5 pt-1 text-slate-500 text-xs md:text-sm leading-relaxed border-t border-slate-50/50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support Link */}
        <div className="text-center mt-10 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs font-bold text-left">
            Still have questions? Connect with our senior advisors directly.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs px-5 py-3 rounded-xl transition shadow-md shadow-primary/10 hover:shadow-lg active:scale-[0.98] cursor-pointer"
          >
            Contact Advisor
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
