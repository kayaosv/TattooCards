import { forwardRef, useRef, useState } from 'react';
import { useGSAP, gsap } from '../lib/gsap.js';
import { useCursorStore } from '../store/useCursorStore.js';
import { useScrollStore } from '../store/useScrollStore.js';
import { CardOverlay } from './CardOverlay.jsx';

export const ArtistCard = forwardRef(({ imageUrl, artist, slot }, ref) => {
  const imgRef = useRef(null);
  const overlayRef = useRef(null);
  const lineRef = useRef(null);
  const textRefs = useRef([]);
  const tlRef = useRef(null);
  const [open, setOpen] = useState(false);
  const setCursor = useCursorStore((s) => s.setVariant);

  useGSAP(() => {
    tlRef.current = gsap.timeline({ paused: true })
      .to(imgRef.current, { scale: 1.06, duration: 0.7, ease: 'expo.out' }, 0)
      .to(overlayRef.current, { autoAlpha: 1, duration: 0.4, ease: 'power2.out' }, 0)
      .fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.6, ease: 'expo.out' },
        0.05,
      )
      .fromTo(
        textRefs.current,
        { yPercent: 100, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.5, stagger: 0.06, ease: 'expo.out' },
        0.1,
      );
  }, { scope: ref });

  const play = () => {
    if (useScrollStore.getState().isScrolling) return;
    setOpen(true);
    tlRef.current?.play();
    setCursor('card', artist.id);
  };

  const reverse = () => {
    setOpen(false);
    tlRef.current?.reverse();
    setCursor('default');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open ? reverse() : play();
    } else if (e.key === 'Escape' && open) {
      reverse();
    }
  };

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={`${artist.name} — ${artist.specialty}`}
      aria-expanded={open}
      className="absolute top-0 left-0 pointer-events-auto overflow-hidden focus:outline-none"
      style={{
        width: '760px',
        height: '634px',
        transform: 'translate3d(-3000px, 0, 0)',
        visibility: 'hidden',
      }}
      data-slot={slot}
      data-artist={artist.id}
      onMouseEnter={play}
      onMouseLeave={reverse}
      onFocus={play}
      onBlur={reverse}
      onKeyDown={onKeyDown}
    >
      <img
        ref={imgRef}
        src={imageUrl}
        alt={`Work by ${artist.name}`}
        loading={slot < 8 ? 'eager' : 'lazy'}
        decoding="async"
        className="block w-full h-full object-cover select-none pointer-events-none will-change-transform"
        draggable={false}
      />
      <CardOverlay
        artist={artist}
        overlayRef={overlayRef}
        lineRef={lineRef}
        textRefs={textRefs}
        open={open}
      />
    </div>
  );
});

ArtistCard.displayName = 'ArtistCard';
