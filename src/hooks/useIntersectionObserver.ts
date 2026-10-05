import { useEffect, useRef, useState } from 'react';

export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  root = null,
  rootMargin = '0px 0px -40px 0px',
  freezeOnceVisible = true,
}: UseIntersectionObserverOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    // If reduced motion is preferred, immediately mark as visible
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsIntersecting(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    // Fallback if IntersectionObserver is not supported in the runtime
    if (!('IntersectionObserver' in window)) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (freezeOnceVisible) {
            observer.unobserve(node);
          }
        } else if (!freezeOnceVisible) {
          setIsIntersecting(false);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, freezeOnceVisible]);

  return { ref, isIntersecting };
}
