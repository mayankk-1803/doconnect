import React from 'react';
import SEO from '../../components/common/SEO';
import Hero from '../../sections/Hero';
import Partners from '../../sections/Partners';
import WhyChooseUs from '../../sections/WhyChooseUs';
import Timeline from '../../sections/Timeline';
import Testimonials from '../../sections/Testimonials';
import FaqSection from '../../sections/FaqSection';
import CtaSection from '../../sections/CtaSection';
import { BRAND_CONFIG } from '../../constants';

const Home = () => {
  return (
    <>
      <SEO
        title={`${BRAND_CONFIG.name} | Compare & Buy Health, Motor, Life Insurance Plans`}
        description="Compare 100+ insurance plans from India's top insurers. Save tax under Section 80D, get instant cashless approvals, and unbiased expert consults."
        keywords="insurance comparison, buy health insurance online, car insurance, bike insurance, term insurance plans, doconnect"
        path=""
      />
      
      {/* Redesigned Premium Homepage Sections */}
      <Hero />
      <Partners />
      <WhyChooseUs />
      <Timeline />
      <Testimonials />
      <FaqSection />
      <CtaSection />
    </>
  );
};

export default Home;
