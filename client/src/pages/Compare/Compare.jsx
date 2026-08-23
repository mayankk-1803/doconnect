import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import Breadcrumb from '../../components/common/Breadcrumb';
import { useCompare } from '../../context/CompareContext';
import { GitCompare, AlertTriangle, ArrowRight, ShieldCheck, X, ChevronRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import { redirectToWhatsApp } from '../../utils/whatsapp';

const Compare = () => {
  const { comparedPlans, removeFromCompare, clearCompare } = useCompare();

  const breadcrumbItems = [
    { label: 'All Plans', path: '/health-insurance' },
    { label: 'Compare Dashboard', path: '/compare' }
  ];

  const handleGetQuote = (plan) => {
    redirectToWhatsApp('plan', {
      planName: plan.name,
      companyName: plan.companyName,
      premium: plan.premium,
      coverage: plan.coverage,
      claimRatio: plan.claimRatio
    });
  };

  return (
    <>
      <SEO
        title="Compare Health Insurance side-by-side"
        description="Detailed side-by-side comparison of coverage limit, waiting period, room rent, copay, cashless hospitals, and claim settlement ratios."
        keywords="health plan comparison table, compare policy details online, doconnect"
        path="/compare"
      />

      <div className="bg-slate-50 border-b border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="font-display font-extrabold text-2xl md:text-3xl text-dark mt-2">
            Compare Health Plans
          </h1>
          <p className="text-slate-500 text-xs md:text-sm mt-1">
            Analyze the fine-print details side-by-side to choose the perfect fit policy.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {comparedPlans.length > 0 ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Comparing {comparedPlans.length} of 3 plans
              </span>
              <button
                onClick={clearCompare}
                className="text-xs text-rose-500 hover:text-rose-600 font-bold hover:underline cursor-pointer"
              >
                Clear All Selected
              </button>
            </div>

            {/* Comparison Grid Table */}
            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-slate-50/50">
                      {/* Left header column */}
                      <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 w-1/4">
                        Policy Parameters
                      </th>
                      {/* Compared Plans headers */}
                      {comparedPlans.map((plan) => (
                        <th
                          key={plan.id}
                          className="p-6 border-b border-slate-100 w-1/4 min-w-[200px] relative group"
                        >
                          <button
                            onClick={() => removeFromCompare(plan.id)}
                            className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                            aria-label={`Remove ${plan.name}`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                            {plan.companyName}
                          </span>
                          <h4 className="font-display font-bold text-dark text-sm md:text-base mt-0.5 max-w-[90%] truncate">
                            {plan.name}
                          </h4>
                        </th>
                      ))}
                      {/* Blank placeholders if less than 3 plans */}
                      {[...Array(3 - comparedPlans.length)].map((_, i) => (
                        <th
                          key={i}
                          className="p-6 border-b border-slate-100 w-1/4 min-w-[200px] text-center text-slate-300 font-medium text-xs border-dashed"
                        >
                          <div className="border border-dashed border-slate-200 rounded-2xl py-6 flex flex-col items-center justify-center gap-2">
                            <span>Slot Empty</span>
                            <Link
                              to="/health-insurance"
                              className="text-[10px] text-primary hover:underline font-bold"
                            >
                              + Add Plan
                            </Link>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs md:text-sm">
                    {/* Sum Insured / Coverage */}
                    <tr>
                      <td className="p-5 font-bold text-slate-700 bg-slate-50/20">Sum Insured</td>
                      {comparedPlans.map((plan) => (
                        <td key={plan.id} className="p-5 font-extrabold text-dark">
                          {plan.coverage}
                        </td>
                      ))}
                      {[...Array(3 - comparedPlans.length)].map((_, i) => (
                        <td key={i} className="p-5 text-slate-300">-</td>
                      ))}
                    </tr>

                    {/* Estimated Premium */}
                    <tr>
                      <td className="p-5 font-bold text-slate-700 bg-slate-50/20">Monthly Premium</td>
                      {comparedPlans.map((plan) => (
                        <td key={plan.id} className="p-5">
                          <span className="text-base font-extrabold text-dark block">
                            ₹{Math.round(plan.premium / 12).toLocaleString()}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            (₹{plan.premium.toLocaleString()} / year)
                          </span>
                        </td>
                      ))}
                      {[...Array(3 - comparedPlans.length)].map((_, i) => (
                        <td key={i} className="p-5 text-slate-300">-</td>
                      ))}
                    </tr>

                    {/* Claim Settlement Ratio */}
                    <tr>
                      <td className="p-5 font-bold text-slate-700 bg-slate-50/20">Claim Settlement Ratio</td>
                      {comparedPlans.map((plan) => (
                        <td key={plan.id} className="p-5">
                          <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-500/10 font-bold text-xs">
                            {plan.claimRatio}
                          </span>
                        </td>
                      ))}
                      {[...Array(3 - comparedPlans.length)].map((_, i) => (
                        <td key={i} className="p-5 text-slate-300">-</td>
                      ))}
                    </tr>

                    {/* Waiting Period */}
                    <tr>
                      <td className="p-5 font-bold text-slate-700 bg-slate-50/20">Pre-Existing Waiting Period</td>
                      {comparedPlans.map((plan) => (
                        <td key={plan.id} className="p-5 text-slate-600 font-medium">
                          {plan.waitingPeriod}
                        </td>
                      ))}
                      {[...Array(3 - comparedPlans.length)].map((_, i) => (
                        <td key={i} className="p-5 text-slate-300">-</td>
                      ))}
                    </tr>

                    {/* Room Rent */}
                    <tr>
                      <td className="p-5 font-bold text-slate-700 bg-slate-50/20">Room Rent Restrictions</td>
                      {comparedPlans.map((plan) => (
                        <td key={plan.id} className="p-5 text-slate-600 font-medium">
                          {plan.roomRent}
                        </td>
                      ))}
                      {[...Array(3 - comparedPlans.length)].map((_, i) => (
                        <td key={i} className="p-5 text-slate-300">-</td>
                      ))}
                    </tr>

                    {/* Cashless Hospitals */}
                    <tr>
                      <td className="p-5 font-bold text-slate-700 bg-slate-50/20">Cashless Network list</td>
                      {comparedPlans.map((plan) => (
                        <td key={plan.id} className="p-5 text-slate-600 font-medium">
                          {plan.cashlessHospitals.toLocaleString()} Hospitals
                        </td>
                      ))}
                      {[...Array(3 - comparedPlans.length)].map((_, i) => (
                        <td key={i} className="p-5 text-slate-300">-</td>
                      ))}
                    </tr>

                    {/* Day Care Procedures */}
                    <tr>
                      <td className="p-5 font-bold text-slate-700 bg-slate-50/20">Day Care Procedures</td>
                      {comparedPlans.map((plan) => (
                        <td key={plan.id} className="p-5 text-slate-600 font-medium leading-relaxed">
                          {plan.dayCare}
                        </td>
                      ))}
                      {[...Array(3 - comparedPlans.length)].map((_, i) => (
                        <td key={i} className="p-5 text-slate-300">-</td>
                      ))}
                    </tr>

                    {/* Copay */}
                    <tr>
                      <td className="p-5 font-bold text-slate-700 bg-slate-50/20">Co-payment Clause</td>
                      {comparedPlans.map((plan) => (
                        <td key={plan.id} className="p-5 text-slate-600 font-semibold">
                          {plan.coPay}
                        </td>
                      ))}
                      {[...Array(3 - comparedPlans.length)].map((_, i) => (
                        <td key={i} className="p-5 text-slate-300">-</td>
                      ))}
                    </tr>

                    {/* Actions */}
                    <tr>
                      <td className="p-5 bg-slate-50/10" />
                      {comparedPlans.map((plan) => (
                        <td key={plan.id} className="p-5">
                          <Button
                            onClick={() => handleGetQuote(plan)}
                            className="w-full justify-between text-xs"
                            size="sm"
                          >
                            <span>Lock This Plan</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Button>
                        </td>
                      ))}
                      {[...Array(3 - comparedPlans.length)].map((_, i) => (
                        <td key={i} className="p-5 text-slate-300">-</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl p-8 max-w-xl mx-auto shadow-sm">
            <GitCompare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-display font-bold text-dark text-lg mb-2">No Plans Selected for Compare</h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6">
              You need to select at least 2 health plans from our listings directory to generate side-by-side comparison tables.
            </p>
            <Link
              to="/health-insurance"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-primary text-white font-semibold text-xs shadow-md shadow-primary/10 hover:bg-primary-dark transition-all cursor-pointer"
            >
              Browse Health Plans
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Compare;
