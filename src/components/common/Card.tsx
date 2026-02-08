import { forwardRef } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'article' | 'section';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ as: Component = 'div', className = '', ...props }, ref) => (
    <Component
      ref={ref}
      className={`card rounded-xl border border-db-gray-700 bg-db-gray-800/50 shadow-lg ${className}`}
      {...props}
    />
  )
);

Card.displayName = 'Card';
