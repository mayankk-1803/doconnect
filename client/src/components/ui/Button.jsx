import React from 'react';

/**
 * Reusable premium button component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button label / content
 * @param {string} [props.variant] - Button color variant ('primary', 'secondary', 'accent', 'outline', 'ghost')
 * @param {string} [props.size] - Button sizing ('sm', 'md', 'lg')
 * @param {boolean} [props.fullWidth] - Should expand to fill parent container
 * @param {boolean} [props.gradient] - Enable subtle gradient background
 * @param {string} [props.className] - Override CSS classes
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} [props.rest] - Additional native HTML button elements
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  gradient = true,
  className = '',
  ...rest
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 transform active:scale-[0.98] select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2';
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  };

  const variants = {
    primary: gradient 
      ? 'btn-gradient-primary shadow-md shadow-primary/10' 
      : 'bg-primary hover:bg-primary-dark text-white shadow-md shadow-primary/10',
    secondary: gradient 
      ? 'btn-gradient-secondary shadow-md shadow-secondary/10' 
      : 'bg-secondary hover:bg-secondary-dark text-white shadow-md shadow-secondary/10',
    accent: gradient 
      ? 'btn-gradient-accent shadow-md shadow-accent/10' 
      : 'bg-accent hover:bg-primary text-white shadow-md shadow-accent/10',
    outline: 'border border-slate-200 hover:border-primary hover:bg-slate-50 text-slate-700 hover:text-primary',
    ghost: 'hover:bg-slate-50 text-slate-600 hover:text-primary'
  };

  const widthStyle = fullWidth ? 'w-full flex' : '';

  return (
    <button
      className={`${baseStyle} ${sizeStyles[size]} ${variants[variant]} ${widthStyle} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
