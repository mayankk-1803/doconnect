import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Reusable breadcrumb navigator
 * @param {Object} props
 * @param {Array} props.items - List of breadcrumb links [{ label: 'Name', path: '/path' }]
 */
const Breadcrumb = ({ items = [] }) => {
  return null;
  return (
    <nav className="flex items-center flex-wrap gap-1.5 text-xs font-semibold text-slate-500 py-3" aria-label="Breadcrumb">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-primary transition"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            {isLast ? (
              <span className="text-slate-400 font-medium truncate max-w-[180px]">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="hover:text-primary transition truncate max-w-[180px]"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
