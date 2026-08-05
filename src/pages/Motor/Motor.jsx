import React from 'react';
import { useForm } from 'react-hook-form';
import SEO from '../../components/common/SEO';
import Breadcrumb from '../../components/common/Breadcrumb';
import InputField from '../../components/forms/InputField';
import SelectField from '../../components/forms/SelectField';
import Button from '../../components/ui/Button';
import { redirectToWhatsApp } from '../../utils/whatsapp';
import { Car, ShieldCheck, Zap, HelpCircle, MessageSquare, Check, X, ChevronDown } from 'lucide-react';
import { toast } from 'react-toastify';
import citiesData from '../../data/cities.json';

const Motor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues: {
      name: '',
      mobile: '',
      email: '',
      vehicleType: 'Car',
      regNumber: '',
      vehicleModel: '',
      city: ''
    }
  });

  const breadcrumbItems = [{ label: 'Motor Insurance', path: '/motor' }];

  const onSubmit = (data) => {
    toast.loading('Preparing your motor quote...', { id: 'motor-quote-toast' });
    
    setTimeout(() => {
      toast.update('motor-quote-toast', {
        render: 'Redirecting to WhatsApp for quotes...',
        type: 'success',
        isLoading: false,
        autoClose: 3000
      });
      // Custom WhatsApp message
      const text = `Hello,

I'm interested in a Motor Insurance Plan.

Name: ${data.name}
Mobile: ${data.mobile}
Vehicle Type: ${data.vehicleType}
Registration No: ${data.regNumber || 'N/A'}
Model/Year: ${data.vehicleModel || 'N/A'}
City: ${data.city}

Please share the best available options.`;
      
      const phone = '919876543210';
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      reset();
    }, 1200);
  };

  const vehicleOptions = [
    { value: 'Car', label: 'Car Insurance' },
    { value: 'Bike', label: 'Bike/Two-Wheeler Insurance' },
    { value: 'Commercial', label: 'Commercial Vehicle Insurance' }
  ];

  const cityOptions = citiesData.map((c) => ({
    value: c.name,
    label: c.name
  }));

  return (
    <>
      <SEO
        title="Motor Insurance - Car & Bike Coverage online"
        description="Protect your vehicle against accidents, theft, and third-party liabilities. Compare car and bike plans instantly and secure quotes via WhatsApp."
        keywords="car insurance, bike insurance, motor third party cover"
        path="/motor"
      />

      <div className="bg-slate-50 border-b border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-dark leading-tight">
              Motor Insurance
            </h1>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl">
              Get comprehensive coverage for your car or bike. Protect against damages, theft, and natural disasters with zero paperwork and instant policies.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-end">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Car className="w-10 h-10" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column Copy */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-center">
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-dark leading-snug">
              Why Buy Motor Insurance from SecureHealth?
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-dark text-base">Cashless Garages Network</h4>
                  <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                    Access cashless repair services at 5,000+ top workshops and multi-brand garages across India.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-dark text-base">Zero-Depreciation Add-on</h4>
                  <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                    Avoid out-of-pocket costs on plastic and rubber spare parts replacement during claims.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-dark text-base">No Claim Bonus Protection</h4>
                  <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                    Protect your accumulated NCB discounts (up to 50%) even if you make a minor claim during the year.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className="font-display font-extrabold text-dark text-xl mb-1">
              Motor Quote Request
            </h3>
            <p className="text-slate-500 text-xs mb-6">
              Takes less than 60 seconds. Opens WhatsApp instantly.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <InputField
                label="Full Name"
                placeholder="Enter Your Name"
                {...register('name', { required: 'Name is required' })}
                error={errors.name}
              />

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Mobile Number"
                  type="tel"
                  placeholder="9876543210"
                  {...register('mobile', {
                    required: 'Mobile is required',
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: 'Invalid mobile number'
                    }
                  })}
                  error={errors.mobile}
                />
                
                <InputField
                  label="Email Address"
                  type="email"
                  placeholder="Enter Your "
                  {...register('email', { required: 'Email is required' })}
                  error={errors.email}
                />
              </div>

              <SelectField
                label="Vehicle Type"
                options={vehicleOptions}
                {...register('vehicleType')}
              />

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Registration Number"
                  placeholder="e.g. MH-12-AB-1234"
                  {...register('regNumber', { required: 'Registration number required' })}
                  error={errors.regNumber}
                />
                
                <InputField
                  label="Make & Model Year"
                  placeholder="e.g. Honda City 2024"
                  {...register('vehicleModel', { required: 'Vehicle model required' })}
                  error={errors.vehicleModel}
                />
              </div>

              <SelectField
                label="City of Registration"
                options={cityOptions}
                placeholder="Select City"
                {...register('city', { required: 'City is required' })}
                error={errors.city}
              />

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                disabled={isSubmitting}
                className="mt-6"
              >
                {isSubmitting ? 'Processing...' : 'Get Instant Quote'}
              </Button>
            </form>
          </div>

        </div>
      </div>

      {/* Rich Car & Bike Insurance Information Guide */}
      <div className="border-t border-slate-100 bg-[#F8FAF8] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          
          {/* Section 1: Detailed Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full inline-block">
                Overview
              </span>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-dark leading-tight">
                What is Motor (Car & Two-Wheeler) Insurance?
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                Motor insurance is a legally binding contract between you (the policyholder) and the insurance provider to protect your vehicle from financial loss arising due to accidents, theft, fire, natural disasters, or third-party liabilities. 
              </p>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                As per the <strong>Motor Vehicles Act of 1988</strong>, it is mandatory for all vehicles operating in public spaces in India to have at least a <strong>Third-Party Liability Cover</strong>. However, to secure your own vehicle against damages, it is highly recommended to opt for a <strong>Comprehensive Plan</strong> or add custom protection riders (Add-ons) to your policy.
              </p>
            </div>
            <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs">
              <h3 className="font-display font-extrabold text-dark text-lg mb-4">Key Benefits of Motor Insurance</h3>
              <ul className="space-y-3.5">
                {[
                  { title: "Financial Protection", desc: "Covers hefty repair/replacement costs after accidental damage." },
                  { title: "Legal Compliance", desc: "Meets mandatory third-party liability rules, preventing fines." },
                  { title: "Personal Accident Cover", desc: "Provides up to ₹15 Lakh cover for the owner-driver in case of disability/death." },
                  { title: "Cashless Claim Network", desc: "Get repairs at 5,000+ partner garages without upfront payments." },
                  { title: "No Claim Bonus (NCB)", desc: "Enjoy up to 50% discount on renewal premiums for claim-free years." }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                    <div>
                      <span className="font-bold text-dark text-xs md:text-sm">{item.title}:</span>
                      <p className="text-slate-500 text-xs mt-0.5 leading-normal font-medium">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 2: Comparison Table */}
          <div className="space-y-6">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full inline-block">
                Comparison Guide
              </span>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-dark">
                Third-Party vs. Own Damage vs. Comprehensive Plans
              </h2>
              <p className="text-slate-500 text-xs md:text-sm font-medium">
                Compare coverage options side-by-side to determine the best match for your vehicle.
              </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-dark font-display font-bold text-xs md:text-sm">
                      <th className="p-4 md:p-5">Covers & Benefits</th>
                      <th className="p-4 md:p-5">Third-Party Plan</th>
                      <th className="p-4 md:p-5">Own Damage Plan</th>
                      <th className="p-4 md:p-5 bg-emerald-50/40 text-primary">Comprehensive Plan (Recommended)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs md:text-sm text-slate-650">
                    {[
                      { cover: "Damage to a third-party vehicle/property in an accident", tp: true, od: false, comp: true },
                      { cover: "Legal liability for third-party injury or death", tp: true, od: false, comp: true },
                      { cover: "Damage to your own vehicle (accidents, fire, collision)", tp: false, od: true, comp: true },
                      { cover: "Cover against natural calamities (floods, earthquakes)", tp: false, od: true, comp: true },
                      { cover: "Cover against theft, vandalism, riots, and terrorism", tp: false, od: true, comp: true },
                      { cover: "Transit cover (damage during truck/train/ship transport)", tp: false, od: true, comp: true },
                      { cover: "Eligibility for optional Add-on riders", tp: false, od: true, comp: true }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 md:p-5 font-bold text-slate-700">{row.cover}</td>
                        <td className="p-4 md:p-5">
                          {row.tp ? <Check className="w-5 h-5 text-emerald-600" /> : <X className="w-5 h-5 text-rose-500" />}
                        </td>
                        <td className="p-4 md:p-5">
                          {row.od ? <Check className="w-5 h-5 text-emerald-600" /> : <X className="w-5 h-5 text-rose-500" />}
                        </td>
                        <td className="p-4 md:p-5 bg-emerald-50/10">
                          {row.comp ? <Check className="w-5 h-5 text-emerald-600" /> : <X className="w-5 h-5 text-rose-500" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Section 3: Popular Add-ons */}
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full inline-block">
                Add-on Covers
              </span>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-dark">
                Maximize Protection with Custom Riders
              </h2>
              <p className="text-slate-500 text-xs md:text-sm font-medium">
                Extend your base policy with premium covers designed to eliminate out-of-pocket settlement expenses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Zero Depreciation Cover", desc: "Prevents depreciation deductions on replacement parts (glass, plastic, rubber) during claim settlements." },
                { title: "Engine Protection Rider", desc: "Covers engine replacement or repair costs resulting from waterlogging (hydrostatic lock) or oil leakages." },
                { title: "Roadside Assistance (RSA)", desc: "24/7 emergency support offering towing assistance, flat tyre changes, minor repairs, and fuel delivery." },
                { title: "NCB Protection Rider", desc: "Retains your accumulated No Claim Bonus discount (up to 50%) even if you register a claim during the policy term." },
                { title: "Return to Invoice (RTI)", desc: "Pays back the complete original invoice cost of your vehicle (including road tax & registration) in case of theft or total loss." },
                { title: "Consumables Coverage", desc: "Covers minor accessory fluid/part costs (engine oil, lubricants, nuts, screws, washers) which are excluded in standard claims." }
              ].map((addon, idx) => (
                <div key={idx} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all duration-300">
                  <h4 className="font-display font-bold text-dark text-sm md:text-base mb-2">{addon.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">{addon.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-4">
              <h3 className="font-display font-extrabold text-dark text-lg flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                What is Covered (Inclusions)
              </h3>
              <ul className="space-y-3">
                {[
                  "Damages caused by road accidents, collisions, or rollovers.",
                  "Loss or damage resulting from housebreaking, burglary, or vehicle theft.",
                  "Damages caused by fire, self-ignition, lightning, or explosions.",
                  "Natural disasters (cyclones, earthquakes, landslides, floods).",
                  "Man-made disturbances (riots, strikes, vandalism, malicious acts).",
                  "Third-party legal obligations, property damage, and injury covers."
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs md:text-sm">
                    <Check className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                    <span className="font-medium text-slate-650 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-4">
              <h3 className="font-display font-extrabold text-dark text-lg flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-rose-500 rounded-full" />
                What is NOT Covered (Exclusions)
              </h3>
              <ul className="space-y-3">
                {[
                  "Normal wear & tear, aging, and general mechanical or electrical breakdown.",
                  "Damages occurring while driving under the influence of alcohol, drugs, or liquors.",
                  "Damages occurring while operating the vehicle without a valid driving license.",
                  "Accidents outside the geographical boundaries specified in the policy.",
                  "Consequential losses (e.g. damages caused by continuing to drive after an accident).",
                  "Damages arising from war, mutiny, civil war, or nuclear hazards."
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs md:text-sm">
                    <X className="w-4.5 h-4.5 text-rose-500 mt-0.5 shrink-0" />
                    <span className="font-medium text-slate-650 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 5: Online Purchase Process */}
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full inline-block">
                Purchase Steps
              </span>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-dark">
                How to Buy/Renew Motor Insurance Online
              </h2>
              <p className="text-slate-500 text-xs md:text-sm font-medium">
                Get your vehicle insured online in 3 simple steps in under 5 minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { step: "01", title: "Fill Details", desc: "Provide your basic contact info, vehicle registration number, and model year on our simple request widget above." },
                { step: "02", title: "Compare & Select", desc: "Consult our certified advisors who analyze premium quotes from 25+ top-rated insurers in India." },
                { step: "03", title: "Instant Issuance", desc: "Complete the secure payment online and receive your active policy document directly in your inbox." }
              ].map((step, idx) => (
                <div key={idx} className="bg-white border border-slate-100 rounded-3xl p-6 relative pt-10 shadow-xs">
                  <span className="absolute top-4 left-6 font-display font-black text-3xl md:text-4xl text-primary/10 select-none">{step.step}</span>
                  <h4 className="font-display font-bold text-dark text-base mb-2">{step.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: FAQs */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full inline-block">
                FAQs
              </span>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-dark">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs divide-y divide-slate-100">
              {[
                { q: "Is third-party motor insurance mandatory in India?", a: "Yes, as per the Motor Vehicles Act of 1988, it is legally mandatory for all car and bike owners to have at least a valid third-party liability insurance to drive on Indian roads. Failing to do so can result in hefty traffic fines or legal penalties." },
                { q: "What is Insured Declared Value (IDV) in car insurance?", a: "IDV is the maximum sum insured amount that the insurance company will pay you in case of a total loss or vehicle theft. It is calculated based on the manufacturer's listed selling price minus the depreciation depending on the age of the vehicle." },
                { q: "Can I transfer my No Claim Bonus (NCB) to a new car?", a: "Yes! The NCB belongs to you (the driver/owner), not the vehicle. When selling your old vehicle, you can request an NCB certificate from your insurer and apply the discount (up to 50%) to the premium of your new vehicle purchase." },
                { q: "What is Zero Depreciation cover?", a: "Zero Depreciation is an optional add-on cover that ensures you get the full claim amount for replacement parts (like fiber, glass, rubber, and plastic) without any deduction for depreciation value, preventing out-of-pocket costs." },
                { q: "How long is the grace period for expired policies?", a: "Normally, insurance companies offer a grace period of 30 to 90 days after policy expiry to renew without losing your No Claim Bonus (NCB) benefits. However, during the grace period, your vehicle is NOT covered, and driving it on public roads is illegal." }
              ].map((faq, idx) => (
                <details key={idx} className="group py-4.5 cursor-pointer first:pt-0 last:pb-0">
                  <summary className="flex items-center justify-between font-display font-bold text-slate-800 text-sm md:text-base select-none list-none outline-none">
                    <span>{faq.q}</span>
                    <span className="text-slate-400 group-open:rotate-180 transition-transform duration-200">
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </summary>
                  <p className="text-slate-500 text-xs md:text-sm mt-3 leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Motor;
