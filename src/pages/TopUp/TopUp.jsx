import React, { useMemo } from 'react';
import SEO from '../../components/common/SEO';
import Breadcrumb from '../../components/common/Breadcrumb';
import plansData from '../../data/plans.json';
import InsuranceCard from '../../components/cards/InsuranceCard';
import { PlusCircle, Info, HelpCircle } from 'lucide-react';
import CtaSection from '../../sections/CtaSection';

const TopUp = () => {
  const breadcrumbItems = [
    { label: 'All Plans', path: '/health-insurance' },
    { label: 'Top Up', path: '/top-up' }
  ];

  // Pre-filter top-up plans
  const topUpPlans = useMemo(() => {
    return plansData.filter((p) => p.categories.includes('topup') || p.categories.includes('super-topup'));
  }, []);

  return (
    <>
      <SEO
        title="Top-Up & Super Top-Up Health Insurance"
        description="Enhance your medical coverage budget at lower rates. Compare super top-up plans with deductibles from top companies."
        keywords="super top up health insurance, medical deductible, top up plans"
        path="/top-up"
      />

      {/* Header Banner */}
      <div className="bg-slate-50 border-b border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-dark leading-tight">
              Top-Up & Super Top-Up Plans
            </h1>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl">
              Add a high sum insured buffer (like ₹20 Lakhs) to your basic cover at a fraction of the premium cost. Pay only when bills exceed your set deductible.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-end">
            <div className="w-20 h-20 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
              <PlusCircle className="w-10 h-10" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Deductible explaining box */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-5 md:p-6 mb-12 flex gap-4">
          <Info className="w-6 h-6 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="font-display font-bold text-dark text-sm md:text-base">
              What is a Deductible and How does it Save Money?
            </h4>
            <p className="text-slate-600 text-xs md:text-sm mt-1.5 leading-relaxed">
              A **deductible** is a threshold amount that you agree to pay from your own pocket (or using your base health insurance) before the Top-Up policy kicks in. Because the Top-Up insurer only pays for bills *exceeding* this limit (e.g. ₹3 Lakhs), the statistical risk for the insurer is very low, making the premium incredibly cheap (often up to 70% cheaper than base plans).
              <br /><br />
              **Super Top-Up** is highly recommended over basic Top-Up because it aggregates *all* claims in a policy year, whereas a standard Top-Up only applies to single, one-off claims.
            </p>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="space-y-6">
          <div className="border-b border-slate-100 pb-3.5 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Available Top-Up Plans: {topUpPlans.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topUpPlans.map((plan) => (
              <InsuranceCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </div>

      <CtaSection />
    </>
  );
};

export default TopUp;
