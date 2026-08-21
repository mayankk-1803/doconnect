import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import Breadcrumb from '../../components/common/Breadcrumb';
import InputField from '../../components/forms/InputField';
import SelectField from '../../components/forms/SelectField';
import Button from '../../components/ui/Button';
import { Heart, ShieldCheck, Zap, HelpCircle, Check, X, ChevronDown, Award, TrendingUp, PiggyBank, Shield } from 'lucide-react';
import { toast } from 'react-toastify';
import citiesData from '../../data/cities.json';
import { BRAND_CONFIG } from '../../constants';

// Data maps for complete tab content customization
const TAB_CONTENT = {
  term: {
    seoTitle: "Term Life Insurance - High Sum Protection & Low Premiums",
    seoDesc: "Secure your family with ₹1 Crore+ term life cover starting from ₹16/day. Compare top term insurance plans with critical illness riders and tax benefits under Sec 80C & 10(10D).",
    title: "Term Life Insurance Plans",
    desc: "Protect your family's financial future with high sum protection up to ₹5 Crore starting from just ₹16/day. Enjoy guaranteed death benefits, terminal illness payouts, and income protection.",
    whyTitle: "Why Choose Term Life Insurance?",
    whyCards: [
      {
        title: "High Sum Assured Protection",
        desc: "Get ₹1 Crore to ₹5 Crore protection to cover home loans, family living costs, and children's education."
      },
      {
        title: "100% Tax-Free Payouts",
        desc: "Death benefits paid to your family are completely tax-exempt under Section 10(10D) of the IT Act."
      },
      {
        title: "Critical Illness & Disability Riders",
        desc: "Receive lump-sum cash payouts on diagnosis of 64 critical illnesses like cancer or heart attack."
      }
    ],
    overviewTitle: "What is Term Life Insurance?",
    overviewP1: "Term insurance is a pure risk cover plan that pays a guaranteed sum assured to your designated beneficiary if you pass away during the policy tenure.",
    overviewP2: "Because term plans do not combine savings or market investments, premiums are exceptionally low—enabling young earners and parents to secure ₹1 Crore or more for minimal annual outgo.",
    advantages: [
      { title: "Family Income Security", desc: "Replaces lost earning power and covers home loans or debts." },
      { title: "Waiver of Premium", desc: "Future premiums are waived off if the policyholder suffers permanent disability." },
      { title: "Flexible Payout Modes", desc: "Choose between lump-sum payout, monthly income, or a combination of both." },
      { title: "Section 80C Tax Benefit", desc: "Save up to ₹46,800/year on income tax on premiums paid." }
    ],
    compTitle: "Term Plan Options Compared",
    compHeader: ["Feature / Option", "Pure Term Insurance", "Return of Premium (TROP)", "Whole Life Cover (99 Yrs)"],
    compRows: [
      { feature: "Primary Objective", c1: "High Life Protection", c2: "Life Cover + Premium Refund", c3: "Protection up to Age 99" },
      { feature: "Cost Factor", c1: "Lowest Premium (from ₹16/day)", c2: "Moderate Premium Outgo", c3: "Higher Premium Outgo" },
      { feature: "Maturity Payout", c1: "No Payout if Survived", c2: "100% Premiums Refunded", c3: "Accumulated Cash Bonuses" },
      { feature: "Tax Benefit", c1: "Sec 80C & 10(10D) Exempt", c2: "Sec 80C & 10(10D) Exempt", c3: "Sec 80C & 10(10D) Exempt" }
    ],
    inclusions: [
      "Death due to road accidents, natural causes, and critical illnesses.",
      "Terminal illness diagnosis with advance sum payout.",
      "COVID-19 and pandemic illness claim coverage.",
      "Lump-sum payouts for 64 critical illness riders.",
      "Permanent accidental disability rider benefits.",
      "Flexible monthly income payouts for surviving family members."
    ],
    exclusions: [
      "Suicide within the first 12 months of policy issuance.",
      "Death resulting from illegal, criminal, or unlawful activities.",
      "Undisclosed pre-existing medical conditions during underwriting.",
      "Fatalities caused by drunk driving or substance abuse.",
      "Aviation accidents in non-commercial private aircraft.",
      "War, terrorism, and nuclear radiation hazards."
    ],
    faqs: [
      { q: "What is Term Life Insurance?", a: "Term Life Insurance is the simplest and most affordable form of life insurance. It pays a fixed lump-sum amount (Sum Assured) to your nominee if you pass away during the policy term." },
      { q: "How much Term Insurance cover do I need?", a: "Financial advisors recommend choosing a sum assured equal to at least 10 to 15 times your annual gross salary plus any outstanding home loans." },
      { q: "Are term insurance claim payouts tax-free?", a: "Yes! Death benefits received by nominees are 100% tax-free under Section 10(10D) of the Income Tax Act, 1961." },
      { q: "Can smokers get term insurance?", a: "Yes. Smokers can easily buy term insurance policies. Insurers charge a slightly higher premium based on medical health declarations." }
    ]
  },
  investment: {
    seoTitle: "Investment & Savings Insurance Plans - ULIPs & Wealth Creation",
    seoDesc: "Grow your wealth with capital protection, market-linked ULIPs, and guaranteed savings plans. Enjoy tax-free returns under Sec 10(10D) and dual life cover.",
    title: "Investment & Savings Insurance Plans",
    desc: "Grow your wealth with capital protection and life cover. Enjoy high-return ULIPs and tax-free guaranteed returns under Section 10(10D) to fund major life milestones.",
    whyTitle: "Why Choose Investment & Savings Plans?",
    whyCards: [
      {
        title: "Dual Advantage: Wealth + Cover",
        desc: "Enjoy dual benefits of high wealth creation plus financial protection for your family."
      },
      {
        title: "Tax-Free Maturity Returns",
        desc: "All capital gains and maturity proceeds are exempt from tax under Section 10(10D)."
      },
      {
        title: "Flexible Fund Switching",
        desc: "Switch between Equity, Debt, and Balanced funds anytime with zero transfer fee."
      }
    ],
    overviewTitle: "What are Investment & Savings Insurance Plans?",
    overviewP1: "Investment plans (ULIPs and Guaranteed Savings Plans) combine life insurance coverage with high-yield investment options, allowing you to build wealth for milestones like buying a home or funding children's higher education.",
    overviewP2: "Unlike traditional mutual funds, investment insurance plans lock in tax-free returns under Section 10(10D) while ensuring your family gets the full sum assured even if unfortunate events occur during the investment tenure.",
    advantages: [
      { title: "Children's Higher Education", desc: "Guarantees milestone funds for higher studies and marriage." },
      { title: "Partial Withdrawals", desc: "Withdraw cash after the 5-year lock-in for emergency needs." },
      { title: "Loyalty Additions", desc: "Insurers add bonus units to your fund every 5 years to boost overall returns." },
      { title: "Zero LTCG Tax", desc: "Save 12.5% Long Term Capital Gains tax compared to equity mutual funds." }
    ],
    compTitle: "Investment Options Comparison",
    compHeader: ["Feature / Benefit", "ULIP Investment Plans", "Guaranteed Savings Plans", "Traditional Mutual Funds"],
    compRows: [
      { feature: "Return Potential", c1: "High Market-Linked (12-15% historic)", c2: "Fixed Guaranteed Returns (6-7.5%)", c3: "Market-Linked Variable" },
      { feature: "Tax Exemption", c1: "100% Tax-Free (Sec 10D)", c2: "100% Tax-Free (Sec 10D)", c3: "12.5% LTCG Taxable" },
      { feature: "Life Cover", c1: "Included (10x Annual Premium)", c2: "Included (10x Annual Premium)", c3: "No Insurance Cover" },
      { feature: "Lock-in Period", c1: "5 Years Lock-in", c2: "5 to 10 Years Lock-in", c3: "No Lock-in (except ELSS 3 yrs)" }
    ],
    inclusions: [
      "Maturity payout of total market fund value or guaranteed sum.",
      "Sum Assured payable to nominee in case of policyholder's demise.",
      "Partial liquidity withdrawals after 5-year lock-in period.",
      "Unlimited free fund switching between Equity, Hybrid & Debt.",
      "Guaranteed loyalty additions and wealth boosters.",
      "Tax deductions on annual investment under Section 80C."
    ],
    exclusions: [
      "Market fluctuations in aggressive equity ULIP funds.",
      "Surrender penalties if policy is discontinued prior to 5-year lock-in.",
      "Suicide within first 12 months (payout limited to fund value).",
      "Partial withdrawals made before the completion of 5 years.",
      "Lapsed policies due to non-payment of renewal premiums.",
      "Underperformance of self-selected debt/equity fund options."
    ],
    faqs: [
      { q: "What is a Unit Linked Insurance Plan (ULIP)?", a: "A ULIP is a two-in-one plan that combines life insurance with investment options in equity or debt market funds." },
      { q: "Are returns from ULIP investment plans tax-free?", a: "Yes! Returns and maturity proceeds from ULIPs with premium under ₹2.5 Lakhs/year are 100% tax-free under Section 10(10D)." },
      { q: "Can I switch funds between Equity and Debt?", a: "Yes. Most insurers offer 4 to 12 free fund switches every year allowing you to rebalance your portfolio as market conditions change." },
      { q: "What is the lock-in period for ULIP investment plans?", a: "ULIPs have a mandatory 5-year lock-in period, after which partial withdrawals are permitted." }
    ]
  },
  pension: {
    seoTitle: "Retirement & Guaranteed Pension Plans - Lifetime Monthly Annuity",
    seoDesc: "Secure a stress-free retirement with lifetime guaranteed monthly pension payouts and tax savings under Sec 80CCC. Compare deferred & immediate annuity plans.",
    title: "Retirement & Guaranteed Pension Plans",
    desc: "Secure a stress-free retirement with lifetime guaranteed monthly annuity payouts, guaranteed inflation protection, and tax savings under Section 80CCC.",
    whyTitle: "Why Choose Retirement & Pension Plans?",
    whyCards: [
      {
        title: "Lifetime Guaranteed Annuity",
        desc: "Receive a fixed monthly pension for the rest of your life without market volatility risk."
      },
      {
        title: "Joint-Life Pension for Spouse",
        desc: "Ensure your spouse continues receiving 100% monthly pension after your demise."
      },
      {
        title: "Tax Deduction under 80CCC",
        desc: "Save tax on pension contributions up to ₹1.5 Lakhs every year under Section 80CCC."
      }
    ],
    overviewTitle: "What are Retirement & Pension Insurance Plans?",
    overviewP1: "Pension plans are financial safety nets designed to accumulate a lump-sum retirement corpus during your working years and convert it into a steady, guaranteed monthly income stream once you retire.",
    overviewP2: "With rising inflation and medical costs in India, having a dedicated annuity plan guarantees financial independence in your golden years so you never rely on anyone else.",
    advantages: [
      { title: "Guaranteed Lifetime Income", desc: "Fixed monthly payouts that never decrease regardless of market crashes." },
      { title: "Commutation Benefit", desc: "Withdraw up to 60% of your accumulated retirement corpus completely tax-free at retirement age." },
      { title: "Return of Purchase Price", desc: "Full original investment amount is refunded to your nominee upon the annuitant's death." },
      { title: "Inflation Protection Option", desc: "Opt for escalating annuity plans that increase pension by 3-5% every year." }
    ],
    compTitle: "Retirement Options Compared",
    compHeader: ["Feature / Benefit", "Deferred Annuity (Accumulation)", "Immediate Annuity (Instant Pension)", "National Pension System (NPS)"],
    compRows: [
      { feature: "Start of Pension", c1: "Starts at chosen retirement age", c2: "Starts immediately next month", c3: "Starts at age 60" },
      { feature: "Guaranteed Rate", c1: "Guaranteed rate locked today", c2: "Guaranteed rate locked today", c3: "Variable Market-linked" },
      { feature: "Spouse Continuation", c1: "100% Continuation Option", c2: "100% Continuation Option", c3: "Annuity Dependent" },
      { feature: "Tax Benefit", c1: "Sec 80CCC Deduction", c2: "Annuity Taxable as Income", c3: "Sec 80CCD Exemption" }
    ],
    inclusions: [
      "Lifetime guaranteed monthly or quarterly pension payouts.",
      "Joint-life pension continuation to surviving spouse.",
      "Return of full purchase price to nominee upon death.",
      "Tax-free lump-sum commutation up to 60% at retirement age.",
      "Vesting benefits and guaranteed death cover during accumulation.",
      "Options for escalating pension to beat annual inflation."
    ],
    exclusions: [
      "Early withdrawal penalties prior to vesting age.",
      "Surrender of annuity policy after monthly payouts have commenced.",
      "Market loss in guaranteed deferred annuity products.",
      "Loans against immediate annuity policies.",
      "Partial withdrawals during accumulation without qualifying criteria.",
      "Lapsed policies due to unpaid accumulation premiums."
    ],
    faqs: [
      { q: "What is an Annuity Plan in retirement insurance?", a: "An annuity plan is a retirement product where you pay a lump-sum or regular premiums, and in return, the insurer pays you a guaranteed monthly pension for life." },
      { q: "What is the difference between Immediate and Deferred Annuity?", a: "Immediate Annuity starts paying monthly pension right away (ideal for retirees), while Deferred Annuity lets you invest today and start pension after 5 to 15 years." },
      { q: "Is pension income received taxable?", a: "The lump-sum withdrawn at retirement (up to 60%) is tax-free. The monthly pension payouts are taxable as per your income tax slab." },
      { q: "What happens to the pension after the annuitant's death?", a: "Under 'Return of Purchase Price' plans, the full original investment is returned to the nominee. Under 'Joint Life' plans, the pension continues to the spouse." }
    ]
  }
};

const LifeInsurance = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'term';
  const currentContent = TAB_CONTENT[activeTab] || TAB_CONTENT.term;

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
      planType: activeTab === 'investment' ? 'Investment' : activeTab === 'pension' ? 'Pension' : 'Term',
      age: '30',
      tobaccoStatus: 'No',
      investmentAmount: '5000',
      retirementAge: '60',
      sumAssured: '1Crore',
      city: ''
    }
  });

  useEffect(() => {
    if (activeTab === 'investment') {
      setValue('planType', 'Investment');
    } else if (activeTab === 'pension') {
      setValue('planType', 'Pension');
    } else {
      setValue('planType', 'Term');
    }
  }, [activeTab, setValue]);

  const breadcrumbItems = [
    { label: 'Life Insurance', path: '/life' },
    { 
      label: activeTab === 'investment' ? 'Investment Plans' : activeTab === 'pension' ? 'Pension Plans' : 'Term Insurance', 
      path: `/life?tab=${activeTab}` 
    }
  ];

  const onSubmit = (data) => {
    toast.loading('Preparing your personalized Life Insurance quote...', { id: 'life-quote-toast' });
    
    setTimeout(() => {
      toast.update('life-quote-toast', {
        render: 'Redirecting to WhatsApp for personalized quotes...',
        type: 'success',
        isLoading: false,
        autoClose: 3000
      });

      let detailText = '';
      if (activeTab === 'term') {
        detailText = `Smoker/Tobacco: ${data.tobaccoStatus}\nSum Assured: ${data.sumAssured}`;
      } else if (activeTab === 'investment') {
        detailText = `Monthly Investment: ₹${data.investmentAmount}/month`;
      } else if (activeTab === 'pension') {
        detailText = `Target Retirement Age: ${data.retirementAge} Years`;
      }

      const text = `Hello ${BRAND_CONFIG.name},

I am interested in a ${currentContent.title}.

Name: ${data.name}
Mobile: ${data.mobile}
Email: ${data.email}
Age: ${data.age} Years
${detailText}
City: ${data.city}

Please share the best suitable plans and tax benefit details.`;
      
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
        keywords="life insurance, term insurance, investment plans, pension plans, retirement savings, ULIP plans, section 80c tax saving"
        path={`/life?tab=${activeTab}`}
      />

      {/* Hero Header Strip */}
      <div className="bg-[#EAF6FC]/50 border-b border-slate-200/60 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <Breadcrumb items={breadcrumbItems} />
            
            {/* Category Sub-Tabs */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => setSearchParams({ tab: 'term' })}
                className={`px-4 py-2 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'term' 
                    ? 'bg-[#2F6FAF] text-white shadow-md shadow-[#2F6FAF]/20' 
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                Term Life Insurance
              </button>
              <button
                onClick={() => setSearchParams({ tab: 'investment' })}
                className={`px-4 py-2 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'investment' 
                    ? 'bg-[#2F6FAF] text-white shadow-md shadow-[#2F6FAF]/20' 
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                Investment & Savings Plans
              </button>
              <button
                onClick={() => setSearchParams({ tab: 'pension' })}
                className={`px-4 py-2 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'pension' 
                    ? 'bg-[#2F6FAF] text-white shadow-md shadow-[#2F6FAF]/20' 
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <PiggyBank className="w-3.5 h-3.5" />
                Retirement & Pension Plans
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
            <div className="w-20 h-20 rounded-2xl bg-[#2F6FAF]/10 border border-[#2F6FAF]/20 flex items-center justify-center text-[#2F6FAF]">
              {activeTab === 'investment' ? <TrendingUp className="w-10 h-10" /> : activeTab === 'pension' ? <PiggyBank className="w-10 h-10" /> : <Heart className="w-10 h-10" />}
            </div>
          </div>
        </div>
      </div>

      {/* Main Quote & Information Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-center">
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-dark leading-snug">
              {currentContent.whyTitle}
            </h2>
            
            <div className="space-y-6">
              {currentContent.whyCards.map((card, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2F6FAF]/10 text-[#2F6FAF] flex items-center justify-center shrink-0 font-bold">
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

          {/* Right Column Custom Form */}
          <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className="font-display font-extrabold text-dark text-xl mb-1">
              Request {currentContent.title} Quote
            </h3>
            <p className="text-slate-500 text-xs mb-6">
              Instant evaluation from top IRDAI insurers via WhatsApp.
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
                  label="Your Current Age"
                  type="number"
                  placeholder="30"
                  {...register('age', { required: 'Age is required' })}
                  error={errors.age}
                />

                {activeTab === 'term' && (
                  <SelectField
                    label="Tobacco / Smoking"
                    options={[
                      { value: 'No', label: 'Non-Smoker (Cheaper)' },
                      { value: 'Yes', label: 'Smoker / Tobacco' }
                    ]}
                    {...register('tobaccoStatus')}
                  />
                )}

                {activeTab === 'investment' && (
                  <SelectField
                    label="Monthly Savings Target"
                    options={[
                      { value: '3000', label: '₹3,000 / month' },
                      { value: '5000', label: '₹5,000 / month' },
                      { value: '10000', label: '₹10,000 / month' },
                      { value: '25000', label: '₹25,000+ / month' }
                    ]}
                    {...register('investmentAmount')}
                  />
                )}

                {activeTab === 'pension' && (
                  <SelectField
                    label="Retirement Age Target"
                    options={[
                      { value: '50', label: '50 Years (Early Retirement)' },
                      { value: '55', label: '55 Years' },
                      { value: '60', label: '60 Years (Standard)' },
                      { value: '65', label: '65 Years' }
                    ]}
                    {...register('retirementAge')}
                  />
                )}
              </div>

              {activeTab === 'term' && (
                <SelectField
                  label="Desired Life Cover"
                  options={[
                    { value: '50Lakhs', label: '₹50 Lakhs Cover' },
                    { value: '1Crore', label: '₹1 Crore Cover (Recommended)' },
                    { value: '2Crores', label: '₹2 Crores Cover' },
                    { value: '5Crores', label: '₹5+ Crores High Cover' }
                  ]}
                  {...register('sumAssured')}
                />
              )}

              <SelectField
                label="City of Residence"
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
                className="mt-6 bg-[#2F6FAF] hover:bg-[#245B91] cursor-pointer"
              >
                {isSubmitting ? 'Processing...' : `Get ${currentContent.title} Quote`}
              </Button>
            </form>
          </div>

        </div>
      </div>

      {/* Life Insurance Knowledge Guide */}
      <div className="border-t border-slate-100 bg-[#F7FAFC] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          
          {/* Section 1: Detailed Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold text-[#2F6FAF] uppercase tracking-widest bg-[#2F6FAF]/10 border border-[#2F6FAF]/20 px-3.5 py-1.5 rounded-full inline-block">
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
              <h3 className="font-display font-extrabold text-dark text-lg mb-4">Key Advantages</h3>
              <ul className="space-y-3.5">
                {currentContent.advantages.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#2F6FAF] mt-1 shrink-0" />
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
              <span className="text-xs font-bold text-[#2F6FAF] uppercase tracking-widest bg-[#2F6FAF]/10 border border-[#2F6FAF]/20 px-3.5 py-1.5 rounded-full inline-block">
                Comparison Guide
              </span>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-dark">
                {currentContent.compTitle}
              </h2>
              <p className="text-slate-500 text-xs md:text-sm font-medium">
                Compare coverage options side-by-side to choose your ideal policy.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-dark font-display font-bold text-xs md:text-sm">
                      {currentContent.compHeader.map((h, hIdx) => (
                        <th key={hIdx} className={`p-4 md:p-5 ${hIdx === 1 ? 'bg-[#EAF6FC]/50 text-[#2F6FAF]' : ''}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs md:text-sm text-slate-650">
                    {currentContent.compRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 md:p-5 font-bold text-slate-700">{row.feature}</td>
                        <td className="p-4 md:p-5 font-bold text-[#2F6FAF] bg-[#EAF6FC]/20">{row.c1}</td>
                        <td className="p-4 md:p-5 font-medium">{row.c2}</td>
                        <td className="p-4 md:p-5 font-medium">{row.c3}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Section 3: Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xs space-y-4">
              <h3 className="font-display font-extrabold text-dark text-lg flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#2F6FAF] rounded-full animate-pulse" />
                What is Covered (Inclusions)
              </h3>
              <ul className="space-y-3">
                {currentContent.inclusions.map((item, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs md:text-sm">
                    <Check className="w-4 h-4 text-[#2F6FAF] mt-1 shrink-0" />
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

          {/* Section 4: FAQs */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold text-[#2F6FAF] uppercase tracking-widest bg-[#2F6FAF]/10 border border-[#2F6FAF]/20 px-3.5 py-1.5 rounded-full inline-block">
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

export default LifeInsurance;
