import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap.js';
import { useScrollStore } from '../store/useScrollStore.js';

// Virtual scroll hook. Returns a ref whose .current is a float
// representing the carousel pointer (slots advanced).
// Wheel/touch events are captured (preventDefault) and accumulated;
// a critically damped lerp eases the pointer toward the target each frame.
export const useVirtualScroll = ({ totalSlots, sensitivity = 0.0025, smoothing = 0.08 } = {}) => {
  const pointerRef = useRef(0);
  const targetRef = useRef(0);
  const scrollTimeoutRef = useRef(null);

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

    const onTouchMove = (e) => {
      e.preventDefault();
      markScrolling();
    };

    const onTick = (time, deltaTime) => {
      const dt = Math.min(deltaTime, 100) / (1000 / 60);
      const factor = 1 - Math.pow(1 - smoothing, dt);
      pointerRef.current += (targetRef.current - pointerRef.current) * factor;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    gsap.ticker.add(onTick);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchmove', onTouchMove);
      gsap.ticker.remove(onTick);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, [totalSlots, sensitivity, smoothing]);

  return pointerRef;
};
