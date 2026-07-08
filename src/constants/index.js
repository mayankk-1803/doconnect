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
    path: '/life', // Will resolve to general life description or WhatsApp consult
    hasDropdown: true,
    dropdownItems: [
      { label: 'Term Insurance', path: '/life' },
      { label: 'Investment Plans', path: '/life' },
      { label: 'Pension Plans', path: '/life' }
    ]
  },
  {
    label: 'Motor',
    path: '/motor',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Car Insurance', path: '/motor' },
      { label: 'Bike Insurance', path: '/motor' },
      { label: 'Commercial Vehicle', path: '/motor' }
    ]
  },
  { label: 'Travel', path: '/travel' },
  { label: 'Pet Insurance', path: '/pet' },
  { label: 'Contact', path: '/contact' },
  { label: 'Login', path: '#login', isButton: true }
];

export const CATEGORIES = [
  { id: 'health', title: 'Health Insurance', icon: 'Shield', path: '/health-insurance', ctaText: 'Health Plan' },
  { id: 'life', title: 'Life Insurance', icon: 'Heart', path: '/life', ctaText: 'Life Plan' },
  { id: 'motor', title: 'Motor Insurance', icon: 'Car', path: '/motor', ctaText: 'Car Plan' },
  { id: 'travel', title: 'Travel Insurance', icon: 'Plane', path: '/travel', ctaText: 'Travel Plan' },
  { id: 'pet', title: 'Pet Insurance', icon: 'PawPrint', path: '/pet', ctaText: 'Pet Insurance' }
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
