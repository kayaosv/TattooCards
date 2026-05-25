import { useEffect, useRef } from 'react';
import { ARTISTS, CARD_SLOTS } from '../data/artists.js';
import { VISIBLE_SLOTS } from './dimensions.js';
import { getCardLayoutFractional } from './layout.js';
import { getViewportScale } from './scale.js';
import { useVirtualScroll } from '../hooks/useVirtualScroll.js';
import { useGSAP, gsap } from '../lib/gsap.js';
import { ArtistCard } from '../components/ArtistCard.jsx';

const TOTAL = CARD_SLOTS.length;
const ARTIST_BY_ID = Object.fromEntries(ARTISTS.map((a) => [a.id, a]));

export const Carousel = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const scaleRef = useRef(typeof window !== 'undefined' ? getViewportScale(window.innerWidth, window.innerHeight) : 1);
  const pointerRef = useVirtualScroll({ totalSlots: TOTAL });

  useEffect(() => {
    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        scaleRef.current = getViewportScale(window.innerWidth, window.innerHeight);
      }, 200);
    };
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); clearTimeout(t); };
  }, []);

  useGSAP(() => {
    const onTick = () => {
      const P = pointerRef.current;
      const s = scaleRef.current;

      for (let i = 0; i < TOTAL; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        const rel = ((i - P) % TOTAL + TOTAL) % TOTAL;

        if (rel < VISIBLE_SLOTS) {
          const layout = getCardLayoutFractional(rel);
          el.style.width = `${layout.w * s}px`;
          el.style.height = `${layout.h * s}px`;
          el.style.transform = `translate3d(${(layout.x + layout.tx) * s}px, ${layout.y * s}px, 0)`;
          el.style.zIndex = String(Math.round(1000 - Math.abs(rel - 6) * 10));
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
