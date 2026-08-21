import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import testimonialsData from '../data/testimonials.json';
import TestimonialCard from '../components/cards/TestimonialCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = () => {
  return (
    <section className="py-[60px] md:py-[90px] lg:py-[120px] bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full">
            Customer Love
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-dark mt-4">
            What Our Customers Say About Us
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-3 leading-relaxed">
            Read stories of how we helped real people choose their health coverage and assisted them through hospital approvals.
          </p>
        </div>

        {/* Swiper Carousel */}
        <div className="relative pb-12">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              }
            }}
            className="swiper-container"
          >
            {testimonialsData.map((test) => (
              <SwiperSlide key={test.id} className="h-auto">
                <TestimonialCard testimonial={test} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
