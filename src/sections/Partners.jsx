import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Check, Plus } from 'lucide-react';
import partnerCompanies from '../data/partners.json';
import plansData from '../data/plans.json';
import { useCompare } from '../context/CompareContext';
import { toast } from 'react-toastify';
import gsap from 'gsap';

// Brand SVGs matching official logos
const BajajLogo = () => (
  <svg viewBox="0 0 120 40" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="40" rx="4" fill="#005CA9"/>
    <path d="M15 10C15 10 25 10 25 15C25 20 18 20 18 20C18 20 28 20 28 27C28 34 15 34 15 34V10Z" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="18" y1="20" x2="25" y2="20" stroke="white" strokeWidth="3"/>
    <text x="36" y="25" fill="white" fontFamily="sans-serif" fontWeight="900" fontSize="13">BAJAJ</text>
    <text x="36" y="34" fill="#1296DB" fontFamily="sans-serif" fontWeight="700" fontSize="8">ALLIANZ</text>
  </svg>
);

const HdfcErgoLogo = () => (
  <svg viewBox="0 0 120 40" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="40" rx="4" fill="#D1232A"/>
    <rect x="4" y="4" width="112" height="32" rx="2" fill="white"/>
    <text x="12" y="24" fill="#D1232A" fontFamily="sans-serif" fontWeight="900" fontSize="18" letterSpacing="-1">HDFC</text>
    <text x="12" y="32" fill="#1E3A8A" fontFamily="sans-serif" fontWeight="950" fontSize="8" letterSpacing="4">ERGO</text>
  </svg>
);

const RoyalSundaramLogo = () => (
  <svg viewBox="0 0 120 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="40" rx="4" fill="white"/>
    <circle cx="20" cy="20" r="14" fill="#0A3C76"/>
    <text x="14" y="27" fill="white" fontFamily="sans-serif" fontWeight="900" fontSize="16" fontStyle="italic">sf</text>
    <text x="40" y="20" fill="#0A3C76" fontFamily="sans-serif" fontWeight="800" fontSize="11">ROYAL</text>
    <text x="40" y="31" fill="#0A3C76" fontFamily="sans-serif" fontWeight="500" fontSize="9">SUNDARAM</text>
  </svg>
);

const CholaLogo = () => (
  <svg viewBox="0 0 120 40" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="40" rx="4" fill="white"/>
    <path d="M10 12L22 12L16 28Z" fill="#D1232A"/>
    <path d="M22 12L34 12L28 28Z" fill="#0A3C76"/>
    <text x="38" y="22" fill="#0A3C76" fontFamily="sans-serif" fontWeight="900" fontSize="13">Chola</text>
    <path d="M78 18L81 22L84 18" stroke="#D1232A" strokeWidth="2"/>
    <text x="86" y="22" fill="#D1232A" fontFamily="sans-serif" fontWeight="900" fontSize="13">MS</text>
    <text x="38" y="32" fill="#64748B" fontFamily="sans-serif" fontWeight="700" fontSize="7" letterSpacing="1">GENERAL INSURANCE</text>
  </svg>
);

const SbiGeneralLogo = () => (
  <svg viewBox="0 0 120 40" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="40" rx="4" fill="white"/>
    <circle cx="22" cy="20" r="12" fill="#00B1EC"/>
    <circle cx="22" cy="20" r="4" fill="white"/>
    <rect x="20" y="20" width="4" height="12" fill="white"/>
    <text x="42" y="20" fill="#003087" fontFamily="sans-serif" fontWeight="900" fontSize="15" letterSpacing="-0.5">SBI</text>
    <text x="42" y="32" fill="#00B1EC" fontFamily="sans-serif" fontWeight="800" fontSize="10">GENERAL</text>
  </svg>
);

const IciciLombardLogo = () => (
  <svg viewBox="0 0 120 40" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="40" rx="4" fill="#800000"/>
    <circle cx="18" cy="14" r="3" fill="#FFC72C"/>
    <path d="M12 30C12 24 16 20 22 20H24V30H12Z" fill="#FFC72C"/>
    <text x="32" y="22" fill="white" fontFamily="sans-serif" fontWeight="900" fontSize="12">ICICI</text>
    <text x="32" y="32" fill="#FFC72C" fontFamily="sans-serif" fontWeight="800" fontSize="9">Lombard</text>
  </svg>
);

const DigitLogo = () => (
  <svg viewBox="0 0 120 40" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="40" rx="4" fill="white"/>
    <circle cx="20" cy="20" r="12" fill="#FF5722"/>
    <text x="16" y="26" fill="white" fontFamily="sans-serif" fontWeight="900" fontSize="16">d</text>
    <text x="38" y="22" fill="#1E293B" fontFamily="sans-serif" fontWeight="900" fontSize="16" letterSpacing="-1">digit</text>
    <text x="38" y="31" fill="#64748B" fontFamily="sans-serif" fontWeight="700" fontSize="7">INSURANCE</text>
  </svg>
);

const TataAigLogo = () => (
  <svg viewBox="0 0 120 40" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="40" rx="4" fill="#00A2E8"/>
    <text x="12" y="24" fill="white" fontFamily="sans-serif" fontWeight="900" fontSize="15">TATA</text>
    <text x="12" y="34" fill="#1E293B" fontFamily="sans-serif" fontWeight="900" fontSize="10" letterSpacing="2">AIG</text>
  </svg>
);

const NivaBupaLogo = () => (
  <svg viewBox="0 0 120 40" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="40" rx="4" fill="white"/>
    <circle cx="20" cy="20" r="10" fill="#005FA9"/>
    <text x="36" y="22" fill="#005FA9" fontFamily="sans-serif" fontWeight="900" fontSize="14">niva</text>
    <text x="36" y="32" fill="#1296DB" fontFamily="sans-serif" fontWeight="900" fontSize="12">bupa</text>
  </svg>
);

const StarHealthLogo = () => (
  <svg viewBox="0 0 120 40" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="40" rx="4" fill="white"/>
    <path d="M20 7L23 15H31L25 20L27 28L20 23L13 28L15 20L9 15H17L20 7Z" fill="#0A3C76"/>
    <text x="36" y="22" fill="#0A3C76" fontFamily="sans-serif" fontWeight="900" fontSize="13">STAR</text>
    <text x="36" y="32" fill="#00B1EC" fontFamily="sans-serif" fontWeight="808" fontSize="9">HEALTH INSURANCE</text>
  </svg>
);

const LicLogo = () => (
  <svg viewBox="0 0 120 40" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="40" rx="4" fill="#005CA9"/>
    <rect x="2" y="2" width="30" height="36" fill="#FCE300" rx="2"/>
    <circle cx="17" cy="15" r="5" fill="#D1232A"/>
    <text x="38" y="22" fill="#FCE300" fontFamily="sans-serif" fontWeight="900" fontSize="18">LIC</text>
    <text x="38" y="32" fill="white" fontFamily="sans-serif" fontWeight="700" fontSize="7" letterSpacing="0.5">भारतीय जीवन बीमा निगम</text>
  </svg>
);

const HdfcLifeLogo = () => (
  <svg viewBox="0 0 120 40" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="40" rx="4" fill="#D1232A"/>
    <rect x="4" y="4" width="112" height="32" rx="2" fill="white"/>
    <text x="12" y="24" fill="#D1232A" fontFamily="sans-serif" fontWeight="900" fontSize="18" letterSpacing="-1">HDFC</text>
    <text x="12" y="32" fill="#1E293B" fontFamily="sans-serif" fontWeight="950" fontSize="8" letterSpacing="4">LIFE</text>
  </svg>
);

const CareHealthLogo = () => (
  <svg viewBox="0 0 120 40" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="40" rx="4" fill="#00A88F"/>
    <text x="15" y="26" fill="white" fontFamily="sans-serif" fontWeight="900" fontSize="18">care</text>
    <text x="60" y="26" fill="white" fontFamily="sans-serif" fontWeight="500" fontSize="10">HEALTH</text>
  </svg>
);

const renderCompanyLogo = (company) => {
  const id = company.id;
  if (id === 'bajaj-allianz-gen') {
    return <BajajLogo />;
  } else if (id === 'hdfc-ergo') {
    return <HdfcErgoLogo />;
  } else if (id === 'royal-sundaram') {
    return <RoyalSundaramLogo />;
  } else if (id === 'cholamandalam') {
    return <CholaLogo />;
  } else if (id === 'sbi-general') {
    return <SbiGeneralLogo />;
  } else if (id === 'icici-lombard') {
    return <IciciLombardLogo />;
  } else if (id === 'digit-insurance') {
    return <DigitLogo />;
  } else if (id === 'tata-aig' || id === 'tata-aia') {
    return <TataAigLogo />;
  } else if (id === 'niva-bupa') {
    return <NivaBupaLogo />;
  } else if (id === 'star-health') {
    return <StarHealthLogo />;
  } else if (id === 'lic') {
    return <LicLogo />;
  } else if (id === 'hdfc-life') {
    return <HdfcLifeLogo />;
  } else if (id === 'care-health') {
    return <CareHealthLogo />;
  }

  // Fallback badge helper
  const colors = [
    { bg: 'from-blue-600 to-indigo-700' },
    { bg: 'from-emerald-600 to-teal-700' },
    { bg: 'from-cyan-500 to-blue-600' },
    { bg: 'from-red-500 to-rose-650' },
    { bg: 'from-amber-500 to-orange-650' }
  ];
  const colorIdx = (company.name.charCodeAt(0) + company.name.length) % colors.length;
  const color = colors[colorIdx];
  const words = company.name.split(' ');
  const initials = words.map(w => w[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div className={`w-full h-full bg-gradient-to-br ${color.bg} rounded-lg flex flex-col items-center justify-center p-1.5 text-center relative overflow-hidden select-none`}>
      <span className="font-display font-black text-white text-[11px] leading-none mb-0.5 tracking-wider">{initials}</span>
      <span className="text-[6.5px] font-bold text-white/95 leading-tight uppercase max-w-full truncate">{company.name}</span>
    </div>
  );
};

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
    <section id="partners-section" className="py-[70px] md:py-[100px] bg-[#EAF6FC] border-b border-slate-200/80 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#075FC1] uppercase tracking-widest bg-[#075FC1]/10 border border-[#075FC1]/20 px-3.5 py-1.5 rounded-full inline-block">
            Our Insurance Network
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#062B5C] mt-4">
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
                      ? 'bg-[#075FC1] text-white shadow-md shadow-[#075FC1]/20 scale-[1.02]'
                      : 'text-slate-600 hover:text-[#075FC1] hover:bg-[#EAF6FC]'
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
                    <div className="bg-white border border-slate-100 hover:border-[#075FC1]/30 rounded-[28px] p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-[280px] relative overflow-hidden group">
                      
                      {/* Logo & Rating Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-[100px] h-[34px] rounded-lg overflow-hidden flex items-center justify-center bg-white shadow-2xs shrink-0 group-hover:scale-105 transition-transform duration-300 relative">
                          {renderCompanyLogo(company)}
                        </div>
                        
                        <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 rounded-lg px-2.5 py-1 text-amber-700 font-extrabold text-[11px]">
                          <Star className="w-3.5 h-3.5 fill-amber-500 stroke-none" />
                          <span>{company.rating}</span>
                        </div>
                      </div>

                      {/* Name */}
                      <h3 className="font-display font-extrabold text-[#062B5C] text-base group-hover:text-[#075FC1] transition duration-300 leading-tight mb-3">
                        {company.name}
                      </h3>

                      {/* Details specs */}
                      <div className="space-y-2 mb-6 text-xs text-slate-500 font-medium">
                        <div className="flex justify-between items-center">
                          <span>Claim Settled:</span>
                          <span className="font-extrabold text-[#075FC1]">{company.claimRatio}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Cashless Hospitals:</span>
                          <span className="font-bold text-[#062B5C]">{company.hospitals}</span>
                        </div>
                      </div>

                      {/* Compare Desk Action */}
                      <button
                        onClick={() => handleCompareClick(company)}
                        className={`w-full mt-auto py-3 px-4 rounded-xl font-extrabold text-xs transition flex items-center justify-center gap-2 cursor-pointer border ${
                          isSelected
                            ? 'bg-[#075FC1] border-[#075FC1] text-white shadow-md'
                            : 'bg-slate-50 border-slate-200/80 hover:bg-[#075FC1]/5 hover:border-[#075FC1] text-slate-700 hover:text-[#075FC1]'
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
              className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-700 hover:text-[#075FC1] hover:border-[#075FC1] transition cursor-pointer z-20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Next Button Arrow */}
          {currentIndex < maxIndex && (
            <button
              onClick={handleNext}
              className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-700 hover:text-[#075FC1] hover:border-[#075FC1] transition cursor-pointer z-20"
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
