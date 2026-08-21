import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Heart,
  Activity,
  Shield,
  Plus,
  ChevronRight,
  Stethoscope,
  Send
} from 'lucide-react';
import { BRAND_CONFIG } from '../constants';
import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTwitter } from 'react-icons/fa';
import { generateWhatsAppLink } from '../utils/whatsapp';
import { toast } from 'react-toastify';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const pathRef = useRef(null);
  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Draw SVG stroke line on scroll
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

      // 2. Pulse heartbeat animation loop
      gsap.to(pathRef.current, {
        scaleY: 1.05,
        stroke: 'rgba(142, 202, 60, 0.4)',
        transformOrigin: 'center center',
        duration: 1,
        yoyo: true,
        repeat: -1,
        repeatDelay: 3,
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
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    toast.success('Thank you for subscribing to DoConnect updates!');
    setEmailInput('');
  };

  return (
    <footer
      ref={footerRef}
      className="text-[#64798D] relative overflow-hidden z-10 border-t border-[#DCEAF4]"
      style={{ background: 'linear-gradient(180deg, #EAF6FC 0%, #F8FBFD 100%)' }}
    >
      {/* Decorative Ambient Blue/Cyan Accent Glows */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[300px] bg-[#2F6FAF]/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-[#67B7E8]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Decorative Top Border: Cyan ECG Line */}
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
            stroke="rgba(47, 111, 175, 0.25)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1500"
            strokeDashoffset="1500"
          />
        </svg>
      </div>

      {/* Ambient background icons */}
      <Stethoscope className="absolute top-24 left-[5%] w-24 h-24 text-[#2F6FAF]/[0.02] pointer-events-none z-0" />
      <Heart className="absolute top-1/2 right-[8%] w-20 h-20 text-[#2F6FAF]/[0.02] pointer-events-none z-0 animate-pulse" />
      <Shield className="absolute bottom-24 left-[12%] w-20 h-20 text-[#2F6FAF]/[0.02] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-8 relative z-10">

        {/* Trust Badges Strip (Why Choose Us Cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            { icon: <Plus className="w-5 h-5 text-[#2F6FAF]" />, label: '10,000+ Cashless Hospitals', desc: 'Instant paperless approvals' },
            { icon: <Heart className="w-5 h-5 text-[#2F6FAF]" />, label: '99.2% Claim Settlement', desc: 'Dedicated relations desk' },
            { icon: <Activity className="w-5 h-5 text-[#2F6FAF]" />, label: 'Expert Certified Advisors', desc: 'Unbiased advisory support' },
            { icon: <Shield className="w-5 h-5 text-[#2F6FAF]" />, label: '100% Encrypted & Safe', desc: 'IRDAI compliant process' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="footer-badge-card bg-white border border-[#DCEAF4] rounded-2xl p-5 hover:border-[#67B7E8]/50 transition-all duration-300 flex items-center gap-4 text-left group shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-[#2F6FAF]/10 border border-[#2F6FAF]/20 flex items-center justify-center group-hover:scale-110 transition duration-300 shrink-0">
                {item.icon}
              </div>
              <div>
                <h5 className="font-display font-bold text-[#16324F] text-xs md:text-sm">{item.label}</h5>
                <p className="text-[#64798D] text-[10px] md:text-xs mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">

          {/* Column 1: Logo, Description & Compliance */}
          <div className="footer-grid-column space-y-5 text-left">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/logo1.png"
                alt={BRAND_CONFIG.name}
                className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-xs font-bold text-[#2F6FAF] tracking-wide uppercase select-none">
              India's Premier Digital Insurance Marketplace
            </p>
            <p className="text-[#64798D] text-xs leading-relaxed">
              Compare 100+ health, motor, life, and travel insurance policies from top-rated Indian insurance companies. Transparent pricing, direct issuance, and 24/7 claim assistance.
            </p>
            <div className="bg-white border border-[#DCEAF4] rounded-2xl p-4 text-[10px] text-[#64798D] leading-normal space-y-1 select-none shadow-xs">
              <p className="font-extrabold text-[#16324F]">{BRAND_CONFIG.name} Legal Compliance</p>
              <p>IRDAI Reg: IRDAI/DC/PR/2026/045</p>
              <p>CIN: U67200HR2026PTC123456</p>
            </div>
          </div>

          {/* Column 2: Insurance Products */}
          <div className="footer-grid-column space-y-5 text-left">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#16324F] border-l-2 border-[#2F6FAF] pl-2.5">
              Insurance Products
            </h4>
            <ul className="space-y-3 text-xs md:text-sm text-[#64798D]">
              {[
                { label: 'Health Insurance', path: '/health-insurance' },
                { label: 'Car Insurance', path: '/motor' },
                { label: 'Bike Insurance', path: '/motor' },
                { label: 'Life Insurance', path: 'https://wa.me/917683098648?text=Life%20Insurance' },
                { label: 'Term Insurance', path: 'https://wa.me/917683098648?text=Term%20Insurance' },
                { label: 'Travel Insurance', path: '/travel' },
                { label: 'Investment Plans', path: 'https://wa.me/917683098648?text=Investment%20Plans' },
                { label: 'Business Insurance', path: '/contact' }
              ].map((item, idx) => (
                <li key={idx}>
                  {item.path.startsWith('http') ? (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between text-[#64798D] hover:text-[#2F6FAF] transition-all duration-300 hover:pl-1.5"
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-[#2F6FAF] shrink-0" />
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      className="group flex items-center justify-between text-[#64798D] hover:text-[#2F6FAF] transition-all duration-300 hover:pl-1.5"
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-[#2F6FAF] shrink-0" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company & Support Links */}
          <div className="footer-grid-column space-y-5 text-left">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#16324F] border-l-2 border-[#2F6FAF] pl-2.5">
              Company & Legal
            </h4>
            <ul className="space-y-3 text-xs md:text-sm text-[#64798D]">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Careers (Hiring)', path: '/about' },
                { label: 'Contact Us', path: '/contact' },
                { label: 'Network Hospitals', path: '/hospitals' },
                { label: 'Compare Desk', path: '/compare' },
                { label: 'Privacy Policy', path: '/privacy-policy' },
                { label: 'Terms & Conditions', path: '/terms' }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="group flex items-center justify-between text-[#64798D] hover:text-[#2F6FAF] transition-all duration-300 hover:pl-1.5"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-[#2F6FAF] shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info & Newsletter */}
          <div className="footer-grid-column space-y-4 text-left">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#16324F] border-l-2 border-[#2F6FAF] pl-2.5 mb-2">
              Reach Us & Connect
            </h4>

            <div className="space-y-2.5">
              {/* Address */}
              <div className="flex items-center gap-3 bg-white border border-[#DCEAF4] hover:border-[#67B7E8]/30 rounded-xl p-2.5 transition duration-300 group shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-[#2F6FAF]/10 group-hover:bg-[#2F6FAF] flex items-center justify-center text-[#2F6FAF] group-hover:text-white transition shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] text-[#64798D] group-hover:text-[#16324F] leading-tight transition">{BRAND_CONFIG.address}</span>
              </div>

              {/* Phone */}
              <a
                href={`tel:${BRAND_CONFIG.supportPhone.replace(/\s+/g, '')}`}
                className="flex items-center gap-3 bg-white border border-[#DCEAF4] hover:border-[#67B7E8]/30 rounded-xl p-2.5 transition duration-300 group shadow-xs"
              >
                <div className="w-7 h-7 rounded-lg bg-[#2F6FAF]/10 group-hover:bg-[#2F6FAF] flex items-center justify-center text-[#2F6FAF] group-hover:text-white transition shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] text-[#64798D] font-medium group-hover:text-[#16324F] transition">{BRAND_CONFIG.supportPhone}</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${BRAND_CONFIG.supportEmail}`}
                className="flex items-center gap-3 bg-white border border-[#DCEAF4] hover:border-[#67B7E8]/30 rounded-xl p-2.5 transition duration-300 group shadow-xs"
              >
                <div className="w-7 h-7 rounded-lg bg-[#2F6FAF]/10 group-hover:bg-[#2F6FAF] flex items-center justify-center text-[#2F6FAF] group-hover:text-white transition shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] text-[#64798D] group-hover:text-[#16324F] transition truncate">{BRAND_CONFIG.supportEmail}</span>
              </a>
            </div>

            {/* Newsletter Subscription Form */}
            <div className="pt-2">
              <p className="text-[11px] font-bold text-[#16324F] mb-2">Subscribe to Insurance Insights</p>
              <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-1.5">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full bg-white border border-[#DCEAF4] focus:border-[#67B7E8] rounded-xl px-3 py-2 text-xs text-[#16324F] placeholder-slate-400 focus:outline-none transition shadow-xs"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-[#2F6FAF] hover:bg-[#204E7C] text-white text-xs font-bold transition flex items-center justify-center cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>

        </div>

        {/* Horizontal Trust Chips Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10 border-b border-[#DCEAF4] pb-10">
          {[
            '✓ IRDAI Registered Broker',
            '✓ 10,000+ Cashless Hospitals',
            '✓ 24×7 Claims Desk Support',
            '✓ 99.2% Claim Settlement Ratio',
            '✓ Instant Digital Policy Issuance',
            '✓ 100% Encrypted Consultation'
          ].map((pill, pIdx) => (
            <div
              key={pIdx}
              className="footer-trust-pill inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-[#DCEAF4] text-[10px] md:text-xs text-[#64798D] select-none hover:border-[#67B7E8]/40 hover:text-[#16324F] transition duration-300 cursor-default shadow-xs"
            >
              {pill}
            </div>
          ))}
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-2 flex flex-col lg:flex-row items-center justify-between gap-6 text-[11px] text-[#64798D] relative z-20">

          {/* Copyright & Disclaimer */}
          <div className="flex flex-col gap-1 max-w-xl text-center lg:text-left">
            <p>© {new Date().getFullYear()} {BRAND_CONFIG.name} Insurance Marketplace. All rights reserved.</p>
            <p className="leading-relaxed text-slate-400 text-[10px]">
              Disclaimer: {BRAND_CONFIG.name} acts as a registered digital insurance marketplace. Insurance is the subject matter of solicitation. For policy terms and exclusions, please read the policy brochure carefully.
            </p>
          </div>

          {/* IRDAI Certification Badge */}
          <div className="flex items-center gap-1.5 text-[#2F6FAF] bg-[#2F6FAF]/10 px-3.5 py-1.5 rounded-full border border-[#2F6FAF]/20 font-extrabold tracking-wider select-none shrink-0 text-[10px]">
            <ShieldCheck className="w-4 h-4" />
            <span>IRDAI Compliant</span>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
