import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export type RevealVariant = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade-in' | 'zoom-in';

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number; // Delay in milliseconds
  duration?: number; // Duration in milliseconds
  distance?: number; // Initial displacement in px (default: 28)
  threshold?: number;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
  className?: string;
  as?: React.ElementType;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 750,
  distance = 28,
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  freezeOnceVisible = true,
  className = '',
  as: Component = 'div',
  style,
  ...restProps
}) => {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLElement>({
    threshold,
    rootMargin,
    freezeOnceVisible,
  });

  const getInitialTransform = () => {
    switch (variant) {
      case 'fade-up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'fade-down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'fade-left':
        return `translate3d(${distance}px, 0, 0)`;
      case 'fade-right':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'zoom-in':
        return 'scale(0.94)';
      case 'fade-in':
      default:
        return 'none';
    }
  };

  const animationStyle: React.CSSProperties = {
    opacity: isIntersecting ? 1 : 0,
    transform: isIntersecting ? 'translate3d(0, 0, 0) scale(1)' : getInitialTransform(),
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${delay}ms`,
    willChange: isIntersecting ? 'auto' : 'opacity, transform',
    ...style,
  };

  return (
    <Component
      ref={ref as any}
      style={animationStyle}
      className={className}
      {...restProps}
    >
      {children}
    </Component>
  );
};
