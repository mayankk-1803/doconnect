import React, { forwardRef } from 'react';

/**
 * Reusable form textarea input
 */
const TextareaField = forwardRef(({
  label,
  error,
  id,
  placeholder = '',
  rows = 4,
  className = '',
  required = false,
  ...rest
}, ref) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-xs font-bold text-slate-700 uppercase tracking-wide">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : 'false'}
        className={`w-full px-4 py-3 rounded-2xl border bg-white text-dark font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400 resize-none ${
          error ? 'border-rose-400 focus:ring-rose-200 focus:border-rose-400' : 'border-slate-200'
        } ${className}`}
        {...rest}
      />
      {error && (
        <span className="text-xs font-semibold text-rose-500 mt-0.5 ml-1">
          {error.message || 'This field is required'}
        </span>
      )}
    </div>
  );
});

TextareaField.displayName = 'TextareaField';

export default TextareaField;
