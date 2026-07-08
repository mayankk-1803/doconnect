import React, { useMemo } from 'react';
import SEO from '../../components/common/SEO';
import Breadcrumb from '../../components/common/Breadcrumb';
import plansData from '../../data/plans.json';
import InsuranceCard from '../../components/cards/InsuranceCard';
import { Users, Info, HelpCircle } from 'lucide-react';
import CtaSection from '../../sections/CtaSection';

const FamilyInsurance = () => {
  const breadcrumbItems = [
    { label: 'All Plans', path: '/health-insurance' },
    { label: 'Family Floater', path: '/family-insurance' }
  ];

  // Pre-filter plans that support family floaters
  const familyPlans = useMemo(() => {
    return plansData.filter((p) => p.categories.includes('family'));
  }, []);

  return (
    <>
      <SEO
        title="Family Floater Health Insurance Plans"
        description="One health insurance policy to protect your whole family. Compare premiums, room rent caps, and cashless hospital networks for family covers."
        keywords="family floater health insurance, best family health plans, husband wife child insurance"
        path="/family-insurance"
      />

      {/* Header Banner */}
      <div className="bg-slate-50 border-b border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-dark leading-tight">
              Family Floater Health Insurance
            </h1>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl">
              Protect your spouse, children, and parents under a single sum insured pool. Save up to 25% on premiums compared to individual covers.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-end">
            <div className="w-20 h-20 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
              <Users className="w-10 h-10" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Core Info Alert box */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-5 md:p-6 mb-12 flex gap-4">
          <Info className="w-6 h-6 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="font-display font-bold text-dark text-sm md:text-base">
              How Family Floater Sum Insured Works
            </h4>
            <p className="text-slate-600 text-xs md:text-sm mt-1.5 leading-relaxed">
              Under a family floater, the total sum insured (e.g., ₹10 Lakhs) is shared among all insured members. If one member gets hospitalized and claims ₹4 Lakhs, the remaining ₹6 Lakhs buffer is available to any member for the rest of the policy year. Most plans offer 'Restore Benefits' to replenish this pool back to 100% on exhaustion.
            </p>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="space-y-6">
          <div className="border-b border-slate-100 pb-3.5 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Available Family Plans: {familyPlans.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {familyPlans.map((plan) => (
              <InsuranceCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp Consult call block */}
      <CtaSection />
    </>
  );
};

export default FamilyInsurance;
