import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, GitCompare, RefreshCcw } from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import gsap from 'gsap';

const CompareBar = () => {
  const { comparedPlans, removeFromCompare, clearCompare } = useCompare();
  const barRef = useRef(null);

  useEffect(() => {
    if (comparedPlans.length > 0) {
      // Slide up and fade in
      gsap.to(barRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        display: 'block'
      });
    } else {
      // Slide down and fade out
      gsap.to(barRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          if (barRef.current) barRef.current.style.display = 'none';
        }
      });
    }
  }, [comparedPlans.length]);

  if (comparedPlans.length === 0) return null;

  return (
    <div
      ref={barRef}
      style={{ display: 'none', transform: 'translateY(100px)', opacity: 0 }}
      className="fixed bottom-0 left-0 w-full z-45 bg-white border-t border-slate-100 shadow-2xl p-4 md:p-5"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Selected plans label */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <GitCompare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display font-bold text-dark text-sm md:text-base">
              Compare Plans ({comparedPlans.length}/3)
            </h4>
            <p className="text-xs text-slate-500 hidden sm:block">
              Analyze features, waiting periods, and room rents.
            </p>
          </div>
        </div>

        {/* List of compared plans */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {comparedPlans.map((plan) => (
            <div
              key={plan.id}
              className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3.5 py-1.5 rounded-full text-xs font-medium text-dark shadow-sm hover:bg-slate-100/80 transition"
            >
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="truncate max-w-[120px] md:max-w-[160px]">
                {plan.name}
              </span>
              <button
                onClick={() => removeFromCompare(plan.id)}
                className="p-0.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                aria-label={`Remove ${plan.name} from comparison`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {comparedPlans.length < 3 && (
            <div className="hidden sm:flex items-center gap-2 border border-dashed border-slate-200 px-3.5 py-1.5 rounded-full text-xs text-slate-400">
              <span>+ Add plan ({3 - comparedPlans.length} left)</span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={clearCompare}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 text-slate-600 font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            Clear
          </button>
          
          <Link
            to="/compare"
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition ${
              comparedPlans.length < 2
                ? 'bg-slate-300 pointer-events-none'
                : 'bg-primary hover:bg-primary-dark shadow-md shadow-primary/10'
            }`}
          >
            Compare Now
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;
