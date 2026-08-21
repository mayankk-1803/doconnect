import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import Breadcrumb from '../../components/common/Breadcrumb';
import InputField from '../../components/forms/InputField';
import SelectField from '../../components/forms/SelectField';
import Button from '../../components/ui/Button';
import { Car, Bike, Truck, ShieldCheck, Zap, HelpCircle, Check, X, ChevronDown, Wrench, Shield, AlertTriangle } from 'lucide-react';
import { toast } from 'react-toastify';
import citiesData from '../../data/cities.json';
import { BRAND_CONFIG } from '../../constants';

// Data maps for complete motor vehicle category customization
const MOTOR_CONTENT_MAP = {
  car: {
    seoTitle: "Car Insurance - Compare Quotes & Get Zero Dep Cover Online",
    seoDesc: "Protect your car against accidents, theft, and floods with 5,000+ cashless garage networks, zero depreciation add-on, and instant WhatsApp quote.",
    title: "Car Insurance & Motor Protection",
    desc: "Protect your car against accidents, theft, natural disasters, and third-party liabilities with zero out-of-pocket costs and 5,000+ cashless garage repair workshops across India.",
    whyTitle: "Why Choose Car Insurance via DoConnect?",
    whyCards: [
      { title: "5,000+ Cashless Garages", desc: "Paperless repair service across major brand workshops (Maruti, Hyundai, Tata, Honda, etc.) in India." },
      { title: "Zero Depreciation Add-on", desc: "Get 100% claim payout on rubber, plastic, and fiber spare parts without depreciation deductions." },
      { title: "Engine & Gearbox Protection", desc: "Covers hydrostatic lock and engine damage caused by waterlogging during heavy monsoon floods." }
    ],
    overviewTitle: "Understanding Car Insurance Coverage",
    overviewP1: "Car insurance is a mandatory policy designed to safeguard your private four-wheeler from financial losses caused by road collisions, theft, vandalism, natural disasters, and legal third-party damages.",
    overviewP2: "As per Indian Motor Laws, driving without valid Third-Party car insurance incurs heavy fines. Opting for a Comprehensive Plan with Zero-Dep ensures total peace of mind on every drive.",
    benefits: [
      { title: "Financial Protection", desc: "Covers expensive spare parts, body repairs, and glass replacements." },
      { title: "Legal Compliance", desc: "Meets mandatory third-party liability rules, preventing RTO fines." },
      { title: "Personal Accident Cover", desc: "Includes ₹15 Lakhs accident cover for the owner-driver." },
      { title: "No Claim Bonus (NCB)", desc: "Enjoy up to 50% discount on renewal premiums for claim-free years." }
    ],
    compTitle: "Car Plan Types Comparison",
    compHeader: ["Coverage Aspect", "Third-Party Car Cover", "Standalone Own Damage", "Comprehensive Car Plan (Recommended)"],
    compRows: [
      { feature: "Third-Party Injury / Death", c1: "Unlimited Legal Cover", c2: "Not Covered", c3: "Unlimited Legal Cover" },
      { feature: "Third-Party Property Damage", c1: "Covered up to ₹7.5 Lakhs", c2: "Not Covered", c3: "Covered up to ₹7.5 Lakhs" },
      { feature: "Accidental Car Damage", c1: "Not Covered", c2: "Fully Covered", c3: "Fully Covered" },
      { feature: "Theft & Total Loss", c1: "Not Covered", c2: "Full IDV Payout", c3: "Full IDV Payout" },
      { feature: "Add-on Riders Eligibility", c1: "Not Eligible", c2: "Eligible (Zero Dep, Engine)", c3: "Eligible (Zero Dep, Engine, RSA)" }
    ],
    addons: [
      { title: "Zero Depreciation Cover", desc: "Prevents depreciation deductions on bumper, plastic, and fiber parts during claim settlements." },
      { title: "Engine Protection Cover", desc: "Covers engine repair costs caused by oil leakage or water ingestion in flooded roads." },
      { title: "24/7 Roadside Assistance (RSA)", desc: "Emergency towing, flat tyre assistance, battery jump-start, and emergency fuel delivery." },
      { title: "No Claim Bonus (NCB) Protect", desc: "Retains your accumulated NCB discount (up to 50%) even if you register a claim." },
      { title: "Return to Invoice (RTI)", desc: "Pays back the complete original on-road invoice cost of your vehicle in case of total loss or theft." },
      { title: "Consumables Cover", desc: "Covers cost of engine oil, brake fluid, coolant, nuts, bolts, and washers used in repairs." }
    ],
    inclusions: [
      "Accidental collisions, crashes, or vehicle rollover damages.",
      "Loss or damage resulting from burglary, housebreaking, or car theft.",
      "Fire, self-ignition, explosion, or lightning damage.",
      "Natural disasters (floods, earthquakes, cyclones, landslides).",
      "Man-made acts (riots, strikes, vandalism, malicious acts).",
      "Third-party legal property damage and bodily injury liabilities."
    ],
    exclusions: [
      "Normal wear & tear, aging, and mechanical/electrical failure.",
      "Damages caused while driving under the influence of alcohol or drugs.",
      "Driving without a valid driver's license.",
      "Consequential losses (e.g. driving after engine oil leak).",
      "Accidents occurring outside the geographical boundaries of India.",
      "War, mutiny, invasion, or nuclear hazards."
    ],
    faqs: [
      { q: "What is Zero Depreciation cover in car insurance?", a: "Zero Depreciation (Nil Dep) ensures you receive the full claim amount for replaced car parts without any deduction for depreciation." },
      { q: "How is IDV (Insured Declared Value) calculated?", a: "IDV is calculated based on the manufacturer's selling price minus age-based depreciation. It represents the maximum claim amount payable for total loss or theft." },
      { q: "Can I transfer my car NCB to a new vehicle?", a: "Yes! The NCB belongs to the vehicle owner, not the car. You can transfer your accumulated discount (up to 50%) when purchasing a new car." }
    ]
  },
  bike: {
    seoTitle: "Bike Insurance - 2-Wheeler Online Renewal & Cashless Cover",
    seoDesc: "Get instant two-wheeler & bike insurance starting from ₹1.5/day. Compare multi-year plans, helmet cover, zero dep, and 3,500+ bike repair workshops.",
    title: "Bike & Two-Wheeler Insurance",
    desc: "Protect your motorcycle or scooter starting from just ₹1.5/day. Enjoy instant 2-minute policy issuance, 3,500+ bike workshop repair networks, and helmet protection.",
    whyTitle: "Why Choose Bike Insurance via DoConnect?",
    whyCards: [
      { title: "2-Minute Instant Renewal", desc: "No physical inspection required for active two-wheeler policy renewals." },
      { title: "Up to 50% NCB Discount", desc: "Transfer your accrued No Claim Bonus when switching your bike insurance to DoConnect." },
      { title: "Pillion Rider Cover", desc: "Personal accident cover for both the bike rider and pillion passenger." }
    ],
    overviewTitle: "Understanding Two-Wheeler & Bike Insurance",
    overviewP1: "Two-wheeler insurance provides essential financial security for motorcycle and scooter riders in India, shielding against road accidents, bike theft, and mandatory third-party legal liabilities.",
    overviewP2: "Riding a bike in Indian city traffic exposes riders to higher collision risks. Securing long-term 2-wheeler coverage saves money while keeping you compliant with RTO regulations.",
    benefits: [
      { title: "Affordable Premiums", desc: "Get legal third-party protection starting at less than ₹2 per day." },
      { title: "Multi-Year Policy Options", desc: "Lock in premium rates for 2 or 3 years without annual renewal hassles." },
      { title: "Helmet Protection Rider", desc: "Claim compensation for high-end helmet damage during road accidents." },
      { title: "3,500+ Bike Workshops", desc: "Cashless repair services across authorized service centers nationwide." }
    ],
    compTitle: "Bike Plan Options Comparison",
    compHeader: ["Feature", "1-Year Third-Party Cover", "Multi-Year Comprehensive Bike Plan", "Standalone Own Damage Bike Plan"],
    compRows: [
      { feature: "RTO Penalty Exemption", c1: "Fully Compliant", c2: "Fully Compliant (3 Yrs)", c3: "Requires Active TP Policy" },
      { feature: "Bike Accident Repair", c1: "Not Covered", c2: "Fully Covered", c3: "Fully Covered" },
      { feature: "Bike Theft Protection", c1: "Not Covered", c2: "Full IDV Payout", c3: "Full IDV Payout" },
      { feature: "Premium Rate Stability", c1: "Subject to Annual RTO Increase", c2: "Locked for 3 Years", c3: "Annual Renewal" }
    ],
    addons: [
      { title: "Zero Depreciation Cover for Bike", desc: "Get 100% claim payout for plastic, fiber, and metal parts without depreciation deductions." },
      { title: "Helmet Damage Cover", desc: "Receive reimbursement up to ₹2,500 for damaged helmets during accidental crashes." },
      { title: "Pillion Passenger Accident Rider", desc: "Extends ₹1 Lakh - ₹5 Lakhs personal accident cover to the pillion passenger." },
      { title: "2-Wheeler Roadside Assistance", desc: "On-spot puncture repair, fuel delivery, towing, and key loss assistance." },
      { title: "Engine & Chain Cover", desc: "Protection against engine damage due to water ingress or chain/gearbox breakdown." },
      { title: "Consumables Cover for Bike", desc: "Covers engine oil, lubricants, brake oil, and minor fasteners during repairs." }
    ],
    inclusions: [
      "Accidental collisions, skid damage, or bike falls.",
      "Total theft or burglary of motorcycle/scooter.",
      "Damage due to fire, explosion, or self-ignition.",
      "Natural calamities (floods, cyclones, landslides).",
      "Third-party property damage and bodily injury liabilities.",
      "Personal accident cover for owner-rider up to ₹15 Lakhs."
    ],
    exclusions: [
      "Riding without a valid 2-wheeler driving license.",
      "Riding under the influence of alcohol, drugs, or intoxicating substances.",
      "Damage caused while performing stunts, racing, or illegal speed tests.",
      "Riding without a helmet (penalty deductions may apply).",
      "Normal wear & tear, tube punctures, or mechanical breakdowns.",
      "Accidents occurring outside Indian geographical limits."
    ],
    faqs: [
      { q: "Is two-wheeler insurance mandatory in India?", a: "Yes, as per the Motor Vehicles Act, at least a valid Third-Party two-wheeler insurance is mandatory for riding any motorcycle or scooter." },
      { q: "What is a 3-Year Long Term Bike Insurance?", a: "Long-term bike insurance allows you to cover your vehicle for 3 consecutive years in a single policy, locking in premium rates and preventing yearly renewals." },
      { q: "What is Pillion Rider cover?", a: "Pillion rider cover is an optional add-on that provides financial compensation to the passenger sitting behind the rider in case of accidental injury or death." }
    ]
  },
  commercial: {
    seoTitle: "Commercial Vehicle Insurance - Trucks, Taxis & Fleet Cover",
    seoDesc: "Insure commercial trucks, cabs, buses, and goods carriers. Get fleet protection, paid driver cover, third-party liability, and towing support.",
    title: "Commercial Vehicle & Fleet Insurance",
    desc: "Protect commercial trucks, taxis, delivery vans, passenger buses, and commercial fleets against operational accidents, driver injuries, cargo loss, and legal liabilities.",
    whyTitle: "Why Choose Commercial Vehicle Insurance via DoConnect?",
    whyCards: [
      { title: "Fleet & Driver Protection", desc: "Covers legal liabilities for paid drivers, cleaners, conductors, and helper staff." },
      { title: "Third-Party Property Cover up to ₹7.5L", desc: "Fulfills statutory motor act compliance for commercial highway transit." },
      { title: "Towing & Heavy Vehicle Assistance", desc: "On-road heavy commercial vehicle towing, crane assistance, and breakdown support." }
    ],
    overviewTitle: "Understanding Commercial Vehicle Insurance",
    overviewP1: "Commercial vehicle insurance is specialized coverage designed for business vehicles—including goods carrying trucks, passenger taxis/cabs, auto-rickshaws, buses, and agricultural vehicles.",
    overviewP2: "Operating commercial vehicles involves high daily mileage and heavy load transit risks. Protecting your fleet ensures continuous business operations without catastrophic financial liabilities.",
    benefits: [
      { title: "Business Interruption Support", desc: "Minimizes financial downtime during vehicle repairs or accident claims." },
      { title: "Paid Driver & Cleaner Cover", desc: "Statutory Workmen's Compensation for hired drivers and logistics staff." },
      { title: "Legal Liability to Passengers", desc: "Mandatory passenger legal liability protection for cabs, buses, and shuttles." },
      { title: "Overland Cargo Protection", desc: "Add-on coverage for goods and cargo damaged during road transit collisions." }
    ],
    compTitle: "Commercial Vehicle Options Compared",
    compHeader: ["Coverage Aspect", "Third-Party Commercial Cover", "Comprehensive Commercial Cover", "Multi-Vehicle Fleet Policy"],
    compRows: [
      { feature: "Legal Road Compliance", c1: "Mandatory Minimum", c2: "Fully Covered", c3: "Fully Covered (All Fleet)" },
      { feature: "Commercial Vehicle Repairs", c1: "Not Covered", c2: "Full Claim Settlement", c3: "Full Claim Settlement" },
      { feature: "Paid Driver Liability", c1: "Add-on Required", c2: "Included", c3: "Included for All Drivers" },
      { feature: "Fleet Management Discount", c1: "Not Applicable", c2: "Standard Rates", c3: "Bulk Fleet Discounts (10-25%)" }
    ],
    addons: [
      { title: "Paid Driver & Cleaner Protection", desc: "Covers medical expenses and compensation for employed drivers and helpers." },
      { title: "Zero Depreciation for Commercial Vehicles", desc: "Eliminates depreciation deductions on body repair and commercial spare parts." },
      { title: "Overland Transit Cargo Rider", desc: "Protects goods and commercial cargo against damage or loss during collision." },
      { title: "Loss of Use / Daily Allowance", desc: "Pays daily cash allowance to the business owner while the commercial vehicle is in workshop repair." },
      { title: "Heavy Towing & Crane Assistance", desc: "Emergency heavy-duty crane towing support for trucks and trailers on highways." },
      { title: "Public Liability Cover", desc: "Protects against third-party lawsuits and commercial property damages." }
    ],
    inclusions: [
      "Accidental collisions, overturns, or road mishaps during commercial transit.",
      "Theft or burglary of commercial trucks, vans, taxis, or buses.",
      "Fire, explosion, lightning, or self-ignition damage.",
      "Natural disasters (floods, landslides, earthquakes).",
      "Legal liability to paid drivers, cleaners, and conductors.",
      "Third-party property damage up to ₹7.5 Lakhs and injury liabilities."
    ],
    exclusions: [
      "Overloading beyond permitted Gross Vehicle Weight (GVW) or passenger seating capacity.",
      "Driving without a valid commercial driving license or commercial badge.",
      "Operating outside the permitted route/state permit limits without temporary permits.",
      "Transporting illegal goods, contraband, or hazardous unauthorized chemicals.",
      "Drunk driving by commercial vehicle driver.",
      "General mechanical breakdown or wear & tear due to aging."
    ],
    faqs: [
      { q: "What commercial vehicles can be insured?", a: "DoConnect covers all commercial vehicles including goods carrying trucks, delivery vans, cabs/taxis, auto-rickshaws, private buses, and JCB/construction equipment." },
      { q: "Is paid driver cover mandatory for commercial vehicles?", a: "Yes, under the Workmen's Compensation Act, it is highly recommended to include paid driver and cleaner cover to protect against legal liabilities." },
      { q: "What is GVW in commercial vehicle insurance?", a: "GVW stands for Gross Vehicle Weight. Insurers calculate premiums for goods carriers based on their registered GVW tonnage." }
    ]
  }
};

const Motor = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get('type') || 'car';
  const currentContent = MOTOR_CONTENT_MAP[typeParam] || MOTOR_CONTENT_MAP.car;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues: {
      name: '',
      mobile: '',
      email: '',
      vehicleType: typeParam === 'bike' ? 'Bike' : typeParam === 'commercial' ? 'Commercial' : 'Car',
      regNumber: '',
      vehicleModel: '',
      fuelOrCapacity: 'Petrol',
      city: ''
    }
  });

  useEffect(() => {
    if (typeParam === 'bike') {
      setValue('vehicleType', 'Bike');
    } else if (typeParam === 'commercial') {
      setValue('vehicleType', 'Commercial');
    } else {
      setValue('vehicleType', 'Car');
    }
  }, [typeParam, setValue]);

  const breadcrumbItems = [
    { label: 'Motor Insurance', path: '/motor' },
    {
      label: typeParam === 'bike' ? 'Bike Insurance' : typeParam === 'commercial' ? 'Commercial Vehicle' : 'Car Insurance',
      path: `/motor?type=${typeParam}`
    }
  ];

  const onSubmit = (data) => {
    toast.loading(`Preparing your ${currentContent.title} quote...`, { id: 'motor-quote-toast' });
    
    setTimeout(() => {
      toast.update('motor-quote-toast', {
        render: 'Redirecting to WhatsApp for instant motor quotes...',
        type: 'success',
        isLoading: false,
        autoClose: 3000
      });

      const text = `Hello ${BRAND_CONFIG.name},

I am interested in a ${currentContent.title}.

Name: ${data.name}
Mobile: ${data.mobile}
Email: ${data.email}
Vehicle Category: ${data.vehicleType}
Registration No: ${data.regNumber || 'N/A'}
Model/Year: ${data.vehicleModel || 'N/A'}
Spec / Fuel: ${data.fuelOrCapacity}
City: ${data.city}

Please share the best suitable quotes and zero-dep features.`;
      
      const phone = BRAND_CONFIG.whatsappNumber || '917683098648';
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      reset();
    }, 1200);
  };

  const cityOptions = citiesData.map((c) => ({
    value: c.name,
    label: c.name
  }));

  return (
    <>
      <SEO
        title={currentContent.seoTitle}
        description={currentContent.seoDesc}
        keywords="car insurance, bike insurance, motor third party cover, commercial vehicle insurance"
        path={`/motor?type=${typeParam}`}
      />

      {/* Header Strip */}
      <div className="bg-[#EAF6FC]/50 border-b border-slate-200/60 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <Breadcrumb items={breadcrumbItems} />

            {/* Motor Type Selector Sub-Tabs */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => setSearchParams({ type: 'car' })}
                className={`px-4 py-2 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                  typeParam === 'car' 
                    ? 'bg-[#075FC1] text-white shadow-md shadow-[#075FC1]/20' 
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                Car Insurance
              </button>
              <button
                onClick={() => setSearchParams({ type: 'bike' })}
                className={`px-4 py-2 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                  typeParam === 'bike' 
                    ? 'bg-[#075FC1] text-white shadow-md shadow-[#075FC1]/20' 
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                Bike Insurance
              </button>
              <button
                onClick={() => setSearchParams({ type: 'commercial' })}
                className={`px-4 py-2 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                  typeParam === 'commercial' 
                    ? 'bg-[#075FC1] text-white shadow-md shadow-[#075FC1]/20' 
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                Commercial Vehicle
              </button>
            </div>

            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-dark leading-tight pt-2">
              {currentContent.title}
            </h1>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
              {currentContent.desc}
            </p>
          </div>

          <div className="md:col-span-4 flex justify-end">
            <div className="w-20 h-20 rounded-2xl bg-[#075FC1]/10 border border-[#075FC1]/20 flex items-center justify-center text-[#075FC1]">
              {typeParam === 'bike' ? <Bike className="w-10 h-10" /> : typeParam === 'commercial' ? <Truck className="w-10 h-10" /> : <Car className="w-10 h-10" />}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column Copy */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-center">
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-dark leading-snug">
              {currentContent.whyTitle}
            </h2>
            
            <div className="space-y-6">
              {currentContent.whyCards.map((card, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#075FC1]/10 text-[#075FC1] flex items-center justify-center shrink-0 font-bold">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-dark text-base">{card.title}</h4>
                    <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className="font-display font-extrabold text-dark text-xl mb-1">
              Request {currentContent.title} Quote
            </h3>
            <p className="text-slate-500 text-xs mb-6">
              Takes less than 60 seconds. Direct WhatsApp quotes.
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
                  placeholder="name@example.com"
                  {...register('email', { required: 'Email is required' })}
                  error={errors.email}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Registration Number"
                  placeholder={typeParam === 'bike' ? 'e.g. DL-01-XY-9876' : typeParam === 'commercial' ? 'e.g. HR-55-AB-9999' : 'e.g. MH-12-AB-1234'}
                  {...register('regNumber', { required: 'Registration number required' })}
                  error={errors.regNumber}
                />
                
                <InputField
                  label="Make & Model Year"
                  placeholder={typeParam === 'bike' ? 'e.g. Hero Splendor 2023' : typeParam === 'commercial' ? 'e.g. Tata Ace 2024' : 'e.g. Honda City 2024'}
                  {...register('vehicleModel', { required: 'Vehicle model required' })}
                  error={errors.vehicleModel}
                />
              </div>

              {typeParam === 'car' && (
                <SelectField
                  label="Fuel Type"
                  options={[
                    { value: 'Petrol', label: 'Petrol' },
                    { value: 'Diesel', label: 'Diesel' },
                    { value: 'CNG', label: 'CNG (Company / Fitted)' },
                    { value: 'EV', label: 'Electric (EV)' }
                  ]}
                  {...register('fuelOrCapacity')}
                />
              )}

              {typeParam === 'bike' && (
                <SelectField
                  label="Engine Displacement (CC)"
                  options={[
                    { value: 'Under125', label: 'Under 125 cc (Commuter Bike / Scooter)' },
                    { value: '125to150', label: '125 cc - 150 cc' },
                    { value: '150to350', label: '150 cc - 350 cc (Sports / Cruiser)' },
                    { value: 'Above350', label: 'Above 350 cc (Superbike)' }
                  ]}
                  {...register('fuelOrCapacity')}
                />
              )}

              {typeParam === 'commercial' && (
                <SelectField
                  label="Commercial Vehicle Type"
                  options={[
                    { value: 'GoodsCarrier', label: 'Goods Carrying Truck / LCV / HCV' },
                    { value: 'TaxiCab', label: 'Passenger Taxi / Cab (Uber/Ola/Private)' },
                    { value: 'DeliveryVan', label: 'Delivery Auto / Van' },
                    { value: 'BusShuttle', label: 'Passenger Bus / Staff Shuttle' }
                  ]}
                  {...register('fuelOrCapacity')}
                />
              )}

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
                className="mt-6 bg-[#075FC1] hover:bg-[#0B3B7A]"
              >
                {isSubmitting ? 'Processing...' : `Get Instant ${typeParam.toUpperCase()} Quote`}
              </Button>
            </form>
          </div>

        </div>
      </div>

      {/* Rich Motor Insurance Information Guide */}
      <div className="border-t border-slate-100 bg-[#F7FAFC] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          
          {/* Section 1: Detailed Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold text-[#075FC1] uppercase tracking-widest bg-[#075FC1]/10 border border-[#075FC1]/20 px-3.5 py-1.5 rounded-full inline-block">
                Overview
              </span>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-dark leading-tight">
                {currentContent.overviewTitle}
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                {currentContent.overviewP1}
              </p>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                {currentContent.overviewP2}
              </p>
            </div>

            <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xs">
              <h3 className="font-display font-extrabold text-dark text-lg mb-4">Key Benefits</h3>
              <ul className="space-y-3.5">
                {currentContent.benefits.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#075FC1] mt-1 shrink-0" />
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
              <span className="text-xs font-bold text-[#075FC1] uppercase tracking-widest bg-[#075FC1]/10 border border-[#075FC1]/20 px-3.5 py-1.5 rounded-full inline-block">
                Comparison Guide
              </span>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-dark">
                {currentContent.compTitle}
              </h2>
              <p className="text-slate-500 text-xs md:text-sm font-medium">
                Compare coverage options side-by-side to determine the best match for your vehicle.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-dark font-display font-bold text-xs md:text-sm">
                      {currentContent.compHeader.map((h, hIdx) => (
                        <th key={hIdx} className={`p-4 md:p-5 ${hIdx === 3 ? 'bg-[#EAF6FC]/50 text-[#075FC1]' : ''}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs md:text-sm text-slate-650">
                    {currentContent.compRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 md:p-5 font-bold text-slate-700">{row.feature}</td>
                        <td className="p-4 md:p-5 font-medium">{row.c1}</td>
                        <td className="p-4 md:p-5 font-medium">{row.c2}</td>
                        <td className="p-4 md:p-5 font-bold text-[#075FC1] bg-[#EAF6FC]/20">{row.c3}</td>
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
              <span className="text-xs font-bold text-[#075FC1] uppercase tracking-widest bg-[#075FC1]/10 border border-[#075FC1]/20 px-3.5 py-1.5 rounded-full inline-block">
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
              {currentContent.addons.map((addon, idx) => (
                <div key={idx} className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all duration-300">
                  <h4 className="font-display font-bold text-dark text-sm md:text-base mb-2">{addon.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">{addon.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xs space-y-4">
              <h3 className="font-display font-extrabold text-dark text-lg flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#075FC1] rounded-full animate-pulse" />
                What is Covered (Inclusions)
              </h3>
              <ul className="space-y-3">
                {currentContent.inclusions.map((item, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs md:text-sm">
                    <Check className="w-4 h-4 text-[#075FC1] mt-1 shrink-0" />
                    <span className="font-medium text-slate-650 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xs space-y-4">
              <h3 className="font-display font-extrabold text-dark text-lg flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-rose-500 rounded-full" />
                What is NOT Covered (Exclusions)
              </h3>
              <ul className="space-y-3">
                {currentContent.exclusions.map((item, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs md:text-sm">
                    <X className="w-4.5 h-4.5 text-rose-500 mt-0.5 shrink-0" />
                    <span className="font-medium text-slate-650 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 5: FAQs */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold text-[#075FC1] uppercase tracking-widest bg-[#075FC1]/10 border border-[#075FC1]/20 px-3.5 py-1.5 rounded-full inline-block">
                FAQs
              </span>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-dark">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xs divide-y divide-slate-100">
              {currentContent.faqs.map((faq, idx) => (
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
