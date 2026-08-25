import React, { useEffect, useRef } from 'react';
import SEO from '../../components/common/SEO';
import Breadcrumb from '../../components/common/Breadcrumb';
import { 
  Building, 
  Users, 
  Zap, 
  Lock, 
  Heart, 
  Headphones, 
  Mail, 
  Target, 
  Sparkles,
  ShieldCheck,
  Award,
  CheckCircle2
} from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { BRAND_CONFIG } from '../../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const breadcrumbItems = [{ label: 'About Us', path: '/about' }];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // General scroll animations
      const scrollItems = containerRef.current.querySelectorAll('.animate-on-scroll');
      scrollItems.forEach((item) => {
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

      // Leadership card entrance
      gsap.fromTo(
        '.leadership-card',
        { opacity: 0, scale: 0.96, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.leadership-card',
            start: 'top 85%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const whyChooseUsCards = [
    {
      title: 'Trusted Insurance Partners',
      desc: 'Compare and purchase insurance policies from 35+ of India’s leading, government-approved insurers with full price transparency.',
      icon: <Building className="w-6 h-6 text-primary" />
    },
    {
      title: 'Expert Advisors',
      desc: 'Get unbiased recommendations from certified insurance specialists dedicated to finding the perfect plan for your family.',
      icon: <Users className="w-6 h-6 text-primary" />
    },
    {
      title: 'Instant Comparison',
      desc: 'Evaluate premiums, coverage features, claim settlement ratios, and cashless hospital networks in under 60 seconds.',
      icon: <Zap className="w-6 h-6 text-primary" />
    },
    {
      title: 'Secure Process',
      desc: 'Protect your medical and payment credentials with standard IRDAI certified bank-grade digital encryption.',
      icon: <Lock className="w-6 h-6 text-primary" />
    },
    {
      title: 'Fast Claim Assistance',
      desc: 'Enjoy dedicated mediation assistance from our 24/7 claim relations desk during planned or emergency hospitalizations.',
      icon: <Heart className="w-6 h-6 text-primary" />
    },
    {
      title: 'Customer Support',
      desc: 'Our support teams are active 24/7 via phone and WhatsApp. Zero cold calls, zero spam databases, just honest consulting.',
      icon: <Headphones className="w-6 h-6 text-primary" />
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#F8FAFC] min-h-screen text-[#0F172A]">
      <SEO
        title={`About Us | ${BRAND_CONFIG.name} Digital Insurance Marketplace`}
        description={`Learn more about ${BRAND_CONFIG.name}, India's trusted digital insurance marketplace helping customers compare & purchase plans with transparency, expert advice, and digital support.`}
        keywords="about doconnect, insurance marketplace India, Shubham Chauhan director, insurance comparison"
        path="/about"
      />

      {/* Breadcrumb Header */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat py-20 text-white overflow-hidden border-b border-slate-200/20"
        style={{ backgroundImage: `url(/about.jpg)` }}
      >
        {/* Dark Overlay for premium text contrast */}
        <div className="absolute inset-0 bg-slate-950/50" />
        
        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white mt-3 tracking-tight">
            About Our Journey & Vision
          </h1>
          <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-3xl mt-2 font-medium opacity-90">
            Helping families across India compare and purchase the right insurance plans with transparent pricing, expert advice, and technology-driven service.
          </p>
        </div>
      </div>

      {/* Company Overview Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 animate-on-scroll">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full inline-block">
            Company Overview
          </span>
          <h2 className="font-display font-extrabold text-2xl md:text-4xl text-dark leading-tight">
            India's Trusted Digital Insurance Marketplace
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
            {BRAND_CONFIG.name} is a trusted digital insurance marketplace dedicated to helping customers compare and purchase insurance plans from India's leading insurance companies with transparent pricing, expert advice, and technology-driven service. Built on principles of complete clarity, unbiased consulting, and customer-first support, we simplify complex policy terms so you can make informed decisions.
          </p>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Whether securing health insurance for your parents, two-wheeler protection, family floaters, or term life covers, {BRAND_CONFIG.name} connects you directly to top-tier policies with zero sales pressure and instant WhatsApp guidance.
          </p>
        </div>

        {/* Mission and Vision Cards */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-[32px] p-8 shadow-sm flex flex-col justify-center animate-on-scroll relative overflow-hidden">
          <div className="absolute top-[-30px] right-[-30px] w-28 h-28 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="mb-6 space-y-2">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-display font-extrabold text-dark text-lg">Our Mission</h3>
            </div>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
              Provide transparent, affordable, and customer-first insurance solutions through direct technology integrations and trusted insurer partnerships.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 space-y-2">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-xl bg-secondary/20 flex items-center justify-center text-primary">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="font-display font-extrabold text-dark text-lg">Our Vision</h3>
            </div>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
              Become India's most trusted insurance comparison platform by simplifying policy discovery, purchase, renewal, and cashless claim assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Grid */}
      <section className="bg-[#F1F5F9] py-16 md:py-24 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full inline-block">
              Why Choose Us
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-4xl text-dark mt-4">
              Built on Trust, Transparency & Convenience
            </h2>
            <p className="text-slate-500 text-xs md:text-sm mt-3 leading-relaxed font-medium">
              We empower millions of customers across India with unbiased comparisons and digital-first claim support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUsCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 hover-card-effect animate-on-scroll flex flex-col justify-start"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F7FAFC] border border-slate-100 flex items-center justify-center mb-6 shrink-0">
                  {card.icon}
                </div>
                <h3 className="font-display font-extrabold text-dark text-base mb-2.5 leading-tight">
                  {card.title}
                </h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Spotlight Section */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto mb-14 animate-on-scroll">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full inline-block">
            Leadership
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-dark mt-4">
            Executive Leadership
          </h2>
          <p className="text-slate-500 text-xs md:text-sm mt-3 font-medium">
            Guiding {BRAND_CONFIG.name}'s mission towards simple, transparent, and technology-driven protection.
          </p>
        </div>

        {/* Shubham Chauhan Director Card */}
        <div className="leadership-card bg-white border border-slate-200/80 rounded-[36px] p-8 md:p-12 shadow-sm hover:shadow-md transition-all duration-300 max-w-3xl mx-auto text-left space-y-4">
          
          {/* Biography & Contact Links */}
          <div className="space-y-4">
            <div>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl text-dark">Shubham Chauhan</h3>
              <span className="text-xs font-extrabold text-primary bg-primary/10 border border-primary/20 px-3.5 py-1 rounded-full inline-block mt-1.5 uppercase tracking-wider">
                Director
              </span>
            </div>
            
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
              Shubham Chauhan serves as the Director of DoConnect, leading the company's vision of making insurance simple, transparent, and accessible for individuals and businesses across India. With a strong focus on innovation, customer satisfaction, and digital transformation, he oversees strategic partnerships, operational excellence, and long-term growth while building customer trust through technology-driven insurance solutions.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-primary hover:bg-primary/5 hover:border-primary transition cursor-pointer"
                title="LinkedIn Profile"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${BRAND_CONFIG.emails.find(e => e.label === 'Director')?.value || BRAND_CONFIG.supportEmail}`}
                className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-primary hover:bg-primary/5 hover:border-primary transition cursor-pointer"
                title="Email Director"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default About;
