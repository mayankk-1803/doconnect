import React from 'react';
import { Star, Quote } from 'lucide-react';

/**
 * Reusable Testimonial Card for Slider Carousel
 */
const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white border border-slate-100/80 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition relative flex flex-col justify-between h-full group select-none">
      
      {/* Absolute Quote Mark Indicator */}
      <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-100 group-hover:text-primary/10 transition-colors" />

      <div>
        {/* Stars */}
        <div className="flex items-center gap-0.5 text-amber-400 mb-5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4.5 h-4.5 ${
                i < Math.floor(testimonial.rating) ? 'fill-amber-400' : 'text-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Review comment */}
        <p className="text-slate-600 italic text-sm md:text-base leading-relaxed mb-6 relative z-10">
          "{testimonial.review}"
        </p>
      </div>

      {/* User Profile Info */}
      <div className="flex items-center gap-3.5 border-t border-slate-100/60 pt-5 mt-auto">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          loading="lazy"
          className="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0"
        />
        <div>
          <h4 className="font-display font-bold text-dark text-sm leading-tight">
            {testimonial.name}
          </h4>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mt-0.5">
            {testimonial.profession}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
