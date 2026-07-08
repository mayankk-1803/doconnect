import React from 'react';
import SEO from '../../components/common/SEO';
import Hero from '../../sections/Hero';
import Partners from '../../sections/Partners';
import Stats from '../../sections/Stats';
import Categories from '../../sections/Categories';
import WhyChooseUs from '../../sections/WhyChooseUs';
import PopularPlans from '../../sections/PopularPlans';
import Calculator from '../../sections/Calculator';
import Timeline from '../../sections/Timeline';
import Testimonials from '../../sections/Testimonials';
import BlogsSection from '../../sections/BlogsSection';
import FaqSection from '../../sections/FaqSection';
import CtaSection from '../../sections/CtaSection';

const Home = () => {
  return (
    <>
      <SEO
        title="Secure and Compare Health Insurance Plans"
        description="Compare 100+ health insurance plans from India's top insurers. Enjoy instant cashless approvals, tax savings under Section 80D, and 24/7 expert advice."
        keywords="health insurance comparison, buy health insurance online, cashless network hospitals, tax saving under 80D, securehealth"
        path=""
      />
      
      {/* Homepage Sections */}
      <Hero />
      <Categories />
      <Partners />
      <Stats />
      <WhyChooseUs />
      <PopularPlans />
      <Calculator />
      <Timeline />
      <Testimonials />
      <BlogsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
};

export default Home;
