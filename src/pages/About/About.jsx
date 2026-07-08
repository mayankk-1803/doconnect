import React, { useEffect, useRef } from 'react';
import SEO from '../../components/common/SEO';
import Breadcrumb from '../../components/common/Breadcrumb';
import { Shield, Sparkles, Award, Users, ShieldCheck, Heart, Rocket, Target } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  const breadcrumbItems = [{ label: 'About Us', path: '/about' }];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // General story/value sections fade-in
      const generalItems = containerRef.current.querySelectorAll('.animate-on-scroll');
      generalItems.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      });

      // Milestone Header Fade Up
      gsap.fromTo(
        '.milestone-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.milestone-header',
            start: 'top 85%',
          }
        }
      );

      // Timeline Line Growth (origin-top)
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'none',
          scrollTrigger: {
            trigger: '.milestone-timeline-wrapper',
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: true,
          }
        }
      );

      // Timeline nodes and cards slide-in
      const timelineItems = containerRef.current.querySelectorAll('.timeline-item');
      timelineItems.forEach((item, index) => {
        const isEven = index % 2 === 0;
        const node = item.querySelector('.timeline-node');
        const card = item.querySelector('.timeline-card-wrapper');

        // Node scale-up with glow
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
            }
          }
        );

        // Card slide-in (alternates: even slides left, odd slides right on desktop)
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            x: window.innerWidth >= 1024 ? (isEven ? -60 : 60) : 0,
            y: window.innerWidth < 1024 ? 40 : 0
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const values = [
    {
      title: 'Customer First',
      desc: 'Every advisor advice, claim support mediation, and quote recommendation starts with the customer interest first.',
      icon: <Users className="w-6 h-6 text-primary" />
    },
    {
      title: 'Absolute Transparency',
      desc: 'No hidden clauses, no secret commissions, and no pushy sales behavior. Complete visibility of rates.',
      icon: <ShieldCheck className="w-6 h-6 text-secondary" />
    },
    {
      title: 'Claims Assistance Guarantee',
      desc: 'Our claims relations desk walks patients and families through approvals, ensuring paperless approvals.',
      icon: <Heart className="w-6 h-6 text-rose-500" />
    }
  ];

  return (
    <div ref={containerRef}>
      <SEO
        title="About Our Journey & Vision"
        description="Discover the story behind SecureHealth. Learn about our values, mission, achievements, and why millions trust us with health covers."
        keywords="about securehealth, insurance advisors, company values"
        path="/about"
      />

      <div className="bg-slate-50 border-b border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-dark mt-2">
            Our Journey & Vision
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl mt-1.5">
            Simplifying health insurance covers for families across India with transparent comparison engines and expert advisor networks.
          </p>
        </div>
      </div>

      {/* Corporate Story */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-5 animate-on-scroll">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full inline-block">
            Our Foundation
          </span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-dark">
            Bridging the Gap Between Complex Policies and Happy Families
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            SecureHealth was founded with a singular focus: to make health insurance easy to understand and direct to conclude. Traditional buying models are plagued by biased agents, endless cold calls, and hidden fine-prints that surface only during claim rejections.
            <br /><br />
            We built an interactive, front-end driven search and comparison engine that helps you filter plans side-by-side. By integrating direct WhatsApp consultation options, we provide immediate expert advice without exposing your phone numbers to endless spam databases.
          </p>
        </div>
        <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col justify-center animate-on-scroll relative overflow-hidden">
          <div className="absolute top-[-30px] right-[-30px] w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none" />
          <Sparkles className="w-8 h-8 text-primary mb-4" />
          <h3 className="font-display font-bold text-dark text-lg mb-2">Our Mission</h3>
          <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6">
            To provide 100% transparent, commission-free health comparison tools to enable families, parents, and seniors to choose security.
          </p>
          <h3 className="font-display font-bold text-dark text-lg mb-2">Our Vision</h3>
          <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
            To create a cashless India where medical emergencies are resolved without financial friction or claim rejection delays.
          </p>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="bg-slate-50 py-16 md:py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 border border-secondary/20 px-3.5 py-1.5 rounded-full">
              Our Compass
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-dark mt-4">
              The Values That Guide Us Daily
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-100/60 rounded-3xl p-6 md:p-8 hover-card-effect animate-on-scroll flex flex-col justify-start"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
                  {val.icon}
                </div>
                <h3 className="font-display font-bold text-dark text-lg mb-2.5">
                  {val.title}
                </h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones timeline */}
      <section className="py-[120px] bg-[#F8FBFF] relative overflow-hidden">
        
        {/* Background Radial Glows & Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.25] pointer-events-none" />
        <div className="absolute top-[15%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[15%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 milestone-header">
            <span className="text-[11px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full inline-block mb-4 select-none">
              OUR JOURNEY
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-dark tracking-tight">
              Company Milestones
            </h2>
            <p className="text-slate-500 text-sm md:text-base mt-4 leading-relaxed max-w-xl mx-auto">
              Building trust and protecting families through innovation and exceptional insurance services.
            </p>
          </div>

          {/* Timeline Wrapper */}
          <div className="relative milestone-timeline-wrapper max-w-5xl mx-auto">
            
            {/* Centered vertical gradient timeline line (3-4px thickness) */}
            <div className="absolute left-6 lg:left-1/2 top-4 bottom-4 w-[3.5px] bg-gradient-to-b from-[#0F4C81] to-[#14B86A] -translate-x-1/2 rounded-full origin-top timeline-line" />

            {/* Timeline Nodes & Cards */}
            <div className="space-y-16 lg:space-y-12">
              {[
                {
                  year: '2022',
                  title: 'Project Conceptualization',
                  desc: 'Founded SecureHealth with a skeleton comparison engine to help family groups find networks.',
                  icon: <Rocket className="w-5 h-5 text-white" />
                },
                {
                  year: '2024',
                  title: '100+ Plan Empanelment',
                  desc: 'Expanded our coverage database, integrating cashless calculators and Section 80D tax helpers.',
                  icon: <Target className="w-5 h-5 text-white" />
                },
                {
                  year: '2026',
                  title: 'Premium Redirection Engine',
                  desc: 'Achieved 10 Lakh happy customers. Initiated our direct WhatsApp consultation flows.',
                  icon: <Award className="w-5 h-5 text-white" />
                }
              ].map((ms, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className="timeline-item relative flex flex-col lg:flex-row items-start lg:items-center"
                  >
                    {/* Left spacer for desktop (only if not reversed) */}
                    <div className={`w-full lg:w-1/2 hidden lg:block ${isEven ? 'order-last' : 'order-first'}`} />

                    {/* Central Glowing Node */}
                    <div className="absolute left-6 lg:left-1/2 top-2 lg:top-1/2 lg:-translate-y-1/2 lg:-translate-x-1/2 z-10 timeline-node">
                      <div className="w-6 h-6 rounded-full bg-white border-[4px] border-[#0F4C81] shadow-[0_0_12px_rgba(15,76,129,0.5)] flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-75" />
                      </div>
                    </div>

                    {/* Card container */}
                    <div className={`w-full lg:w-1/2 pl-16 lg:pl-0 timeline-card-wrapper ${
                      isEven ? 'lg:pr-12' : 'lg:pl-12'
                    }`}>
                      <div className="bg-white/95 backdrop-blur-md border border-slate-100/80 p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(15,76,129,0.08)] hover:-translate-y-2 hover:scale-[1.01] transition-all duration-300 group text-left relative overflow-hidden">
                        
                        {/* Top Row: Year badge & Icon */}
                        <div className="flex items-center justify-between gap-4 mb-5">
                          <span className="text-[11px] font-bold px-3.5 py-1 rounded-full bg-gradient-to-r from-[#0F4C81] to-[#00AEEF] text-white shadow-md shadow-primary/10 tracking-widest select-none">
                            {ms.year}
                          </span>
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0F4C81] to-[#14B86A] flex items-center justify-center shadow-md">
                            {ms.icon}
                          </div>
                        </div>

                        {/* Middle: Title */}
                        <h4 className="font-display font-extrabold text-dark text-lg md:text-xl mb-3 group-hover:text-primary transition-colors">
                          {ms.title}
                        </h4>

                        {/* Bottom: Description */}
                        <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-5">
                          {ms.desc}
                        </p>

                        {/* Arrow Link */}
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:gap-2.5 transition-all">
                          <span>Learn More</span>
                          <span className="text-sm">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};

export default About;
