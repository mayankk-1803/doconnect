import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import WhatsAppPopup from './WhatsAppPopup';
import CompareBar from './CompareBar';
import ScrollToTop from './ScrollToTop';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen bg-[#F8FBFD]">
        {/* Navigation Reset */}
        <ScrollToTop />

        {/* Global sticky header */}
        <Navbar />

        {/* Dynamic page container */}
        <main className={`flex-grow ${isHome ? '' : 'pt-[88px] sm:pt-[96px]'}`}>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Global floating support integrations */}
        <FloatingWhatsApp />
        <WhatsAppPopup />
        <CompareBar />

        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="rounded-2xl shadow-xl border border-slate-100 font-sans"
        />
      </div>
    </ErrorBoundary>
  );
};

// Reusable elegant page loader during lazy routing
const PageLoader = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-5 bg-[#F8FBFD] transition-opacity duration-300">
      <div className="relative flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-slate-200/80 border-t-[#2F6FAF] rounded-full animate-spin" />
        <span className="absolute font-display font-black text-xs text-[#2F6FAF] tracking-wider">DC</span>
      </div>
      <p className="text-slate-500 font-display font-extrabold text-[10px] uppercase tracking-widest animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default MainLayout;
export { PageLoader };
