import React from 'react';
import SEO from '../../components/common/SEO';
import Breadcrumb from '../../components/common/Breadcrumb';
import Timeline from '../../sections/Timeline';
import { generateWhatsAppLink } from '../../utils/whatsapp';
import { HelpCircle, FileText, CheckCircle, Headphones, MessageSquare } from 'lucide-react';

const Claims = () => {
  const breadcrumbItems = [{ label: 'Claims Guide', path: '/claims' }];

  return (
    <>
      <SEO
        title="Health Insurance Claims Guide"
        description="Learn how to file cashless and reimbursement claims. Detailed step-by-step claims guide, empanelled checklists, and direct WhatsApp advisor alerts."
        keywords="health claims guide, file insurance claim, cashless approval steps"
        path="/claims"
      />

      <div className="bg-slate-50 border-b border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-dark mt-2">
            Painless Claims Assistance
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl mt-1.5">
            Having an insurance policy is only useful if claims are settled smoothly. We stand by you during medical emergencies, guiding you through every step.
          </p>
        </div>
      </div>

      {/* Render the GSAP-animated Claims Timeline */}
      <Timeline />

      {/* Claims Instructions Details Column */}
      <div className="bg-white py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Cashless Claims Instruction Card */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-dark text-xl">
              Cashless Settlement Checklist
            </h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              Available exclusively at network empanelled hospitals. Secure authorizations prior to treatments.
            </p>
            <ul className="space-y-3.5 text-xs md:text-sm text-slate-600 pl-1">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <span>Carry policy ID card or cashless digital authorization copy.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <span>Submit pre-authorization form at the hospital insurance desk.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <span>Ensure doctor case history sheets are completed honestly.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <span>Pay only for non-medical consumables during discharge.</span>
              </li>
            </ul>
          </div>

          {/* Reimbursement Claims Instruction Card */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-dark text-xl">
              Reimbursement Checklist
            </h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              Required when treatment occurs in non-network empanelled clinics. Clear bills first and reclaim amounts.
            </p>
            <ul className="space-y-3.5 text-xs md:text-sm text-slate-600 pl-1">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <span>Collect all original laboratory reports, scans, and doctor prescriptions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <span>Secure the final consolidated bill and original stamped payment receipts.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <span>Obtain a detailed discharge summary signed by the treating surgeon.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <span>Submit completed claim sheets within 15 days of discharge.</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Support Box */}
      <div className="bg-slate-50 py-16 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <Headphones className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-dark text-xl md:text-2xl">
            Stuck with a Claim? Talk to Our Relations Team
          </h3>
          <p className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            If your insurer is delaying approvals or if your reimbursement is rejected, connect with our claims desk on WhatsApp. We provide free mediation support.
          </p>
          <a
            href={generateWhatsAppLink('advisor', { subject: 'Claims Support Help Desk' })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-semibold text-xs shadow-md shadow-primary/10 hover:bg-primary-dark transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            Connect with Claims Advisor
          </a>
        </div>
      </div>
    </>
  );
};

export default Claims;
