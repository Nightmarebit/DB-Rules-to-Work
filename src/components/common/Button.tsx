import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'md' | 'lg';
  fullWidth?: boolean;
}

const variants = {
  primary:
    'bg-db-red text-white hover:bg-db-red/90 focus:ring-db-red active:bg-db-red/80',
  secondary:
    'bg-db-gray-700 text-db-light hover:bg-db-gray-600 focus:ring-db-gray-500',
  ghost:
    'bg-transparent text-db-light hover:bg-db-gray-800 focus:ring-db-gray-600',
  danger:
    'bg-db-red/20 text-db-red hover:bg-db-red/30 focus:ring-db-red',
};

const sizes = {
  md: 'min-h-[48px] min-w-[48px] px-4 py-3 text-base',
  lg: 'min-h-[56px] min-w-[56px] px-6 py-4 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'lg',
      fullWidth,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-db-dark disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    />
  )
);

Button.displayName = 'Button';
