import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PARTNERS_LIST = [
  { name: 'Aditya Birla Group', src: '/adityabirlagroup.jpg' },
  { name: 'ICICI Lombard', src: '/icicilombard.jpg' },
  {name :'Care Health',src:'/care.jpg'},
  { name: 'HDFC ERGO', src: '/hdfcergo.jpg' },
  { name: 'Star Health Insurance', src: '/star.jpg' },
  { name: 'Tata AIG', src: '/tataaig.jpg' },
  { name: 'Niva Bupa ', src: '/nivabupa.jpg' },
  {name : 'Manipal Cigna',src:'/manipalcigna.png'},
  {name :'Reliance ' , src:'/reliance.jpg'},
  {name:'IFFCO-TOKIO General Insurance',src:'/iffco.webp'},
  {name:'SBI General Insurance',src:'/sbi.png'},
  { name: 'Bajaj Allianz', src: '/bajaj.jpg' }
 
];

const Partners = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = containerRef.current.querySelectorAll('.partner-card-item');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 25, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.03,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="partners-section" 
      className="pt-[100px] pb-[70px] md:py-[100px] bg-white border-b border-[#DCEAF4] relative overflow-hidden select-none scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#2F6FAF] uppercase tracking-widest bg-[#EAF6FC] border border-[#DCEAF4] px-3.5 py-1.5 rounded-full inline-block">
            Our Insurance Network
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#16324F] mt-4">
            Our Partners
          </h2>
          <p className="text-slate-500 text-xs md:text-sm mt-3 leading-relaxed font-medium">
            Compare policies from India's leading IRDAI-approved insurance providers with zero sales pressure and instant digital issuance.
          </p>
        </div>

        {/* Responsive Grid of Logo Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {PARTNERS_LIST.map((partner, idx) => {
            return (
              <div 
                key={idx}
                className="partner-card-item bg-white border border-[#DCEAF4] rounded-[24px] p-5 flex items-center justify-center h-28 w-full shadow-2xs hover:shadow-md hover:border-[#2F6FAF]/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src={partner.src} 
                    alt={partner.name} 
                    className="w-full h-full object-contain select-none pointer-events-none"
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Partners;
