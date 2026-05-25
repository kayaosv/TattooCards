import { useRef } from 'react';
import { useGSAP, gsap } from '../lib/gsap.js';
import { useCursorStore } from '../store/useCursorStore.js';

export const Cursor = () => {
  const rootRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const variant = useCursorStore((s) => s.variant);

  useGSAP(() => {
    const xTo = gsap.quickTo(rootRef.current, 'x', { duration: 0.35, ease: 'power3' });
    const yTo = gsap.quickTo(rootRef.current, 'y', { duration: 0.35, ease: 'power3' });

    const onMove = (e) => { xTo(e.clientX); yTo(e.clientY); };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, { scope: rootRef });

  useGSAP(() => {
    const tl = gsap.timeline();
    if (variant === 'card') {
      tl.to(dotRef.current, { scale: 0, autoAlpha: 0, duration: 0.2 }, 0)
        .to(ringRef.current, { scale: 1, autoAlpha: 1, duration: 0.4, ease: 'expo.out' }, 0)
        .to(labelRef.current, { autoAlpha: 1, duration: 0.3 }, 0.15);
    } else {
      tl.to(ringRef.current, { scale: 0, autoAlpha: 0, duration: 0.3, ease: 'expo.out' }, 0)
        .to(labelRef.current, { autoAlpha: 0, duration: 0.15 }, 0)
        .to(dotRef.current, { scale: 1, autoAlpha: 1, duration: 0.2 }, 0.1);
    }
  }, { dependencies: [variant], scope: rootRef });

  return (
    <div
      ref={rootRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
      style={{ transform: 'translate3d(0,0,0)' }}
    >
      <div
        ref={dotRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black"
      />
      <div
        ref={ringRef}
        className="absolute w-20 h-20 rounded-full bg-white mix-blend-difference flex items-center justify-center"
        style={{ opacity: 0, transform: 'translate(-50%,-50%) scale(0)' }}
      >
        <span
          ref={labelRef}
          className="font-mono text-xs uppercase tracking-widest text-black"
          style={{ opacity: 0 }}
        >
          View
        </span>
      </div>
    </div>
  );
};
