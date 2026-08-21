import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { ShieldAlert, ArrowLeft, MessageSquare } from 'lucide-react';
import { generateWhatsAppLink } from '../../utils/whatsapp';

const NotFound = () => {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist on SecureHealth."
      />

      <div className="min-h-[70vh] bg-bg-light flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full border border-slate-100/50 space-y-6 relative overflow-hidden">
          <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none" />
          
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="font-display font-extrabold text-4xl text-dark">404</h1>
            <h2 className="font-display font-bold text-dark text-lg md:text-xl">
              Page Not Found
            </h2>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-sm mx-auto">
              We couldn't find the page you are looking for. It may have been moved, renamed, or is temporarily unavailable.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-full border border-slate-200 hover:border-primary hover:bg-slate-50 text-slate-700 hover:text-primary font-semibold text-xs transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Return Home
            </Link>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-callback-modal'))}
              className="inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-full bg-primary text-white font-semibold text-xs shadow-md shadow-primary/10 hover:bg-primary-dark transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Talk to Advisor
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
