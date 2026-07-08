import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Heart, Shield, Car, Globe, PawPrint, Star, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import Button from '../components/ui/Button';
import { BRAND_CONFIG } from '../constants';
import { generateWhatsAppLink } from '../utils/whatsapp';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef(null);
  const [activeTab, setActiveTab] = useState('health');
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const featuresRef = useRef(null);
  const buttonsRef = useRef(null);
  const logosRef = useRef(null);
  const quoteCardRef = useRef(null);

  // Reset validation fields when switching tabs to prevent validator blockages
  useEffect(() => {
    reset();
  }, [activeTab, reset]);

  // GSAP Initial animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // 1. Badge Fade Down
      tl.fromTo(badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 }
      );

      // 2. Heading lines reveal upward
      const lines = headingRef.current.querySelectorAll('.heading-line');
      tl.fromTo(lines,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' },
        '-=0.5'
      );

      // 3. Subtitle Fade Up
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      );

      // 4. Feature Cards Stagger
      const cards = featuresRef.current.querySelectorAll('.feature-card-item');
      tl.fromTo(cards,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power2.out' },
        '-=0.6'
      );

      // 5. Buttons scale and fade
      tl.fromTo(buttonsRef.current.children,
        { opacity: 0, scale: 0.9, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)' },
        '-=0.5'
      );

      // 6. Quote Card Slide Left
      tl.fromTo(quoteCardRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' },
        '-=1.0'
      );

      // 7. Trust Logos Fade Up
      tl.fromTo(logosRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.8'
      );



      // Slowly animate background blobs
      const blobs = heroRef.current.querySelectorAll('.ambient-blob');
      blobs.forEach((blob, idx) => {
        gsap.to(blob, {
          x: idx % 2 === 0 ? 30 : -30,
          y: idx % 2 === 0 ? -25 : 25,
          duration: 8 + idx * 4,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // GSAP micro-animation when switching tabs
  useEffect(() => {
    gsap.fromTo('.form-input-field',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' }
    );
  }, [activeTab]);

  const categories = [
    { id: 'health', label: 'Health Insurance', icon: <Heart className="w-4 h-4 shrink-0" /> },
    { id: 'life', label: 'Life Insurance', icon: <Shield className="w-4 h-4 shrink-0" /> },
    { id: 'motor', label: 'Motor Insurance', icon: <Car className="w-4 h-4 shrink-0" /> },
    { id: 'travel', label: 'Travel Insurance', icon: <Globe className="w-4 h-4 shrink-0" /> },
    { id: 'pet', label: 'Pet Insurance', icon: <PawPrint className="w-4 h-4 shrink-0" /> }
  ];

  const featureCards = [
    { icon: '🏥', title: '1000+ Cashless Hospitals', desc: 'Instant paperless approvals' },
    { icon: '❤️', title: '99.2% Claim Settlement', desc: 'Guaranteed relations desk' },
    { icon: '🛡️', title: 'IRDAI Certified Advisors', desc: '100% unbiased guidance' },
    { icon: '⚡', title: 'Instant Quotes', desc: 'Compare in 60 seconds' }
  ];

  const formatFieldLabel = (key) => {
    const labels = {
      fullName: 'Full Name',
      mobile: 'Mobile Number',
      email: 'Email Address',
      age: 'Age',
      city: 'City',
      coverage: 'Coverage Amount',
      familyMembers: 'Family Members Covered',
      smoking: 'Smoking Status',
      duration: 'Term Duration',
      vehicleNumber: 'Vehicle Registration Number',
      regYear: 'Registration Year',
      vehicleModel: 'Vehicle Make & Model',
      destination: 'Travel Destination',
      startDate: 'Trip Start Date',
      endDate: 'Trip End Date',
      petName: 'Pet Name',
      petType: 'Pet Type',
      petAge: 'Pet Age'
    };
    return labels[key] || key;
  };

  const onSubmit = (data) => {
    const activeLabel = categories.find(c => c.id === activeTab)?.label || activeTab;
    let message = `Hello SecureHealth, I would like to get a premium quote for *${activeLabel}*.\n\n`;
    
    // Append field keys
    Object.keys(data).forEach(key => {
      const label = formatFieldLabel(key);
      message += `*${label}*: ${data[key]}\n`;
    });
    
    // Redirect to WhatsApp Broker channel
    const url = `https://wa.me/${BRAND_CONFIG.supportPhone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section 
      ref={heroRef} 
      className="relative overflow-hidden pt-20 pb-16 lg:pt-24 lg:pb-28 bg-[#F8FBFF] flex items-center min-h-[90vh] w-full"
    >
      
      {/* Ambient background glows */}
      <div className="ambient-blob absolute top-[8%] left-[5%] w-[450px] h-[450px] bg-primary/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="ambient-blob absolute bottom-[10%] right-[5%] w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="ambient-blob absolute top-[35%] left-[45%] w-[300px] h-[300px] bg-accent/4 rounded-full blur-[80px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        
        {/* Two-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Column (55% width equivalent): Marketing, Badge, Heading, Grid cards */}
          <div className="lg:col-span-6 xl:col-span-7 text-left space-y-8">
            
            {/* Small Glass Badge */}
            <div 
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/60 text-[11px] font-bold text-slate-700 shadow-sm tracking-wide select-none"
            >
              <span>🛡️</span>
              <span>India's Trusted Insurance Marketplace</span>
            </div>

            {/* Main Heading */}
            <h1 
              ref={headingRef}
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[62px] text-[#0F172A] leading-[1.05] tracking-tight flex flex-col gap-1"
            >
              <span className="heading-line block">Compare <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">Insurance</span>.</span>
              <span className="heading-line block">Protect What Matters.</span>
            </h1>

            {/* Subtitle */}
            <p 
              ref={subtitleRef}
              className="text-slate-500 text-base md:text-lg leading-relaxed max-w-[550px] font-medium"
            >
              Compare health, life, motor, travel and pet insurance plans from India's leading insurers in one place.
            </p>

            {/* Feature Cards 2x2 Grid */}
            <div 
              ref={featuresRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl"
            >
              {featureCards.map((feat, idx) => (
                <div 
                  key={idx}
                  className="feature-card-item bg-white/65 backdrop-blur-sm border border-slate-100/60 p-4 rounded-2xl shadow-[0_4px_20px_-5px_rgba(15,76,129,0.03)] hover:shadow-md hover:-translate-y-1 transition duration-300 flex items-start gap-3 select-none group"
                >
                  <span className="text-xl shrink-0">{feat.icon}</span>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-extrabold text-dark group-hover:text-primary transition">{feat.title}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div 
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-4 items-center pt-2 max-w-md"
            >
              <Button
                onClick={() => {
                  const el = document.getElementById('categories-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto px-8 py-4 shadow-lg shadow-primary/20 text-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-bold"
              >
                Compare Plans
              </Button>
              <a
                href={generateWhatsAppLink('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-2xl border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50/20 text-slate-700 hover:text-emerald-600 text-sm font-bold transition-all duration-300 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageSquare className="w-5 h-5 text-emerald-500 shrink-0" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Carrier Trust Logos */}
            <div 
              ref={logosRef}
              className="pt-6 space-y-3"
            >
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Trusted by India's Top Insurers</span>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-1">
                {/* Logo 1: Star Health */}
                <div className="opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition duration-300">
                  <svg className="h-5 w-auto" viewBox="0 0 120 24" fill="currentColor">
                    <path d="M10 2l2.2 6.5h6.8l-5.5 4 2.2 6.5-5.5-4-5.5 4 2.2-6.5-5.5-4h6.8z" fill="#D4AF37" />
                    <text x="24" y="16" className="font-extrabold text-[11px] tracking-wider fill-slate-800">STAR Health</text>
                  </svg>
                </div>
                {/* Logo 2: HDFC Ergo */}
                <div className="opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition duration-300">
                  <svg className="h-5 w-auto" viewBox="0 0 120 24" fill="currentColor">
                    <rect x="2" y="2" width="16" height="16" rx="2" fill="#D92D20" />
                    <text x="6" y="14" className="font-black text-[9px] fill-white">H</text>
                    <text x="24" y="16" className="font-extrabold text-[11px] tracking-wider fill-slate-800">HDFC ERGO</text>
                  </svg>
                </div>
                {/* Logo 3: Niva Bupa */}
                <div className="opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition duration-300">
                  <svg className="h-5 w-auto" viewBox="0 0 120 24" fill="currentColor">
                    <circle cx="10" cy="10" r="8" fill="#0E9384" />
                    <path d="M8 10l1.5 1.5 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="24" y="16" className="font-extrabold text-[11px] tracking-wider fill-slate-800">Niva Bupa</text>
                  </svg>
                </div>
                {/* Logo 4: Care Health */}
                <div className="opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition duration-300">
                  <svg className="h-5 w-auto" viewBox="0 0 120 24" fill="currentColor">
                    <path d="M10 18l-1.2-1.1C4.5 13 1.5 10.3 1.5 7c0-2.5 2-4.5 4.5-4.5 1.4 0 2.8.7 3.5 1.8 0.7-1.1 2.1-1.8 3.5-1.8 2.5 0 4.5 2 4.5 4.5 0 3.3-3 6-7.3 9.9L10 18z" fill="#00AEEF" />
                    <text x="24" y="16" className="font-extrabold text-[11px] tracking-wider fill-slate-800">Care Health</text>
                  </svg>
                </div>
                {/* Logo 5: ICICI Lombard */}
                <div className="opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition duration-300">
                  <svg className="h-5 w-auto" viewBox="0 0 130 24" fill="currentColor">
                    <rect x="2" y="2" width="16" height="16" rx="2" fill="#800020" />
                    <text x="5" y="14" className="font-black text-[8px] fill-white">i</text>
                    <text x="22" y="15" className="font-extrabold text-[10px] tracking-wider fill-slate-800">ICICI Lombard</text>
                  </svg>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (45% width equivalent): Quote Card Form + Floating status pills */}
          <div className="lg:col-span-6 xl:col-span-5 w-full relative z-10 flex justify-center">
            


            {/* Dynamic Tabbed Quote Card Form */}
            <div 
              ref={quoteCardRef}
              className="hero-quote-card bg-white border border-slate-100/80 rounded-[24px] shadow-[0_15px_45px_rgba(15,76,129,0.05)] overflow-hidden w-full max-w-[480px]"
            >
              
              {/* Category Navigation Tabs */}
              <div className="flex border-b border-slate-100 overflow-x-auto scrollbar-none scroll-smooth bg-slate-50/50">
                {categories.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`category-tab-btn flex items-center gap-2 px-4 py-4.5 text-xs font-bold transition-all duration-300 border-b-2 whitespace-nowrap cursor-pointer ${
                        isActive 
                          ? 'border-primary text-primary bg-white' 
                          : 'border-transparent text-slate-500 hover:text-primary hover:bg-slate-50/50'
                      }`}
                    >
                      {tab.icon}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Form Area */}
              <div className="p-6 md:p-8">
                <h3 className="font-display font-extrabold text-base md:text-lg text-dark mb-5">
                  Compare {categories.find(c => c.id === activeTab)?.label}
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 gap-y-4">
                    
                    {/* Common Fields */}
                    <div className="form-input-field flex flex-col gap-1">
                      <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Full Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        className="h-[46px] rounded-xl border border-slate-200 px-3 text-xs font-medium focus:border-primary focus:outline-none placeholder-slate-400 transition"
                        {...register('fullName', { required: true })}
                      />
                      {errors.fullName && <span className="text-[9px] text-rose-500 font-bold">This field is required</span>}
                    </div>

                    <div className="form-input-field flex flex-col gap-1">
                      <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Mobile Number</label>
                      <input
                        type="tel"
                        placeholder="e.g. 9876543210"
                        className="h-[46px] rounded-xl border border-slate-200 px-3 text-xs font-medium focus:border-primary focus:outline-none placeholder-slate-400 transition"
                        {...register('mobile', { required: true, pattern: /^[0-9]{10}$/ })}
                      />
                      {errors.mobile && <span className="text-[9px] text-rose-500 font-bold">Please enter 10 digits</span>}
                    </div>

                    <div className="form-input-field flex flex-col gap-1">
                      <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Email Address</label>
                      <input
                        type="email"
                        placeholder="e.g. rahul@example.com"
                        className="h-[46px] rounded-xl border border-slate-200 px-3 text-xs font-medium focus:border-primary focus:outline-none placeholder-slate-400 transition"
                        {...register('email', { required: true })}
                      />
                      {errors.email && <span className="text-[9px] text-rose-500 font-bold">Please enter email</span>}
                    </div>

                    {/* Tab Specific Dynamic Fields */}
                    {activeTab === 'health' && (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="form-input-field flex flex-col gap-1">
                            <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Age of Eldest</label>
                            <input
                              type="number"
                              placeholder="e.g. 35"
                              className="h-[46px] rounded-xl border border-slate-200 px-3 text-xs font-medium focus:border-primary focus:outline-none placeholder-slate-400 transition"
                              {...register('age', { required: true, min: 18, max: 99 })}
                            />
                          </div>

                          <div className="form-input-field flex flex-col gap-1">
                            <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">City</label>
                            <input
                              type="text"
                              placeholder="e.g. New Delhi"
                              className="h-[46px] rounded-xl border border-slate-200 px-3 text-xs font-medium focus:border-primary focus:outline-none placeholder-slate-400 transition"
                              {...register('city', { required: true })}
                            />
                          </div>
                        </div>

                        <div className="form-input-field flex flex-col gap-1">
                          <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Family Covered</label>
                          <select
                            className="h-[46px] rounded-xl border border-slate-200 px-3 text-xs font-medium bg-white focus:border-primary focus:outline-none transition"
                            {...register('familyMembers')}
                          >
                            <option value="Self Only">Self Only</option>
                            <option value="Self & Spouse">Self &amp; Spouse</option>
                            <option value="Family Floater (2 Adults + 1 Child)">Family (2A + 1C)</option>
                            <option value="Family Floater (2 Adults + 2 Children)">Family (2A + 2C)</option>
                            <option value="Parents">Parents Only</option>
                          </select>
                        </div>

                        <div className="form-input-field flex flex-col gap-1">
                          <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Coverage Amount</label>
                          <select
                            className="h-[46px] rounded-xl border border-slate-200 px-3 text-xs font-medium bg-white focus:border-primary focus:outline-none transition"
                            {...register('coverage')}
                          >
                            <option value="₹5 Lakh">₹5 Lakh</option>
                            <option value="₹10 Lakh">₹10 Lakh</option>
                            <option value="₹25 Lakh">₹25 Lakh</option>
                            <option value="₹50 Lakh">₹50 Lakh</option>
                            <option value="₹1 Crore">₹1 Crore</option>
                          </select>
                        </div>
                      </>
                    )}

                    {activeTab === 'life' && (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="form-input-field flex flex-col gap-1">
                            <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Your Age</label>
                            <input
                              type="number"
                              placeholder="e.g. 28"
                              className="h-[46px] rounded-xl border border-slate-200 px-3 text-xs font-medium focus:border-primary focus:outline-none placeholder-slate-400 transition"
                              {...register('age', { required: true })}
                            />
                          </div>

                          <div className="form-input-field flex flex-col gap-1">
                            <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">City</label>
                            <input
                              type="text"
                              placeholder="e.g. Mumbai"
                              className="h-[46px] rounded-xl border border-slate-200 px-3 text-xs font-medium focus:border-primary focus:outline-none placeholder-slate-400 transition"
                              {...register('city', { required: true })}
                            />
                          </div>
                        </div>

                        <div className="form-input-field flex flex-col gap-1">
                          <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Term Cover Required</label>
                          <select
                            className="h-[46px] rounded-xl border border-slate-200 px-3 text-xs font-medium bg-white focus:border-primary focus:outline-none transition"
                            {...register('coverage')}
                          >
                            <option value="₹50 Lakh">₹50 Lakh</option>
                            <option value="₹1 Crore">₹1 Crore</option>
                            <option value="₹2 Crore">₹2 Crore</option>
                            <option value="₹5 Crore">₹5 Crore</option>
                          </select>
                        </div>
                      </>
                    )}

                    {activeTab === 'motor' && (
                      <>
                        <div className="form-input-field flex flex-col gap-1">
                          <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Vehicle Reg Number</label>
                          <input
                            type="text"
                            placeholder="e.g. DL 3C AB 1234"
                            className="h-[46px] rounded-xl border border-slate-200 px-3 text-xs font-medium focus:border-primary focus:outline-none placeholder-slate-400 transition"
                            {...register('vehicleNumber', { required: true })}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="form-input-field flex flex-col gap-1">
                            <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Registration Year</label>
                            <input
                              type="number"
                              placeholder="e.g. 2024"
                              className="h-[46px] rounded-xl border border-slate-200 px-3 text-xs font-medium focus:border-primary focus:outline-none placeholder-slate-400 transition"
                              {...register('regYear', { required: true })}
                            />
                          </div>

                          <div className="form-input-field flex flex-col gap-1">
                            <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Vehicle Make &amp; Model</label>
                            <input
                              type="text"
                              placeholder="e.g. Honda City"
                              className="h-[46px] rounded-xl border border-slate-200 px-3 text-xs font-medium focus:border-primary focus:outline-none placeholder-slate-400 transition"
                              {...register('vehicleModel', { required: true })}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {activeTab === 'travel' && (
                      <>
                        <div className="form-input-field flex flex-col gap-1">
                          <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Destination</label>
                          <input
                            type="text"
                            placeholder="e.g. Switzerland"
                            className="h-[46px] rounded-xl border border-slate-200 px-3 text-xs font-medium focus:border-primary focus:outline-none placeholder-slate-400 transition"
                            {...register('destination', { required: true })}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="form-input-field flex flex-col gap-1">
                            <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Start Date</label>
                            <input
                              type="date"
                              className="h-[46px] rounded-xl border border-slate-200 px-2 text-xs font-medium focus:border-primary focus:outline-none transition"
                              {...register('startDate', { required: true })}
                            />
                          </div>

                          <div className="form-input-field flex flex-col gap-1">
                            <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">End Date</label>
                            <input
                              type="date"
                              className="h-[46px] rounded-xl border border-slate-200 px-2 text-xs font-medium focus:border-primary focus:outline-none transition"
                              {...register('endDate', { required: true })}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {activeTab === 'pet' && (
                      <>
                        <div className="form-input-field flex flex-col gap-1">
                          <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Pet's Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Bruno"
                            className="h-[46px] rounded-xl border border-slate-200 px-3 text-xs font-medium focus:border-primary focus:outline-none placeholder-slate-400 transition"
                            {...register('petName', { required: true })}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="form-input-field flex flex-col gap-1">
                            <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Pet Type</label>
                            <select
                              className="h-[46px] rounded-xl border border-slate-200 px-3 text-xs font-medium bg-white focus:border-primary focus:outline-none transition"
                              {...register('petType')}
                            >
                              <option value="Dog">Dog</option>
                              <option value="Cat">Cat</option>
                            </select>
                          </div>

                          <div className="form-input-field flex flex-col gap-1">
                            <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Pet Age</label>
                            <input
                              type="number"
                              placeholder="e.g. 3"
                              className="h-[46px] rounded-xl border border-slate-200 px-3 text-xs font-medium focus:border-primary focus:outline-none placeholder-slate-400 transition"
                              {...register('petAge', { required: true })}
                            />
                          </div>
                        </div>
                      </>
                    )}

                  </div>

                  <div className="form-input-field pt-1">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full h-[50px] rounded-xl btn-gradient-secondary font-bold text-xs tracking-wider flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition shadow-md"
                    >
                      <span>Get Instant Quotes</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </Button>
                  </div>
                </form>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
