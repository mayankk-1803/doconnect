import React, { forwardRef } from 'react';

/**
 * Modern Premium Input Field (Stripe/Linear style)
 */
const InputField = forwardRef(({
  label,
  error,
  id,
  type = 'text',
  placeholder = '',
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
      <input
        ref={ref}
        id={id}
        type={type}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : 'false'}
        className={`w-full px-4 py-3.5 rounded-xl border bg-white text-dark font-sans text-base transition-all duration-200 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary ${
          error
            ? 'border-rose-300 focus:ring-rose-100 focus:border-rose-400'
            : 'border-slate-200 hover:border-slate-300'
        } ${className}`}
        {...rest}
      />
      {error && (
        <span className="text-xs font-bold text-rose-500 mt-1.5 ml-1">
          {error.message || 'This field is required'}
        </span>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;
