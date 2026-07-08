import React from 'react';
import * as Icons from 'lucide-react';

/**
 * Reusable Feature / Benefit Card with dynamic icon loader
 * @param {Object} props
 * @param {string} props.title - Title of the benefit
 * @param {string} props.desc - Detailed description
 * @param {string} props.iconName - Name of the Lucide Icon (e.g. 'Percent', 'Hospital')
 */
const FeatureCard = ({ title, desc, iconName }) => {
  // Resolve Lucide Icon dynamically
  const IconComponent = Icons[iconName] || Icons.HelpCircle;

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 hover-card-effect relative group overflow-hidden">
      {/* Accent glow on hover */}
      <div className="absolute top-0 left-0 w-2 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="w-12 h-12 rounded-2xl bg-primary/5 group-hover:bg-primary text-primary group-hover:text-white flex items-center justify-center transition-all duration-300 mb-5">
        <IconComponent className="w-6 h-6" />
      </div>

      <h3 className="font-display font-bold text-dark text-lg mb-2">
        {title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
};

export default FeatureCard;
