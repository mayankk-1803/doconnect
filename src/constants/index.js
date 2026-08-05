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
  { label: 'Contact', path: '/contact' },
  { label: 'Login', path: '#login', isButton: true }
];

export const CATEGORIES = [
  { id: 'health', title: 'Health Insurance', icon: 'Shield', path: '/health-insurance', ctaText: 'Compare Health', badge: 'Popular', desc: 'Secure cashless treatments for your family at 10,000+ top hospitals.', image: 'https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop' },
  { id: 'car', title: 'Car Insurance', icon: 'Car', path: '/motor', ctaText: 'Get Car Quote', badge: 'Instant', desc: 'Protect your car against damage, theft, and third-party liabilities.', image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop' },
  { id: 'bike', title: 'Bike Insurance', icon: 'Bike', path: '/motor', ctaText: 'Get Bike Quote', badge: 'New', desc: 'Quick two-wheeler coverage with instant policy delivery online.', image: 'https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop' },
  { id: 'term', title: 'Term Insurance', icon: 'Clock', path: 'https://wa.me/917683098648?text=Hello%20DoConnect%2C%20I%20am%20interested%20in%20a%20Term%20Insurance%20plan.', ctaText: 'Check Cover', badge: 'High Cover', desc: 'High-value financial security for your loved ones at affordable premiums.', image: 'https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop' },
  { id: 'life', title: 'Life Insurance', icon: 'Heart', path: 'https://wa.me/917683098648?text=Hello%20DoConnect%2C%20I%20am%20interested%20in%20a%20Life%20Insurance%20plan.', ctaText: 'Consult Expert', badge: 'Tax Saving', desc: 'Life protection plans combined with wealth accumulation options.', image: 'https://images.pexels.com/photos/2253879/pexels-photo-2253879.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop' },
  { id: 'investment', title: 'Investment Plans', icon: 'Coins', path: 'https://wa.me/917683098648?text=Hello%20DoConnect%2C%20I%20am%20interested%20in%20an%20Investment%20Plan.', ctaText: 'Grow Wealth', badge: 'High Return', desc: 'Save for your major future milestones with tax-saving capital growth plans.', image: 'https://images.pexels.com/photos/1602726/pexels-photo-1602726.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop' },
  { id: 'travel', title: 'Travel Insurance', icon: 'Plane', path: '/travel', ctaText: 'Explore Travel', badge: 'Secure', desc: 'International travel cover protecting against medical emergencies & cancellations.', image: 'https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop' },
  { id: 'business', title: 'Business Insurance', icon: 'Briefcase', path: '/contact', ctaText: 'Get Quote', badge: 'New', desc: 'Custom liability and property covers for startups, shops, and enterprises.', image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop' }
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
