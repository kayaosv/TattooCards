import { useEffect, useRef } from 'react';
import { ARTISTS, CARD_SLOTS } from '../data/artists.js';
import { VISIBLE_SLOTS, VISIBLE_SLOTS_MOBILE } from './dimensions.js';
import { getCardLayoutFractional, getCardLayoutFractionalMobile } from './layout.js';
import { getViewportScale, IS_MOBILE_BREAKPOINT } from './scale.js';
import { useVirtualScroll } from '../hooks/useVirtualScroll.js';
import { useGSAP, gsap } from '../lib/gsap.js';
import { ArtistCard } from '../components/ArtistCard.jsx';

const TOTAL = CARD_SLOTS.length;
const ARTIST_BY_ID = Object.fromEntries(ARTISTS.map((a) => [a.id, a]));

const isMobileVw = () => typeof window !== 'undefined' && window.innerWidth < IS_MOBILE_BREAKPOINT;

export const Carousel = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const scaleRef = useRef(typeof window !== 'undefined' ? getViewportScale(window.innerWidth, window.innerHeight) : 1);
  const mobileRef = useRef(isMobileVw());
  const pointerRef = useVirtualScroll({ totalSlots: TOTAL });

  useEffect(() => {
    let t;
    const updateState = () => {
      scaleRef.current = getViewportScale(window.innerWidth, window.innerHeight);
      mobileRef.current = isMobileVw();
    };
    const onResize = () => { clearTimeout(t); t = setTimeout(updateState, 200); };
    const onVisibility = () => { if (!document.hidden) updateState(); };
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      clearTimeout(t);
    };
  }, []);

  useGSAP(() => {
    const onTick = () => {
      const P = pointerRef.current;
      const s = scaleRef.current;
      const mobile = mobileRef.current;
      const visibleSlots = mobile ? VISIBLE_SLOTS_MOBILE : VISIBLE_SLOTS;
      const getLayout = mobile ? getCardLayoutFractionalMobile : getCardLayoutFractional;
      // Mobile cone peaks at slot 4; desktop at slot 6
      const zPivot = mobile ? 4 : 6;

      for (let i = 0; i < TOTAL; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        const rel = ((i - P) % TOTAL + TOTAL) % TOTAL;

        if (rel < visibleSlots) {
          const layout = getLayout(rel);
          el.style.width = `${layout.w * s}px`;
          el.style.height = `${layout.h * s}px`;
          el.style.transform = `translate3d(${(layout.x + layout.tx) * s}px, ${layout.y * s}px, 0)`;
          el.style.zIndex = String(Math.round(1000 - Math.abs(rel - zPivot) * 10));
          el.style.visibility = 'visible';
          el.style.willChange = 'transform';
        } else {
          el.style.transform = 'translate3d(-3000px, 0, 0)';
          el.style.visibility = 'hidden';
          el.style.willChange = 'auto';
        }
      }
    };

    gsap.ticker.add(onTick);
    return () => gsap.ticker.remove(onTick);
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      data-carousel-root
    >
      {CARD_SLOTS.map((card, i) => (
        <ArtistCard
          key={card.id}
          slot={i}
          ref={(el) => { cardRefs.current[i] = el; }}
          imageUrl={card.imageUrl}
          artist={ARTIST_BY_ID[card.artistId]}
        />
      ))}
    </div>
  );
};
