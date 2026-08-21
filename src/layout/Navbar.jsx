import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { BRAND_CONFIG, NAV_LINKS } from '../constants';
import gsap from 'gsap';
import { generateWhatsAppLink } from '../utils/whatsapp';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { pathname } = useLocation();

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);
  const dropdownRefs = useRef({});
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine scrolled past top threshold
      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
        setHidden(true); // scrolling down
      } else {
        setHidden(false); // scrolling up or near top
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });
      tl.fromTo(navRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1 })
        .fromTo(logoRef.current, { x: -20, opacity: 0 }, { x: 0, opacity: 1 }, '-=0.4')
        .fromTo(menuItemsRef.current.filter(Boolean), { y: -10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06 }, '-=0.5');
    });
    return () => ctx.revert();
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // GSAP animated dropdown reveal
  const handleDropdownEnter = (label) => {
    setActiveDropdown(label);
    const dropdown = dropdownRefs.current[label];
    if (dropdown) {
      gsap.fromTo(
        dropdown,
        { opacity: 0, y: 15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' }
      );
    }
  };

  const handleDropdownLeave = (label) => {
    const dropdown = dropdownRefs.current[label];
    if (dropdown) {
      gsap.to(dropdown, {
        opacity: 0,
        y: 10,
        scale: 0.95,
        duration: 0.2,
        ease: 'power2.in',
        overwrite: 'auto',
        onComplete: () => {
          setActiveDropdown((prev) => (prev === label ? null : prev));
        }
      });
    } else {
      setActiveDropdown(null);
    }
  };

  const handleGetQuoteClick = (e) => {
    e.preventDefault();
    if (pathname === '/') {
      const el = document.getElementById('partners-section') || document.body;
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#partners-section';
    }
  };

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 transform ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled
            ? 'glass-navbar-light py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Official Brand Logo */}
          <Link
            to="/"
            ref={logoRef}
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="DoConnect Home"
          >
            <img 
              src="/Logo.png" 
              alt={BRAND_CONFIG.name}
              className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Links Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.filter(l => l.label !== 'Login').map((link, idx) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.label}
                    ref={(el) => (menuItemsRef.current[idx] = el)}
                    className="relative py-2"
                    onMouseEnter={() => handleDropdownEnter(link.label)}
                    onMouseLeave={() => handleDropdownLeave(link.label)}
                  >
                    <button 
                      className="flex items-center gap-1 text-[14px] font-bold transition-colors focus:outline-none cursor-pointer text-slate-800 hover:text-[#2F6FAF]"
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                        activeDropdown === link.label 
                          ? 'rotate-180 text-[#2F6FAF]' 
                          : 'text-slate-400'
                      }`} />
                    </button>

                    {/* GSAP dropdown menu panels */}
                    <div
                      ref={(el) => (dropdownRefs.current[link.label] = el)}
                      style={{ opacity: 0, transform: 'translateY(15px)', display: activeDropdown === link.label ? 'block' : 'none' }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 flex flex-col gap-1 origin-top-left"
                    >
                      {link.dropdownItems.map((item) => (
                        <Link
                          key={item.label}
                          to={item.path}
                          className="block w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#2F6FAF] hover:bg-[#EAF6FC] transition whitespace-nowrap"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.label}
                  ref={(el) => (menuItemsRef.current[idx] = el)}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-[14px] font-bold transition-colors relative py-1 cursor-pointer ${
                      isActive ? 'text-[#2F6FAF] font-extrabold' : 'text-slate-800 hover:text-[#2F6FAF]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 rounded-full bg-[#2F6FAF] animate-pulse" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={handleGetQuoteClick}
              className="px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer bg-[#2F6FAF] hover:bg-[#245B91] text-white shadow-[#2F6FAF]/20"
            >
              Get Quote
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 transition focus:outline-none cursor-pointer text-slate-800 hover:text-[#2F6FAF]"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[290px] bg-white z-50 shadow-2xl transition-transform duration-300 transform lg:hidden p-6 flex flex-col justify-between overflow-y-auto ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <img 
              src="/Logo.png" 
              alt={BRAND_CONFIG.name} 
              className="h-10 w-auto object-contain"
            />
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <nav className="mt-6 flex flex-col gap-4">
            {NAV_LINKS.filter(l => l.label !== 'Login').map((link) => {
              if (link.hasDropdown) {
                return (
                  <div key={link.label} className="flex flex-col gap-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {link.label}
                    </span>
                    <div className="pl-3 border-l-2 border-[#2F6FAF]/20 flex flex-col gap-3 mt-1">
                      {link.dropdownItems.map((item) => (
                        <Link
                          key={item.label}
                          to={item.path}
                          onClick={() => setMobileOpen(false)}
                          className="text-xs font-semibold text-slate-700 hover:text-[#2F6FAF] transition"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.label}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `text-[14px] font-bold py-1 transition-colors ${
                      isActive ? 'text-[#2F6FAF] font-extrabold' : 'text-slate-700 hover:text-[#2F6FAF]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-3">
            <button
              onClick={(e) => {
                setMobileOpen(false);
                handleGetQuoteClick(e);
              }}
              className="w-full py-3 rounded-xl font-bold bg-[#2F6FAF] hover:bg-[#204E7C] text-white text-xs text-center shadow-md shadow-[#2F6FAF]/20 transition cursor-pointer"
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
