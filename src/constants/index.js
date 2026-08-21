export const BRAND_CONFIG = {
  name: 'DoConnect',
  logoText: 'DoConnect',
  whatsappNumber: '917683098648',
  supportEmail: 'Info@doconnectservices.com',
  emails: [
    { label: 'General Enquiries', value: 'Info@doconnectservices.com' },
    { label: 'Director', value: 'Shubhamchauhan@doconnectservices.com' },
    { label: 'HR', value: 'hr@doconnectservices.com' },
  ],
  supportPhone: '+91 76830 98648',
  directorName: 'Shubham Chauhan',
  directorTitle: 'Director',
  address: '8th Floor, Capital Tower, Sector 45, Gurugram, Haryana, India - 122003',
};

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  {
    label: 'Health',
    path: '/health-insurance',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Individual Health', path: '/health-insurance' },
      { label: 'Family Floater', path: '/family-insurance' },
      { label: 'Senior Citizen', path: '/senior-citizen' },
      { label: 'Critical Illness', path: '/critical-illness' },
      { label: 'Top Up Plans', path: '/top-up' }
    ]
  },
  {
    label: 'Life',
    path: '/life',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Term Insurance', path: '/life?tab=term' },
      { label: 'Investment Plans', path: '/life?tab=investment' },
      { label: 'Pension Plans', path: '/life?tab=pension' }
    ]
  },
  {
    label: 'Motor',
    path: '/motor',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Car Insurance', path: '/motor?type=car' },
      { label: 'Bike Insurance', path: '/motor?type=bike' },
      { label: 'Commercial Vehicle', path: '/motor?type=commercial' }
    ]
  },
  { label: 'Travel', path: '/travel' },
  { label: 'Contact', path: '/contact' },
  { label: 'Login', path: '#login', isButton: true }
];

export const CATEGORIES = [
  {
    id: 'health',
    title: 'Health Insurance',
    desc: 'Protect yourself and your family against unexpected medical expenses with suitable health insurance coverage from leading insurers.',
    description: 'Protect yourself and your family against unexpected medical expenses with suitable health insurance coverage from leading insurers.',
    coverage: [
      'Hospitalization',
      'Cashless Treatment',
      'Family Floater',
      'Individual Health Cover',
      'Senior Citizen Cover',
      'Critical Illness',
      'Top-Up Plans'
    ],
    cta: 'Compare Health Plans',
    ctaText: 'Compare Health Plans',
    icon: 'Shield',
    path: '/health-insurance',
    badge: 'Popular',
    image: 'https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop'
  },
  {
    id: 'car',
    title: 'Car Insurance',
    desc: 'Protect your car against accidents, theft, natural disasters, and third-party liabilities with the right motor insurance plan.',
    description: 'Protect your car against accidents, theft, natural disasters, and third-party liabilities with the right motor insurance plan.',
    coverage: [
      'Comprehensive Cover',
      'Third-Party Liability',
      'Own Damage',
      'Zero Depreciation',
      'Roadside Assistance',
      'Engine Protection',
      'Personal Accident Cover'
    ],
    cta: 'Get Car Quote',
    ctaText: 'Get Car Quote',
    icon: 'Car',
    path: '/motor?type=car',
    badge: 'Instant',
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop'
  },
  {
    id: 'bike',
    title: 'Bike Insurance',
    desc: 'Get reliable protection for your two-wheeler against accidents, theft, damage, and third-party liabilities.',
    description: 'Get reliable protection for your two-wheeler against accidents, theft, damage, and third-party liabilities.',
    coverage: [
      'Comprehensive Bike Insurance',
      'Third-Party Cover',
      'Own Damage',
      'Personal Accident Cover',
      'Zero Depreciation',
      'Roadside Assistance'
    ],
    cta: 'Get Bike Quote',
    ctaText: 'Get Bike Quote',
    icon: 'Bike',
    path: '/motor?type=bike',
    badge: 'New',
    image: 'https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop'
  },
  {
    id: 'term',
    title: 'Term Insurance',
    desc: 'Secure your family\'s financial future with affordable term insurance plans offering substantial life protection.',
    description: 'Secure your family\'s financial future with affordable term insurance plans offering substantial life protection.',
    coverage: [
      'High Life Cover',
      'Affordable Premiums',
      'Income Protection',
      'Critical Illness Riders',
      'Accidental Death Benefits',
      'Flexible Policy Terms'
    ],
    cta: 'Compare Term Plans',
    ctaText: 'Compare Term Plans',
    icon: 'Clock',
    path: '/life?tab=term',
    badge: 'High Cover',
    image: 'https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop'
  },
  {
    id: 'life',
    title: 'Life Insurance',
    desc: 'Build long-term financial protection for your loved ones while choosing plans aligned with your savings and financial goals.',
    description: 'Build long-term financial protection for your loved ones while choosing plans aligned with your savings and financial goals.',
    coverage: [
      'Life Protection',
      'Savings Plans',
      'Child Plans',
      'Retirement Planning',
      'Long-Term Savings',
      'Wealth Creation'
    ],
    cta: 'Explore Life Plans',
    ctaText: 'Explore Life Plans',
    icon: 'Heart',
    path: '/life',
    badge: 'Tax Saving',
    image: 'https://images.pexels.com/photos/2253879/pexels-photo-2253879.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop'
  },
  {
    id: 'investment',
    title: 'Investment Plans',
    desc: 'Explore insurance-linked savings and investment solutions designed to help you plan for long-term financial goals.',
    description: 'Explore insurance-linked savings and investment solutions designed to help you plan for long-term financial goals.',
    coverage: [
      'Wealth Creation',
      'Savings Plans',
      'ULIPs',
      'Retirement Planning',
      'Child Education Planning',
      'Tax-Saving Options'
    ],
    cta: 'Explore Investment Plans',
    ctaText: 'Explore Investment Plans',
    icon: 'Coins',
    path: 'https://wa.me/917683098648?text=Hello%20DoConnect%2C%20I%20am%20interested%20in%20an%20Investment%20Plan.',
    badge: 'High Return',
    image: 'https://images.pexels.com/photos/1602726/pexels-photo-1602726.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop'
  },
  {
    id: 'travel',
    title: 'Travel Insurance',
    desc: 'Travel with confidence with coverage for medical emergencies, trip disruptions, baggage issues, and unexpected travel expenses.',
    description: 'Travel with confidence with coverage for medical emergencies, trip disruptions, baggage issues, and unexpected travel expenses.',
    coverage: [
      'Medical Emergencies',
      'Trip Cancellation',
      'Travel Delays',
      'Lost Baggage',
      'Passport Loss',
      'International Travel Cover'
    ],
    cta: 'Get Travel Cover',
    ctaText: 'Get Travel Cover',
    icon: 'Plane',
    path: '/travel',
    badge: 'Secure',
    image: 'https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop'
  },
  {
    id: 'business',
    title: 'Business Insurance',
    desc: 'Protect your business against unexpected financial risks involving property, liability, operations, and other business-related exposures.',
    description: 'Protect your business against unexpected financial risks involving property, liability, operations, and other business-related exposures.',
    coverage: [
      'Property Insurance',
      'Fire Insurance',
      'Liability Insurance',
      'Business Interruption',
      'Commercial Vehicle Cover',
      'Employee-related Covers'
    ],
    cta: 'Explore Business Cover',
    ctaText: 'Explore Business Cover',
    icon: 'Briefcase',
    path: '/contact',
    badge: 'New',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop'
  },
  {
    id: 'pet',
    title: 'Pet Insurance',
    desc: 'Help manage unexpected veterinary and treatment expenses with suitable insurance protection for your pets.',
    description: 'Help manage unexpected veterinary and treatment expenses with suitable insurance protection for your pets.',
    coverage: [
      'Veterinary Expenses',
      'Accident Cover',
      'Illness Cover',
      'Surgery',
      'Hospitalization',
      'Optional Add-ons'
    ],
    cta: 'Explore Pet Insurance',
    ctaText: 'Explore Pet Insurance',
    icon: 'Dog',
    path: '/pet',
    badge: 'Pet Cover',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop'
  }
];

export const STATS = [
  { value: 50, suffix: 'L+', label: 'Customers Compared' },
  { value: 10, suffix: 'L+', label: 'Policy Holders' },
  { value: 25, suffix: '+', label: 'Insurance Partners' },
  { value: 99.2, suffix: '%', label: 'Claims Settled' }
];

export const WHY_CHOOSE_US = [
  {
    title: 'Lowest Premium Guaranteed',
    desc: 'Get direct-to-customer pricing with zero commissions and maximum discounts.',
    icon: 'Percent'
  },
  {
    title: 'Cashless Network Hospitals',
    desc: 'Access paperless treatments at 10,000+ top-rated hospitals across India.',
    icon: 'Hospital'
  },
  {
    title: 'Instant Quotes & Policy',
    desc: 'Fill minor details and get your policy instantly in your inbox without delays.',
    icon: 'Zap'
  },
  {
    title: '99.2% Claim Settlement',
    desc: 'Our dedicated claims relations team is available 24/7 to guide you through approval.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Expert Unbiased Advisor',
    desc: 'Consult certified health specialists who guide you with zero sales-pushy behavior.',
    icon: 'Headphones'
  },
  {
    title: 'Zero Hidden Charges',
    desc: 'Complete transparency with itemized premium pricing. Pay what you see.',
    icon: 'Eye'
  }
];
