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
  ShieldCheck
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
      // General animations
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
      desc: 'Compare and purchase policies from 35+ of India’s leading, government-approved insurers.',
      icon: <Building className="w-6 h-6 text-primary" />
    },
    {
      title: 'Expert Insurance Advisors',
      desc: 'Get unbiased recommendations from certified insurance specialists dedicated to your needs.',
      icon: <Users className="w-6 h-6 text-primary" />
    },
    {
      title: 'Instant Quote Comparison',
      desc: 'Evaluate premiums, claim ratios, and cover options side-by-side in under 60 seconds.',
      icon: <Zap className="w-6 h-6 text-primary" />
    },
    {
      title: 'Secure Digital Process',
      desc: 'Protect your medical and payment credentials with standard IRDAI certified encryption.',
      icon: <Lock className="w-6 h-6 text-primary" />
    },
    {
      title: 'Fast Claim Assistance',
      desc: 'Enjoy dedicated mediation assistance from our relations desk during planned or emergency hospitalizations.',
      icon: <Heart className="w-6 h-6 text-primary" />
    },
    {
      title: 'Customer-First Support',
      desc: 'Our lines are active 24/7. No cold calls, no spam databases, just honest advisor consulting.',
      icon: <Headphones className="w-6 h-6 text-primary" />
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#F8FAF8] min-h-screen text-[#1E293B]">
      <SEO
        title={`About Us | ${BRAND_CONFIG.name} Insurance`}
        description={`Learn more about ${BRAND_CONFIG.name}, India's trusted digital insurance marketplace. Discover our mission, values, and leadership.`}
        keywords="about doconnect, insurance marketplace India, Shubham Chauhan director"
        path="/about"
      />

      {/* Breadcrumb Header */}
      <div className="bg-[#F3F8F2] border-b border-slate-200/60 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-dark mt-2">
            About Our Journey & Vision
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl mt-1.5 font-medium">
            Bridging the gap between complex policy details and families seeking trusted, direct-to-customer protection.
          </p>
        </div>
      </div>

      {/* Company Overview Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 animate-on-scroll">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full inline-block">
            Who We Are
          </span>
          <h2 className="font-display font-extrabold text-2xl md:text-3.5xl text-dark leading-tight">
            A Trusted Marketplace for Simple, Unbiased Coverage
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            {BRAND_CONFIG.name} stands as a trusted digital insurance marketplace designed to help customers seamlessly compare and purchase insurance plans from India's leading insurance providers. Built on principles of complete transparency, expert advisor guidance, digital-first services, and customer-centric claim support, we clear away complex jargon to let you make informed decisions.
          </p>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            By shifting buying power directly to the consumer and utilizing direct WhatsApp channels, we provide immediate expert advice without exposing your phone number to spam cold-call databases.
          </p>
        </div>

        {/* Mission and Vision Grid Column */}
        <div className="lg:col-span-5 bg-white border border-slate-200/60 rounded-[32px] p-8 shadow-sm flex flex-col justify-center animate-on-scroll relative overflow-hidden">
          <div className="absolute top-[-30px] right-[-30px] w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none" />
          
          <div className="mb-6 space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-primary shrink-0" />
              <h3 className="font-display font-extrabold text-dark text-lg">Our Mission</h3>
            </div>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              To provide affordable, transparent, secure, and customer-first insurance solutions through robust technology integrations and trusted insurer partnerships.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-secondary shrink-0" />
              <h3 className="font-display font-extrabold text-dark text-lg">Our Vision</h3>
            </div>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              To become India's most trusted digital insurance marketplace by simplifying the entire lifecycle of insurance comparison, purchase, renewal, and cashless claim assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-[#F3F8F2] py-16 md:py-24 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full inline-block">
              Why Choose Us
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-dark mt-4">
              Premium Benefits for Millions of Families
            </h2>
            <p className="text-slate-500 text-xs md:text-sm mt-3 leading-relaxed">
              We focus on building customer trust by ensuring digital transparency throughout your search.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUsCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 hover-card-effect animate-on-scroll flex flex-col justify-start"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F8FAF8] border border-slate-100 flex items-center justify-center mb-6 shrink-0">
                  {card.icon}
                </div>
                <h3 className="font-display font-extrabold text-dark text-base mb-2.5 leading-tight">
                  {card.title}
                </h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto mb-16 animate-on-scroll">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full inline-block">
            Our Leadership
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-dark mt-4">
            Meet the Visionary Behind {BRAND_CONFIG.name}
          </h2>
          <p className="text-slate-500 text-xs md:text-sm mt-3">
            Building reliable, technology-driven solutions for a secure tomorrow.
          </p>
        </div>

        {/* Shubham Chauhan Director Card */}
        <div className="leadership-card bg-white border border-slate-200/60 rounded-[36px] p-8 md:p-12 shadow-sm hover:shadow-md transition-all duration-300 max-w-3xl mx-auto text-left grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Avatar Placeholder Area */}
          <div className="md:col-span-4 flex justify-center">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/10 to-secondary/15 border-4 border-[#F3F8F2] flex items-center justify-center text-primary font-display font-black text-4xl shadow-inner select-none relative group overflow-hidden">
              <span>SC</span>
              {/* Overlay styling */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Bio Content Area */}
          <div className="md:col-span-8 space-y-4">
            <div>
              <h3 className="font-display font-extrabold text-2xl text-dark">Shubham Chauhan</h3>
              <span className="text-xs font-extrabold text-primary bg-primary/10 border border-primary/20 px-3.5 py-0.5 rounded-full inline-block mt-1 uppercase tracking-wider">
                Director
              </span>
            </div>
            
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
              Shubham Chauhan serves as the Director of the organization, leading the vision of making insurance simple, transparent, and accessible for individuals and businesses across India. With a strong focus on innovation, customer satisfaction, and digital transformation, he oversees strategic partnerships, business expansion, and operational excellence. His leadership is dedicated to building long-term customer trust while delivering reliable, technology-driven insurance solutions.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/5 hover:border-primary transition"
                title="LinkedIn Profile"
              >
                <FaLinkedin className="w-4.5 h-4.5" />
              </a>
              <a
                href="mailto:shubham@doconnect.com"
                className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/5 hover:border-primary transition"
                title="Email Director"
              >
                <Mail className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default About;
