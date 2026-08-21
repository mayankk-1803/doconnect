import React, { useMemo } from 'react';
import SEO from '../../components/common/SEO';
import Breadcrumb from '../../components/common/Breadcrumb';
import plansData from '../../data/plans.json';
import InsuranceCard from '../../components/cards/InsuranceCard';
import { AlertCircle, ShieldAlert, Sparkles } from 'lucide-react';
import CtaSection from '../../sections/CtaSection';

const CriticalIllness = () => {
  const breadcrumbItems = [
    { label: 'All Plans', path: '/health-insurance' },
    { label: 'Critical Illness', path: '/critical-illness' }
  ];

  // Pre-filter critical illness plans
  const criticalPlans = useMemo(() => {
    return plansData.filter((p) => p.categories.includes('critical'));
  }, []);

  return (
    <>
      <SEO
        title="Critical Illness Insurance Plans"
        description="Secure lump-sum payouts for major illnesses (Cancer, Heart Attack, Stroke). Compare premium rates and policy clauses for critical covers."
        keywords="critical illness policy, cancer insurance cover, heart attack lump sum payout"
        path="/critical-illness"
      />

      {/* Header Banner */}
      <div className="bg-slate-50 border-b border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-dark leading-tight">
              Critical Illness Cover
            </h1>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl">
              Get 100% lump-sum payouts immediately upon diagnosis of covered critical conditions, shielding your savings from loss of income.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-end">
            <div className="w-20 h-20 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <AlertCircle className="w-10 h-10" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Lump Sum vs Indemnity Comparison */}
        <div className="bg-gradient-to-br from-[#EAF6FC] via-[#F8FBFD] to-[#EAF6FC] border border-[#DCEAF4] text-[#16324F] rounded-3xl p-6 md:p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none" />
          
          <h3 className="font-display font-bold text-lg md:text-xl text-[#16324F] mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Critical Illness vs. Standard Health Insurance
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#64798D]">
            <div className="space-y-2">
              <span className="font-bold text-[#16324F] block">Standard Health (Indemnity)</span>
              <p className="text-xs leading-relaxed">
                Pays for actual hospital expenses incurred (room charge, medicine bills, doctor visits). Payments are settled directly with the network hospital cashless, or reimbursed after discharge.
              </p>
            </div>
            <div className="space-y-2 border-t md:border-t-0 md:border-l border-[#DCEAF4] pt-4 md:pt-0 md:pl-6">
              <span className="font-bold text-primary block">Critical Illness (Benefit Plan)</span>
              <p className="text-xs leading-relaxed">
                Pays the entire Sum Insured (e.g., ₹20 Lakhs) as a lump sum immediately upon diagnostic test proof of covered diseases like Cancer, Stroke, or Bypass surgery. You can use the money for out-of-country treatment or mortgage payments.
              </p>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="space-y-6">
          <div className="border-b border-slate-100 pb-3.5 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Available Critical Illness Plans: {criticalPlans.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {criticalPlans.map((plan) => (
              <InsuranceCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </div>

      <CtaSection />
    </>
  );
};

export default CriticalIllness;
