import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
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
  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen bg-[#F8FAF8]">
        {/* Navigation Reset */}
        <ScrollToTop />

        {/* Global sticky header */}
        <Navbar />

        {/* Dynamic page container */}
        <main className="flex-grow">
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
          toastClassName="rounded-2xl shadow-xl border border-emerald-100 font-sans"
        />
      </div>
    </ErrorBoundary>
  );
};

// Reusable elegant page loader during lazy routing
const PageLoader = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-[#F8FAF8]">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#276F27]/20 border-t-[#276F27] rounded-full animate-spin" />
        <img src="/Logo.png" alt="DoConnect" className="w-8 h-auto object-contain absolute" />
      </div>
      <p className="text-slate-600 font-display font-bold text-xs uppercase tracking-wider animate-pulse">
        Loading DoConnect Marketplace...
      </p>
    </div>
  );
};

export default MainLayout;
export { PageLoader };
