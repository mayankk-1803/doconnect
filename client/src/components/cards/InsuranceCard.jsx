import React from 'react';
import { Check, ShieldCheck, GitCompare, ChevronRight, HelpCircle, Activity } from 'lucide-react';
import { useCompare } from '../../context/CompareContext';
import { redirectToWhatsApp } from '../../utils/whatsapp';
import Button from '../ui/Button';

/**
 * Premium Insurance Plan Card
 */
const InsuranceCard = ({ plan }) => {
  const { comparedPlans, addToCompare, removeFromCompare } = useCompare();
  
  const isCompared = comparedPlans.some((p) => p.id === plan.id);
  const monthlyPremium = Math.round(plan.premium / 12);

  const handleCompareToggle = (e) => {
    e.preventDefault();
    if (isCompared) {
      removeFromCompare(plan.id);
    } else {
      addToCompare(plan);
    }
  };

  const handleGetQuote = () => {
    redirectToWhatsApp('plan', {
      planName: plan.name,
      companyName: plan.companyName,
      premium: plan.premium,
      coverage: plan.coverage,
      claimRatio: plan.claimRatio
    });
  };

  // Helper to map companies to actual logo images
  const getCompanyLogo = (companyId) => {
    switch (companyId) {
      case 'star-health': return '/star.jpg';
      case 'care-health': return '/care.jpg';
      case 'niva-bupa': return '/nivabupa.jpg';
      case 'hdfc-ergo': return '/hdfcergo.jpg';
      case 'icici-lombard': return '/icicilombard.jpg';
      case 'tata-aig': return '/tataaig.jpg';
      case 'bajaj-allianz': return '/bajaj.jpg';
      case 'reliance-general': case 'reliance': return '/reliance.jpg';
      case 'aditya-birla': return '/adityabirlagroup.jpg';
      
      case 'manipal-cigna': return '/manipalcigna.png';
      default: return null;
    }
  };

  // Helper to map companies to avatars/emoji logos as fallback
  const getCompanyEmoji = (companyId) => {
    switch (companyId) {
      case 'star-health': return '⭐';
      case 'care-health': return '🛡️';
      case 'niva-bupa': return '✨';
      case 'hdfc-ergo': return '🏢';
      case 'icici-lombard': return '🏛️';
      case 'tata-aig': return '⚙️';
      default: return '🏥';
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-slate-200/80 transition-all duration-300 flex flex-col justify-between relative group">
      
      {/* Popular tag highlight for specific plans */}
      {(plan.id === 'hdfc-optima-secure' || plan.id === 'niva-reassurance') && (
        <span className="absolute top-0 right-8 -translate-y-1/2 bg-secondary text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm shadow-secondary/15">
          Best Seller
        </span>
      )}

      {/* Card Header */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
              {getCompanyLogo(plan.companyId) ? (
                <img
                  src={getCompanyLogo(plan.companyId)}
                  alt={plan.companyName}
                  className="w-full h-full object-contain p-1.5"
                />
              ) : (
                <span className="text-2xl font-bold">{getCompanyEmoji(plan.companyId)}</span>
              )}
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                {plan.companyName}
              </span>
              <h3 className="font-display font-bold text-dark text-base md:text-lg group-hover:text-primary transition-colors leading-tight">
                {plan.name}
              </h3>
            </div>
          </div>

          {/* CSR percentage score badge */}
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">
              Claim Settled
            </span>
            <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-500/10 font-bold text-xs px-2.5 py-1 rounded-lg border border-emerald-500/20 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              {plan.claimRatio}
            </span>
          </div>
        </div>

        {/* Core Attributes Slabs */}
        <div className="grid grid-cols-3 gap-2 bg-slate-50/50 border border-slate-100/50 rounded-2xl p-3.5 mt-5 text-center text-xs">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block mb-0.5">Coverage</span>
            <span className="font-bold text-dark">{plan.coverage}</span>
          </div>
          <div className="border-x border-slate-100">
            <span className="text-[10px] text-slate-400 font-semibold block mb-0.5">Room Rent</span>
            <span className="font-bold text-dark truncate block max-w-full px-1" title={plan.roomRent}>
              {plan.roomRent}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block mb-0.5">Waiting Period</span>
            <span className="font-bold text-dark">{plan.waitingPeriod}</span>
          </div>
        </div>

        {/* Highlighted Benefits Checklist */}
        <div className="mt-5 space-y-2.5">
          {plan.features.slice(0, 3).map((feat, index) => (
            <div key={index} className="flex items-start gap-2.5 text-xs text-slate-600">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span className="leading-snug">{feat}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 text-xs text-primary font-semibold pl-1 pt-1.5">
            <Activity className="w-3.5 h-3.5" />
            <span>Cashless at {plan.cashlessHospitals.toLocaleString()} hospitals</span>
          </div>
        </div>
      </div>

      {/* Card Footer Slabs & Pricing Actions */}
      <div className="border-t border-slate-100 pt-5 mt-6">
        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Estimated Premium
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl md:text-2xl font-display font-extrabold text-dark">
                ₹{monthlyPremium.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500 font-medium">/month</span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
              (₹{plan.premium.toLocaleString()} / year)
            </span>
          </div>

          {/* Compare check checkbox */}
          <button
            onClick={handleCompareToggle}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
              isCompared
                ? 'bg-primary/5 border-primary text-primary'
                : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:text-dark'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            {isCompared ? 'Compared' : 'Compare'}
          </button>
        </div>

        <Button onClick={handleGetQuote} className="w-full justify-between" size="md">
          <span>Get Instant Quote</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default InsuranceCard;
