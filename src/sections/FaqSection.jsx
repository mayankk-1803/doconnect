import React, { useState, useRef } from 'react';
import { Search, ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import faqsData from '../data/faqs.json';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const FaqSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeId, setActiveId] = useState(null);
  
  const panelRefs = useRef({});

  const categories = ['All', 'Premium', 'Claims', 'Coverage', 'Tax', 'Hospitals'];

  // Filter FAQs based on query & selected category
  const filteredFaqs = faqsData.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
          duration: 0.35,
          ease: 'power3.inOut'
        });
      }
    }

    if (isOpening) {
      setActiveId(id);
      // Measure actual height
      gsap.fromTo(
        currentPanel,
        { height: 0, opacity: 0 },
        {
          height: 'auto',
          opacity: 1,
          duration: 0.45,
          ease: 'power3.out'
        }
      );
    } else {
      setActiveId(null);
      gsap.to(currentPanel, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: 'power3.inOut'
      });
    }
  };

  return (
    <section className="py-[60px] md:py-[90px] lg:py-[120px] bg-white relative">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full">
            Help Desk
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-dark mt-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-xs md:text-sm mt-3">
            Find answers to commonly asked questions or filter by specific topics.
          </p>
        </div>

        {/* Search & Categories Filters */}
        <div className="space-y-6 mb-12">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g., waiting period, Section 80D)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-dark placeholder:text-slate-400 shadow-sm"
            />
          </div>

          {/* Category Badges Grid */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveId(null); // Reset active accordion
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-md shadow-primary/10'
                    : 'bg-slate-50 border border-slate-100 hover:border-slate-200 text-slate-600 hover:text-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-3.5 min-h-[200px]">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.slice(0, 8).map((faq) => {
              const isOpen = activeId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`border rounded-2xl transition-colors duration-300 bg-white ${
                    isOpen ? 'border-primary shadow-sm shadow-primary/5' : 'border-slate-100'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between text-left px-5 py-4.5 focus:outline-none cursor-pointer group"
                  >
                    <span className={`font-semibold text-sm md:text-base leading-snug transition-colors ${
                      isOpen ? 'text-primary' : 'text-dark group-hover:text-primary'
                    }`}>
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ml-4 ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`} />
                  </button>

                  {/* Collapsible Answer */}
                  <div
                    ref={(el) => (panelRefs.current[faq.id] = el)}
                    className="h-0 opacity-0 overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 text-slate-500 text-xs md:text-sm leading-relaxed border-t border-slate-50/50">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 border border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-semibold text-sm">No FAQs found matching your query.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="text-xs text-primary font-bold mt-2 hover:underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Support Link */}
        <div className="text-center mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs font-semibold">
            Still have questions? Connect with our insurance experts directly.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1 bg-primary hover:bg-primary-dark text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition shadow-md shadow-primary/10 cursor-pointer"
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
