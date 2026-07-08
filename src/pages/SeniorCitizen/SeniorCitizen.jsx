import React, { useMemo } from 'react';
import SEO from '../../components/common/SEO';
import Breadcrumb from '../../components/common/Breadcrumb';
import plansData from '../../data/plans.json';
import InsuranceCard from '../../components/cards/InsuranceCard';
import { Heart, ShieldAlert, CheckCircle } from 'lucide-react';
import CtaSection from '../../sections/CtaSection';

const SeniorCitizen = () => {
  const breadcrumbItems = [
    { label: 'All Plans', path: '/health-insurance' },
    { label: 'Senior Citizen', path: '/senior-citizen' }
  ];

  // Pre-filter plans that are built for older parents and seniors
  const seniorPlans = useMemo(() => {
    return plansData.filter((p) => p.categories.includes('senior') || p.id.includes('senior') || p.id.includes('diabetes'));
  }, []);

  return (
    <>
      <SEO
        title="Senior Citizen Health Insurance Plans"
        description="Specially designed health insurance policies for elderly parents and seniors. Secure cashless hospital network approvals and covers for pre-existing illnesses."
        keywords="parents health insurance, senior citizen health plans, medical insurance age 60+"
        path="/senior-citizen"
      />

      {/* Header Banner */}
      <div className="bg-slate-50 border-b border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-dark leading-tight">
              Senior Citizen Health Insurance
            </h1>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl">
              Caring for your parents' health has never been easier. Compare dedicated plans with lower waiting periods, wellness coaches, and direct cashless settlements.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-end">
            <div className="w-20 h-20 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 animate-pulse">
              <Heart className="w-10 h-10 fill-rose-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Core items table details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-2.5">
            <h4 className="font-display font-bold text-dark text-sm md:text-base flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-primary" />
              Co-Payment Slabs
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Most senior plans have a co-pay clause (10% to 30%). For example, under a 20% copay, the senior pays ₹20,000 on a ₹1 Lakh bill. You can buy 'No Copay' upgrade riders on select policies.
            </p>
          </div>
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-2.5">
            <h4 className="font-display font-bold text-dark text-sm md:text-base flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-secondary" />
              Pre-Existing Cover
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Seniors are likely to have pre-existing illnesses (diabetes, high BP). Senior policies offer shortened waiting periods (1-2 years instead of standard 3-4 years) to cover these conditions quickly.
            </p>
          </div>
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-2.5">
            <h4 className="font-display font-bold text-dark text-sm md:text-base flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Tax Benefits (Sec 80D)
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              You can claim a tax deduction of up to ₹50,000 under Section 80D on the premium paid for senior parent policies. Deductions are valid for digital transactions.
            </p>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="space-y-6">
          <div className="border-b border-slate-100 pb-3.5 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Available Senior Plans: {seniorPlans.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seniorPlans.map((plan) => (
              <InsuranceCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </div>

      <CtaSection />
    </>
  );
};

export default SeniorCitizen;
