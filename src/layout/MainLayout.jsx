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
      <div className="flex flex-col min-h-screen">
        {/* Navigation Reset */}
        <ScrollToTop />

        {/* Global sticky header */}
        <Navbar />

        {/* Dynamic page container */}
        <main className="flex-grow pt-24">
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
          toastClassName="rounded-2xl shadow-xl border border-slate-100/50 font-sans"
        />
      </div>
    </ErrorBoundary>
  );
};

// Reusable elegant page loader during lazy routing
const PageLoader = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-bg-light">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      <p className="text-slate-500 font-display font-medium text-sm animate-pulse">
        Loading secure portal...
      </p>
    </div>
  );
};

export default MainLayout;
export { PageLoader };
