import React, { forwardRef } from 'react';

/**
 * Modern Premium Select Field (Stripe/Linear style)
 */
const SelectField = forwardRef(({
  label,
  error,
  id,
  options = [],
  placeholder = 'Select an option',
  className = '',
  required = false,
  ...rest
}, ref) => {
  return (
    <div className="flex flex-col w-full text-left">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block select-none"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        aria-invalid={error ? 'true' : 'false'}
        className={`w-full px-4 py-3.5 rounded-xl border bg-white text-dark font-sans text-base transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary ${
          error
            ? 'border-rose-300 focus:ring-rose-100 focus:border-rose-400'
            : 'border-slate-200 hover:border-slate-300'
        } ${className}`}
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-xs font-bold text-rose-500 mt-1.5 ml-1">
          {error.message || 'This field is required'}
        </span>
      )}
    </div>
  );
});

SelectField.displayName = 'SelectField';

export default SelectField;
