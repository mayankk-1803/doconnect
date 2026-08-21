import React from 'react';
import { MessageSquare, Calendar, ShieldCheck, Heart } from 'lucide-react';
import Button from '../components/ui/Button';
import { generateWhatsAppLink, redirectToWhatsApp } from '../utils/whatsapp';

const CtaSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-br from-[#EAF6FC] via-[#F8FBFD] to-[#EAF6FC] border border-[#DCEAF4] rounded-3xl p-8 md:p-16 text-[#16324F] relative overflow-hidden shadow-sm">
          {/* Dynamic layout shapes */}
          <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[30%] h-[80%] bg-primary/5 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Branding Column */}
            <div className="lg:col-span-7 space-y-4 md:space-y-6">
              <span className="inline-flex items-center gap-1 bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-primary">
                <Heart className="w-3.5 h-3.5 text-primary fill-primary/10" />
                Free Consultation
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight text-[#16324F]">
                Need Help Choosing <br />
                the Right Plan?
              </h2>
              <p className="text-[#64798D] text-sm md:text-base leading-relaxed max-w-xl">
                Our certified senior advisors are available to guide you. No spam calls, no pushy sales behavior—just clear, unbiased assistance.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3.5 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#16324F]">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>Unbiased Comparison</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#16324F]">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>100% Free Consultation</span>
                </div>
              </div>
            </div>

            {/* CTA Actions Column */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 w-full justify-end">
              <a
                href={generateWhatsAppLink('advisor', { subject: 'CTA Chat Now' })}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-2xl bg-[#2F6FAF] hover:bg-[#245B91] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#2F6FAF]/15 transition-all text-center cursor-pointer"
              >
                <MessageSquare className="w-5 h-5" />
                Chat with Expert Now
              </a>
              <button
                onClick={() => redirectToWhatsApp('advisor', { subject: 'CTA Call back Request' })}
                className="px-8 py-4 rounded-2xl border border-[#DCEAF4] hover:border-[#2F6FAF] hover:bg-[#EAF6FC]/50 text-[#2F6FAF] font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                Request Callback
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
