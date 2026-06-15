import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap.js';
import { useScrollStore } from '../store/useScrollStore.js';

// Virtual scroll hook. Returns a ref whose .current is a float
// representing the carousel pointer (slots advanced).
// Wheel/touch events are captured (preventDefault) and accumulated;
// a critically damped lerp eases the pointer toward the target each frame.
export const useVirtualScroll = ({ totalSlots, sensitivity = 0.0025, smoothing = 0.08, initialPointer = 0 } = {}) => {
  const pointerRef = useRef(initialPointer);
  const targetRef = useRef(initialPointer);
  const scrollTimeoutRef = useRef(null);
  const touchYRef = useRef(0);

  useEffect(() => {
    const markScrolling = () => {
      if (!useScrollStore.getState().isScrolling) {
        useScrollStore.getState().setScrolling(true);
      }
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        useScrollStore.getState().setScrolling(false);
      }, 250);
    };

    const onWheel = (e) => {
      e.preventDefault();
      targetRef.current += e.deltaY * sensitivity;
      if (Math.abs(targetRef.current) > totalSlots * 1000) {
        targetRef.current = targetRef.current % totalSlots;
        pointerRef.current = pointerRef.current % totalSlots;
      }
      markScrolling();
    };

    const onTouchStart = (e) => {
      touchYRef.current = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      e.preventDefault();
      const dy = e.touches[0].clientY - touchYRef.current;
      touchYRef.current = e.touches[0].clientY;
      // Swipe up = advance carousel (positive target), multiply by 3 for touch feel
      targetRef.current -= dy * sensitivity * 3;
      markScrolling();
    };

    const onTick = (time, deltaTime) => {
      const dt = Math.min(deltaTime, 100) / (1000 / 60);
      const factor = 1 - Math.pow(1 - smoothing, dt);
      pointerRef.current += (targetRef.current - pointerRef.current) * factor;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    gsap.ticker.add(onTick);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      gsap.ticker.remove(onTick);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, [totalSlots, sensitivity, smoothing]);

  return pointerRef;
};
