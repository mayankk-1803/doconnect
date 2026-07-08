import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ShieldCheck, Activity, Sparkles, MessageSquareShare } from 'lucide-react';
import InputField from '../components/forms/InputField';
import SelectField from '../components/forms/SelectField';
import Button from '../components/ui/Button';
import { redirectToWhatsApp } from '../utils/whatsapp';
import citiesData from '../data/cities.json';

const Calculator = () => {
  const [estimatedPremium, setEstimatedPremium] = useState(0);

  const { register, watch } = useForm({
    defaultValues: {
      age: 28,
      gender: 'Male',
      city: 'Mumbai',
      coverage: '10 Lakhs',
      familyMembers: 'Self',
      smokingStatus: 'No'
    }
  });

  const formValues = watch();

  useEffect(() => {
    let basePremium = 4500;

    const age = parseInt(formValues.age) || 18;
    if (age > 18) {
      basePremium += (age - 18) * 220;
    }

    const coverage = formValues.coverage;
    let coverageMultiplier = 1.0;
    if (coverage === '10 Lakhs') coverageMultiplier = 1.4;
    else if (coverage === '15 Lakhs') coverageMultiplier = 1.7;
    else if (coverage === '25 Lakhs') coverageMultiplier = 2.2;
    else if (coverage === '50 Lakhs') coverageMultiplier = 3.0;
    else if (coverage === '1 Crore') coverageMultiplier = 4.2;
    basePremium *= coverageMultiplier;

    const members = formValues.familyMembers;
    let membersMultiplier = 1.0;
    if (members === 'Self & Spouse') membersMultiplier = 1.6;
    else if (members === 'Self, Spouse & 1 Kid') membersMultiplier = 1.95;
    else if (members === 'Self, Spouse & 2 Kids') membersMultiplier = 2.25;
    else if (members === 'Parents Only') membersMultiplier = 2.0;
    else if (members === 'Self, Spouse & Parents') membersMultiplier = 2.8;
    basePremium *= membersMultiplier;

    if (formValues.smokingStatus === 'Yes') {
      basePremium *= 1.15;
    }

    const selectedCity = citiesData.find((c) => c.name === formValues.city);
    if (selectedCity && selectedCity.tier === 1) {
      basePremium *= 1.08;
    }

    setEstimatedPremium(Math.round(basePremium));
  }, [formValues]);

  const handleConsult = () => {
    redirectToWhatsApp('quote', {
      name: 'Calculator Premium Estimate',
      mobile: 'N/A',
      email: 'N/A',
      age: formValues.age,
      city: formValues.city,
      coverage: formValues.coverage,
      familyMembers: formValues.familyMembers,
      smokingStatus: formValues.smokingStatus
    });
  };

  const familyOptions = [
    { value: 'Self', label: 'Self Only' },
    { value: 'Self & Spouse', label: 'Self & Spouse' },
    { value: 'Self, Spouse & 1 Kid', label: 'Self & Spouse + 1 Kid' },
    { value: 'Self, Spouse & 2 Kids', label: 'Self & Spouse + 2 Kids' },
    { value: 'Parents Only', label: 'Parents Only' },
    { value: 'Self, Spouse & Parents', label: 'Self & Spouse + Parents' }
  ];

  const coverageOptions = [
    { value: '5 Lakhs', label: '₹5 Lakhs' },
    { value: '10 Lakhs', label: '₹10 Lakhs' },
    { value: '15 Lakhs', label: '₹15 Lakhs' },
    { value: '25 Lakhs', label: '₹25 Lakhs' },
    { value: '50 Lakhs', label: '₹50 Lakhs' },
    { value: '1 Crore', label: '₹1 Crore' }
  ];

  const cityOptions = citiesData.map((c) => ({
    value: c.name,
    label: c.name
  }));

  return (
    <section className="py-24 md:py-28 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      
      {/* Subtle blurs for dark background depth */}
      <div className="absolute top-0 right-0 w-[40%] h-[60%] bg-[#0F4C81]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[35%] h-[55%] bg-[#14B86A]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold text-accent uppercase tracking-widest bg-accent/10 border border-accent/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Premium Estimator
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white">
            Health Insurance Premium Calculator
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-3 leading-relaxed font-medium">
            Estimate your annual health insurance premium immediately by toggling policy variables. Clear estimations, zero hidden charges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Inputs Panel (Left) */}
          <div className="lg:col-span-7 bg-[#1E293B]/40 backdrop-blur-md border border-slate-800/80 rounded-[32px] p-8 md:p-10 flex flex-col justify-between shadow-xl">
            <div className="space-y-8">
              
              {/* Larger Age Slider */}
              <div className="space-y-3.5">
                <div className="flex justify-between items-center text-sm font-bold tracking-wide">
                  <span className="text-slate-300 uppercase tracking-wider text-xs">Eldest Member Age</span>
                  <span className="text-accent text-base font-extrabold bg-accent/10 px-4 py-1.5 rounded-xl border border-accent/20">
                    {formValues.age} Years
                  </span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="75"
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                  {...register('age')}
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-extrabold uppercase tracking-widest">
                  <span>18 Years</span>
                  <span>75 Years</span>
                </div>
              </div>

              {/* Grid selectors with larger sizing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <SelectField
                  label="Who to Insure"
                  options={familyOptions}
                  className="bg-slate-900/80 border-slate-800 text-white focus:ring-accent/10 focus:border-accent text-sm"
                  {...register('familyMembers')}
                />
                <SelectField
                  label="Coverage Required"
                  options={coverageOptions}
                  className="bg-slate-900/80 border-slate-800 text-white focus:ring-accent/10 focus:border-accent text-sm"
                  {...register('coverage')}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <SelectField
                  label="City of Residence"
                  options={cityOptions}
                  className="bg-slate-900/80 border-slate-800 text-white focus:ring-accent/10 focus:border-accent text-sm"
                  {...register('city')}
                />
                
                {/* Modern Segmented Selector */}
                <div className="flex flex-col gap-1.5 w-full text-left">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                    Smoking / Tobacco Status
                  </label>
                  <div className="grid grid-cols-2 gap-2.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-850">
                    {['No', 'Yes'].map((status) => (
                      <label
                        key={status}
                        className={`flex items-center justify-center py-3 rounded-xl text-sm font-bold cursor-pointer transition-all duration-200 ${
                          formValues.smokingStatus === status
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-transparent text-slate-400 hover:text-slate-300'
                        }`}
                      >
                        <input
                          type="radio"
                          value={status}
                          className="sr-only"
                          {...register('smokingStatus')}
                        />
                        {status === 'Yes' ? '🚬 Yes' : '🚭 No'}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            <div className="border-t border-slate-800/80 pt-6 mt-8 flex items-center gap-3 text-xs text-slate-500 leading-snug">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>Calculated based on standard IRDAI basic rate charts for Tier 1 & Tier 2 parameters.</span>
            </div>
          </div>

          {/* Result Card Panel (Right) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-primary to-primary-dark rounded-[32px] p-8 md:p-10 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-[-30px] left-[-30px] w-36 h-36 bg-white/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-8 text-left">
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-blue-100">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                Calculation Results
              </span>

              <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white tracking-tight">
                Estimated Premium
              </h3>

              <div className="bg-white/10 rounded-2xl p-6 border border-white/10 text-center">
                <span className="text-xs font-bold text-blue-100 uppercase tracking-widest block">
                  Estimated Monthly
                </span>
                <span className="text-4xl md:text-5xl font-display font-extrabold text-white mt-1 block tracking-tight">
                  ₹{Math.round(estimatedPremium / 12).toLocaleString()}
                </span>
                <span className="text-xs text-blue-200 mt-1.5 block font-semibold">
                  (Estimated ₹{estimatedPremium.toLocaleString()} / year)
                </span>
              </div>

              <div className="space-y-4 text-xs text-blue-100 pt-2 pl-1 leading-relaxed">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-accent shrink-0" />
                  <span>Includes 10,000+ network cashless treatments</span>
                </div>
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-accent shrink-0" />
                  <span>Eligible for Section 80D tax deductions</span>
                </div>
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-accent shrink-0" />
                  <span>Tax savings estimated: ₹{(estimatedPremium * 0.3).toFixed(0)}/year</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleConsult}
              variant="secondary"
              size="lg"
              className="mt-10 justify-center gap-2 py-4 rounded-xl text-sm shadow-xl shadow-secondary/10"
            >
              <MessageSquareShare className="w-5 h-5" />
              Lock this Premium
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Calculator;
