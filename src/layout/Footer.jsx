import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Phone, MapPin, Heart, Activity, Shield, Plus, ChevronRight, MessageSquare, Stethoscope } from 'lucide-react';
import { BRAND_CONFIG } from '../constants';
import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { generateWhatsAppLink } from '../utils/whatsapp';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Draw SVG stroke from left to right when footer enters viewport
      gsap.fromTo(
        pathRef.current,
        { strokeDashoffset: 1500 },
        {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
          }
        }
      );

      // 2. Pulse scale and glow color loop every few seconds
      gsap.to(pathRef.current, {
        scaleY: 1.05,
        stroke: 'rgba(255, 255, 255, 0.28)',
        transformOrigin: 'center center',
        duration: 0.8,
        yoyo: true,
        repeat: -1,
        repeatDelay: 3.5,
        ease: 'power1.inOut'
      });

      // 3. Stagger reveal "Why Choose Us" cards
      gsap.fromTo(
        '.footer-badge-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
          }
        }
      );

      // 4. Stagger reveal Grid Columns
      gsap.fromTo(
        '.footer-grid-column',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.footer-grid-column',
            start: 'top 85%',
          }
        }
      );

      // 5. Stagger reveal Trust Badge pills
      gsap.fromTo(
        '.footer-trust-pill',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.footer-trust-pill',
            start: 'top 90%',
          }
        }
      );

      // 6. Draw/animate Footer Skyline Silhouette
      gsap.fromTo(
        '.footer-skyline-container',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className="text-slate-300 relative overflow-hidden z-10"
      style={{ background: 'linear-gradient(180deg, #16213E 0%, #0E1A33 100%)' }}
    >
      
      {/* Decorative Top Border: Premium ECG Heartbeat Line */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none z-0 h-10">
        <svg
          className="w-full h-full fill-none pointer-events-none"
          viewBox="0 0 1440 32"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={pathRef}
            d="M 0,16 L 160,16 L 170,16 L 175,10 L 180,22 L 185,2 L 190,30 L 195,16 L 200,16 L 520,16 L 530,16 L 535,8 L 540,24 L 545,0 L 550,32 L 555,16 L 560,16 L 880,16 L 890,16 L 895,12 L 900,20 L 905,4 L 910,28 L 915,16 L 920,16 L 1240,16 L 1250,16 L 1255,9 L 1260,23 L 1265,1 L 1270,31 L 1275,16 L 1280,16 L 1440,16"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1500"
            strokeDashoffset="1500"
          />
        </svg>

        {/* Subtle decorative icons along the divider line */}
        <div className="absolute top-8 left-[15%] text-white/10 text-xs select-none">✚</div>
        <div className="absolute top-4 left-[45%] text-white/15 text-[10px] select-none">❤️</div>
        <div className="absolute top-9 left-[75%] text-white/10 text-xs select-none">✚</div>
        <div className="absolute top-3 left-[90%] text-white/10 text-[9px] select-none">🛡️</div>
      </div>

      {/* Ambient medical illustration silhouettes behind content */}
      <Stethoscope className="absolute top-24 left-[8%] w-24 h-24 text-white/[0.015] pointer-events-none z-0" />
      <Heart className="absolute top-1/2 right-[12%] w-20 h-20 text-white/[0.015] pointer-events-none z-0 animate-pulse" />
      <Activity className="absolute bottom-24 left-[15%] w-16 h-16 text-white/[0.015] pointer-events-none z-0" />
      <Plus className="absolute bottom-36 right-[25%] w-12 h-12 text-white/[0.015] pointer-events-none z-0" />

      {/* Ambient Hospital Skyline Silhouette at the bottom background (Layered Parallax) */}
      <div className="absolute bottom-0 left-0 w-full h-[50px] sm:h-[70px] md:h-[80px] lg:h-[100px] pointer-events-none z-0 overflow-hidden footer-skyline-container">
        <svg 
          className="w-full h-full pointer-events-none"
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Back Layer - Tallest towers (Opacity 8%) */}
          <path 
            d="M 0,120 L 0,60 L 90,60 L 90,30 L 150,30 L 150,60 L 220,60 L 220,15 L 290,15 L 290,60 L 400,60 L 400,40 L 480,40 L 480,60 L 580,60 L 580,20 L 650,20 L 650,60 L 760,60 L 760,10 L 830,10 L 830,60 L 940,60 L 940,35 L 1020,35 L 1020,60 L 1120,60 L 1120,25 L 1190,25 L 1190,60 L 1280,60 L 1280,45 L 1360,45 L 1360,60 L 1440,60 L 1440,120 Z" 
            fill="rgba(255, 255, 255, 0.08)" 
          />

          {/* Middle Layer - Hospital buildings, medical towers, cross symbols (Opacity 14%) */}
          <g fill="rgba(255, 255, 255, 0.14)">
            {/* Main skyline path */}
            <path d="M 0,120 L 0,80 L 120,80 L 120,45 L 200,45 L 200,80 L 320,80 L 320,50 L 390,50 L 390,80 L 500,80 L 500,40 L 580,40 L 580,80 L 680,80 L 680,55 L 750,55 L 750,80 L 860,80 L 860,45 L 940,45 L 940,80 L 1050,80 L 1050,50 L 1120,50 L 1120,80 L 1240,80 L 1240,40 L 1320,40 L 1320,80 L 1440,80 L 1440,120 Z" />
            
            {/* Hospital Cross symbols on rooftops */}
            <path d="M 157,32 H 163 V 38 H 157 Z M 154,35 H 166 V 37 H 154 Z" />
            <path d="M 537,27 H 543 V 33 H 537 Z M 534,30 H 546 V 32 H 534 Z" />
            <path d="M 897,32 H 903 V 38 H 897 Z M 894,35 H 906 V 37 H 894 Z" />
            <path d="M 1277,27 H 1283 V 33 H 1277 Z M 1274,30 H 1286 V 32 H 1274 Z" />
          </g>

          {/* Front Layer - Entrances, trees, street lights, emergency canopy, small buildings (Opacity 22%) */}
          <g fill="rgba(255, 255, 255, 0.22)">
            {/* Low structures & canopies */}
            <path d="M 0,120 L 0,95 L 80,95 L 90,90 L 150,90 L 160,95 L 240,95 L 240,85 L 300,85 L 300,95 L 420,95 L 430,90 L 490,90 L 500,95 L 600,95 L 600,85 L 660,85 L 660,95 L 780,95 L 790,90 L 850,90 L 860,95 L 960,95 L 960,85 L 1020,85 L 1020,95 L 1140,95 L 1150,90 L 1210,90 L 1220,95 L 1320,95 L 1320,85 L 1380,85 L 1380,95 L 1440,95 L 1440,120 Z" />
            
            {/* Trees */}
            <circle cx="50" cy="95" r="8" />
            <circle cx="210" cy="95" r="10" />
            <circle cx="390" cy="95" r="7" />
            <circle cx="570" cy="95" r="9" />
            <circle cx="750" cy="95" r="8" />
            <circle cx="930" cy="95" r="10" />
            <circle cx="1110" cy="95" r="7" />
            <circle cx="1290" cy="95" r="9" />

            {/* Streetlights */}
            <rect x="25" y="85" width="1.5" height="10" />
            <circle cx="25" cy="85" r="2.5" />
            <rect x="350" y="85" width="1.5" height="10" />
            <circle cx="350" cy="85" r="2.5" />
            <rect x="710" y="85" width="1.5" height="10" />
            <circle cx="710" cy="85" r="2.5" />
            <rect x="1070" y="85" width="1.5" height="10" />
            <circle cx="1070" cy="85" r="2.5" />
          </g>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-8 relative z-10">
        
        {/* "Why Choose Us" Glass Cards Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {[
            { icon: <Plus className="w-5 h-5 text-emerald-400" />, label: '1000+ Cashless Hospitals', desc: 'Instant paperless approvals' },
            { icon: <Heart className="w-5 h-5 text-rose-400" />, label: '99.2% Claim Success', desc: 'Guaranteed relations desk' },
            { icon: <Activity className="w-5 h-5 text-accent" />, label: 'Healthcare Experts', desc: 'Verified advisory support' },
            { icon: <Shield className="w-5 h-5 text-primary" />, label: 'Secure Policies', desc: 'No hidden fine-prints' }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="footer-badge-card bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm rounded-2xl p-5 hover:bg-white/[0.06] hover:border-primary/20 transition-all duration-300 flex items-center gap-4 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:scale-110 transition duration-300 shrink-0">
                {item.icon}
              </div>
              <div>
                <h5 className="font-display font-bold text-white text-xs md:text-sm">{item.label}</h5>
                <p className="text-slate-500 text-[10px] md:text-xs mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Balanced Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          
          {/* Column 1: Logo & Corporate Details */}
          <div className="footer-grid-column space-y-5 text-left">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition duration-300">
                S
              </div>
              <span className="font-display font-extrabold text-2xl text-white">
                {BRAND_CONFIG.name}
              </span>
            </Link>
            <p className="text-xs font-bold text-accent tracking-wide uppercase select-none">
              Protecting Families With Trusted Healthcare Insurance
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              India's premium insurance comparison and advisory platform. Find, analyze, and lock policies with expert advisor support.
            </p>
            <div className="bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm rounded-xl p-3.5 text-[10px] text-slate-500 leading-normal space-y-1 select-none">
              <p className="font-semibold text-slate-400">SecureHealth Compliance</p>
              <p>IRDAI Reg: IRDAI/SH/PR/2026/045</p>
              <p>CIN: U67200HR2026PTC123456</p>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div className="footer-grid-column space-y-5 text-left">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white border-l-2 border-primary pl-2">
              Company
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-400">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Careers', path: '/about' },
                { label: 'Contact Us', path: '/contact' }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link 
                    to={item.path} 
                    className="group flex items-center justify-between text-slate-400 hover:text-white transition-all duration-300 hover:pl-1.5"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-primary shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Insurance Types */}
          <div className="footer-grid-column space-y-5 text-left">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white border-l-2 border-primary pl-2">
              Insurance
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-400">
              {[
                { label: 'Health Insurance', path: '/health-insurance' },
                { label: 'Family Floater', path: '/family-insurance' },
                { label: 'Senior Citizen Cover', path: '/senior-citizen' },
                { label: 'Critical Illness', path: '/critical-illness' },
                { label: 'Top Up Cover', path: '/top-up' }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link 
                    to={item.path} 
                    className="group flex items-center justify-between text-slate-400 hover:text-white transition-all duration-300 hover:pl-1.5"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-primary shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Reach Us - Premium Contact Cards */}
          <div className="footer-grid-column space-y-4 text-left">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white border-l-2 border-primary pl-2 mb-2">
              Reach Us
            </h4>
            <div className="space-y-3">
              
              {/* Address card */}
              <div className="flex items-center gap-3 bg-white/[0.03] border border-white/5 hover:border-primary/20 rounded-xl p-3 hover:bg-white/[0.06] transition duration-300 group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary flex items-center justify-center text-primary group-hover:text-white transition shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[11px] text-slate-400 leading-tight">{BRAND_CONFIG.address}</span>
              </div>

              {/* Phone card */}
              <a 
                href={`tel:${BRAND_CONFIG.supportPhone.replace(/\s+/g, '')}`} 
                className="flex items-center gap-3 bg-white/[0.03] border border-white/5 hover:border-emerald-500/20 rounded-xl p-3 hover:bg-white/[0.06] transition duration-300 group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500 flex items-center justify-center text-emerald-500 group-hover:text-white transition shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-[11px] text-slate-400 font-medium group-hover:text-white transition">{BRAND_CONFIG.supportPhone}</span>
              </a>

              {/* Email card */}
              <a 
                href={`mailto:${BRAND_CONFIG.supportEmail}`} 
                className="flex items-center gap-3 bg-white/[0.03] border border-white/5 hover:border-primary/20 rounded-xl p-3 hover:bg-white/[0.06] transition duration-300 group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary flex items-center justify-center text-primary group-hover:text-white transition shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-[11px] text-slate-400 group-hover:text-white transition truncate">{BRAND_CONFIG.supportEmail}</span>
              </a>

              {/* WhatsApp card */}
              <a 
                href={generateWhatsAppLink('general')} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 bg-white/[0.03] border border-white/5 hover:border-emerald-500/20 rounded-xl p-3 hover:bg-white/[0.06] transition duration-300 group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500 flex items-center justify-center text-emerald-500 group-hover:text-white transition shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span className="text-[11px] text-slate-400 group-hover:text-white transition">24x7 WhatsApp Support</span>
              </a>

            </div>

            {/* Social glass buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {[
                { icon: <FaWhatsapp className="w-4 h-4" />, path: generateWhatsAppLink('general'), label: 'WhatsApp', color: 'hover:bg-emerald-500' },
                { icon: <FaFacebook className="w-4 h-4" />, path: 'https://facebook.com', label: 'Facebook', color: 'hover:bg-blue-600' },
                { icon: <FaInstagram className="w-4 h-4" />, path: 'https://instagram.com', label: 'Instagram', color: 'hover:bg-pink-600' },
                { icon: <FaLinkedin className="w-4 h-4" />, path: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:bg-sky-600' },
                { icon: <FaTwitter className="w-4 h-4" />, path: 'https://twitter.com', label: 'Twitter', color: 'hover:bg-sky-400' }
              ].map((social, sIdx) => (
                <a
                  key={sIdx}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-8.5 h-8.5 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-white/20 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 ${social.color} hover:shadow-lg social-icon-btn`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Horizontal Trust strip pills */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10 border-b border-white/5 pb-10">
          {[
            '✓ IRDAI Certified Broker',
            '✓ 1000+ Cashless Hospitals',
            '✓ 24×7 Claims Desk Support',
            '✓ 99.2% Claim Settlement Ratio',
            '✓ 100% Encrypted Safe Consultation'
          ].map((pill, pIdx) => (
            <div 
              key={pIdx} 
              className="footer-trust-pill inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[10px] md:text-xs text-slate-400 select-none hover:border-primary/25 hover:text-white transition duration-300 cursor-default"
            >
              {pill}
            </div>
          ))}
        </div>

        {/* Bottom bar Compliance & Legals */}
        <div className="pt-2 flex flex-col lg:flex-row items-center justify-between gap-6 text-[11px] text-slate-300 relative z-20">
          
          {/* Left copyright metadata */}
          <div className="flex flex-col gap-1 max-w-xl text-center lg:text-left">
            <p>© {new Date().getFullYear()} {BRAND_CONFIG.name}. All rights reserved.</p>
            <p className="leading-relaxed text-slate-400 text-[10px]">
              Disclaimer: SecureHealth acts as an independent comparison website. IRDAI licensed corporate agency. Insurance is the subject matter of solicitation.
            </p>
          </div>

          {/* Center legal links */}
          <div className="flex flex-wrap items-center justify-center gap-4 font-semibold text-slate-300 relative z-20">
            <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-white transition">Terms of Use</Link>
            <span>|</span>
            <a href="#complaints" className="hover:text-white transition">Complaints Policy</a>
            <span>|</span>
            <a href="#cookies" className="hover:text-white transition">Cookies Settings</a>
          </div>

          {/* Right badge pill */}
          <div className="flex items-center gap-1.5 text-emerald-500 bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/20 font-bold tracking-wider select-none shrink-0 text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5 animate-pulse" />
            <span>IRDAI Certified Broker</span>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
