import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Check, Plus } from 'lucide-react';
import partnerCompanies from '../data/partners.json';
import plansData from '../data/plans.json';
import { useCompare } from '../context/CompareContext';
import { toast } from 'react-toastify';
import gsap from 'gsap';

const Partners = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [currentIndex, setCurrentIndex] = useState(0);
  const { comparedPlans, addToCompare, removeFromCompare } = useCompare();
  const carouselTrackRef = useRef(null);
  const tabsContainerRef = useRef(null);

  const TABS = ['General', 'Car', 'Bike', 'Health', 'Term', 'Life', 'Investment', 'Business', 'Travel'];

  // Filter companies based on active tab
  const filteredCompanies = partnerCompanies.filter((company) =>
    company.categories.includes(activeTab)
  );

  // Responsive visible cards count
  const [visibleCards, setVisibleCards] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(4);
      } else if (window.innerWidth >= 768) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset index when changing tabs
  useEffect(() => {
    setCurrentIndex(0);
    // Animate active cards coming in smoothly
    if (carouselTrackRef.current) {
      gsap.fromTo(
        carouselTrackRef.current.children,
        { opacity: 0, y: 15, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  const maxIndex = Math.max(0, filteredCompanies.length - visibleCards);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Touch Swipe support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    if (swipeDistance > 50) {
      handleNext();
    } else if (swipeDistance < -50) {
      handlePrev();
    }
  };

  // Compare plan handler
  const handleCompareClick = (company) => {
    const matchingPlan = plansData.find(
      (plan) => plan.companyId === company.id || plan.companyName.toLowerCase() === company.name.toLowerCase()
    );

    if (!matchingPlan) {
      toast.error(`No comparative plans found in database for ${company.name} under ${activeTab} category.`);
      return;
    }

    if (comparedPlans.some((p) => p.id === matchingPlan.id)) {
      removeFromCompare(matchingPlan.id);
      toast.info(`Removed ${matchingPlan.name} from comparison.`);
    } else {
      addToCompare(matchingPlan);
      toast.success(`Added ${matchingPlan.name} to comparison.`);
    }
  };

  return (
    <section id="partners-section" className="py-[70px] md:py-[100px] bg-[#F3F8F2] border-b border-slate-200/80 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#276F27] uppercase tracking-widest bg-[#276F27]/10 border border-[#276F27]/20 px-3.5 py-1.5 rounded-full inline-block">
            Our Insurance Network
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#1E293B] mt-4">
            Our Insurance Partners
          </h2>
          <p className="text-slate-500 text-xs md:text-sm mt-3 leading-relaxed font-medium">
            Compare policies from 35+ of India's leading IRDAI-approved insurance providers with zero sales pressure and instant digital issuance.
          </p>
        </div>

        {/* Dynamic Category Tabs */}
        <div className="mb-10 max-w-5xl mx-auto overflow-x-auto scrollbar-none" ref={tabsContainerRef}>
          <div className="flex items-center justify-between sm:justify-center gap-2 p-1.5 bg-white border border-slate-200/80 rounded-[20px] shadow-xs min-w-max">
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-[14px] text-xs font-extrabold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#276F27] text-white shadow-md shadow-[#276F27]/20 scale-[1.02]'
                      : 'text-slate-600 hover:text-[#276F27] hover:bg-[#F3F8F2]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel Window */}
        <div className="relative max-w-6xl mx-auto px-4">
          
          {/* Track slider */}
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={carouselTrackRef}
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`
              }}
            >
              {filteredCompanies.map((company) => {
                const matchingPlan = plansData.find(
                  (plan) => plan.companyId === company.id || plan.companyName.toLowerCase() === company.name.toLowerCase()
                );
                const isSelected = matchingPlan && comparedPlans.some((p) => p.id === matchingPlan.id);

                return (
                  <div
                    key={company.id}
                    className="w-full flex-shrink-0"
                    style={{
                      width: `calc(${100 / visibleCards}% - ${(24 * (visibleCards - 1)) / visibleCards}px)`
                    }}
                  >
                    <div className="bg-white border border-slate-100 hover:border-[#276F27]/30 rounded-[28px] p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-[280px] relative overflow-hidden group">
                      
                      {/* Logo & Rating Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 rounded-2xl border border-slate-100 overflow-hidden flex items-center justify-center bg-white p-2 shadow-xs shrink-0 group-hover:scale-105 transition-transform duration-300 relative">
                          <img 
                            src={`https://logo.clearbit.com/${company.domain}?size=100`} 
                            alt={company.name} 
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              const fallback = e.target.parentNode.querySelector('.fallback-logo');
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                          {/* Fallback container if logo is missing */}
                          <div className="fallback-logo hidden absolute inset-0 bg-gradient-to-br from-[#276F27]/10 to-[#8ECA3C]/20 items-center justify-center text-[#276F27] font-display font-black text-base select-none">
                            {company.name.charAt(0)}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 rounded-lg px-2.5 py-1 text-amber-700 font-extrabold text-[11px]">
                          <Star className="w-3.5 h-3.5 fill-amber-500 stroke-none" />
                          <span>{company.rating}</span>
                        </div>
                      </div>

                      {/* Name */}
                      <h3 className="font-display font-extrabold text-[#1E293B] text-base group-hover:text-[#276F27] transition duration-300 leading-tight mb-3">
                        {company.name}
                      </h3>

                      {/* Details specs */}
                      <div className="space-y-2 mb-6 text-xs text-slate-500 font-medium">
                        <div className="flex justify-between items-center">
                          <span>Claim Settled:</span>
                          <span className="font-extrabold text-[#276F27]">{company.claimRatio}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Cashless Hospitals:</span>
                          <span className="font-bold text-[#1E293B]">{company.hospitals}</span>
                        </div>
                      </div>

                      {/* Compare Desk Action */}
                      <button
                        onClick={() => handleCompareClick(company)}
                        className={`w-full mt-auto py-3 px-4 rounded-xl font-extrabold text-xs transition flex items-center justify-center gap-2 cursor-pointer border ${
                          isSelected
                            ? 'bg-[#276F27] border-[#276F27] text-white shadow-md'
                            : 'bg-slate-50 border-slate-200/80 hover:bg-[#276F27]/5 hover:border-[#276F27] text-slate-700 hover:text-[#276F27]'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-4 h-4 stroke-[3]" />
                            <span>Comparing Plan</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Compare Desk</span>
                          </>
                        )}
                      </button>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Previous Button Arrow */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-700 hover:text-[#276F27] hover:border-[#276F27] transition cursor-pointer z-20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Next Button Arrow */}
          {currentIndex < maxIndex && (
            <button
              onClick={handleNext}
              className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-700 hover:text-[#276F27] hover:border-[#276F27] transition cursor-pointer z-20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

        </div>
      </div>
    </section>
  );
};

export default Partners;
