import React from 'react';
import { MapPin, Star, ShieldCheck, Heart } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { redirectToWhatsApp } from '../../utils/whatsapp';

/**
 * Hospital Card displaying network cashless empanelled clinics
 */
const HospitalCard = ({ hospital }) => {
  const handleCheckCashless = () => {
    redirectToWhatsApp('hospital', {
      hospitalName: hospital.name,
      city: hospital.city,
      insurers: hospital.insurers.join(', ')
    });
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-5 hover-card-effect flex flex-col justify-between h-full relative group">
      
      {/* Favorite heart icon indicator on top-right */}
      <button className="absolute top-4 right-4 p-2 rounded-full bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition cursor-pointer" aria-label="Save hospital">
        <Heart className="w-4 h-4" />
      </button>

      <div>
        {/* Rating and Cashless Badges */}
        <div className="flex items-center gap-2 mb-3.5">
          <span className="inline-flex items-center gap-0.5 bg-amber-500/10 border border-amber-500/25 text-amber-600 font-bold text-[11px] px-2 py-0.5 rounded-lg">
            <Star className="w-3 h-3 fill-amber-600" />
            {hospital.rating}
          </span>
          {hospital.cashless && (
            <span className="inline-flex items-center gap-0.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 font-bold text-[11px] px-2 py-0.5 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5" />
              Cashless Approved
            </span>
          )}
        </div>

        {/* Hospital Name & Location Address */}
        <h3 className="font-display font-bold text-dark text-base md:text-lg group-hover:text-primary transition-colors leading-tight mb-2.5">
          {hospital.name}
        </h3>

        <div className="flex items-start gap-2 text-xs text-slate-500 mb-5 leading-relaxed">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span>{hospital.address}</span>
        </div>

        {/* Insurers list slab */}
        <div className="border-t border-slate-100 pt-4 mb-5">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">
            Accepted Insurers ({hospital.insurers.length})
          </span>
          <div className="flex flex-wrap gap-1.5">
            {hospital.insurers.map((ins, idx) => (
              <span
                key={idx}
                className="text-[10px] font-semibold bg-slate-100/75 border border-slate-200/50 rounded-lg px-2 py-1 text-slate-600"
              >
                {ins}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 border-t border-slate-100/50 pt-4 mt-2">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.name + ' ' + hospital.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-2.5 rounded-xl border border-slate-200 hover:border-primary hover:bg-slate-50 text-slate-600 hover:text-primary font-semibold text-xs transition cursor-pointer"
        >
          View Map
        </a>
        <button
          onClick={handleCheckCashless}
          className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/10 transition cursor-pointer"
        >
          <FaWhatsapp className="w-3.5 h-3.5" />
          Verify Cashless
        </button>
      </div>
    </div>
  );
};

export default HospitalCard;
