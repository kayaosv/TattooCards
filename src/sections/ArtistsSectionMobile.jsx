import { ARTISTS, CARD_SLOTS } from '../data/artists.js';

const ARTIST_BY_ID = Object.fromEntries(ARTISTS.map((a) => [a.id, a]));

export const ArtistsSectionMobile = () => {
  return (
    <section className="relative w-full bg-white text-black" style={{ minHeight: '100dvh' }}>
      <div className="px-5 pt-10 pb-6">
        <h2
          className="font-display font-black uppercase leading-[0.85]"
          style={{ fontSize: 'clamp(3rem, 12vw, 6rem)' }}
        >
          Our<br />Artists
        </h2>
        <p className="font-display font-bold mt-3 text-sm leading-snug max-w-[28ch]">
          Tattoo Studio crafting permanent stories since MMXXVI.
        </p>
      </div>

      {/* Horizontal snap carousel — portrait cards (3:4) show the work at its best */}
      <div
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pl-5 pr-5 pb-10"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {CARD_SLOTS.map((card) => {
          const artist = ARTIST_BY_ID[card.artistId];
          return (
            <article
              key={card.id}
              className="relative shrink-0 snap-center overflow-hidden rounded-sm"
              style={{ width: 'min(72vw, 320px)', aspectRatio: '3/4' }}
            >
              <img
                src={card.imageUrl}
                alt={`Work by ${artist.name}`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 flex flex-col justify-end p-4"
                style={{ background: `linear-gradient(to top, ${artist.accentColor}F0 0%, ${artist.accentColor}80 40%, transparent 70%)` }}
              >
                <div className="font-display font-black uppercase text-white leading-none mb-1"
                  style={{ fontSize: 'clamp(1.3rem, 5vw, 1.75rem)' }}>
                  {artist.name}
                </div>
                <div className="font-mono text-white/80 text-[10px] uppercase tracking-widest mb-2">
                  ({artist.alias})
                </div>
                <div className="h-px bg-white/60 mb-2" />
                <div className="font-body text-white uppercase tracking-wider text-[11px]">
                  {artist.specialty}
                </div>
                <div className="font-mono text-white/70 text-[10px] mt-1">
                  {artist.yearsActive} years · {artist.instagram}
                </div>
              </div>
            </article>
          );
        })}
        {/* Trailing spacer so last card snaps with left margin */}
        <div className="shrink-0 w-1" aria-hidden="true" />
      </div>

      {/* Scroll hint */}
      <div className="flex justify-center pb-6 gap-1.5" aria-hidden="true">
        {CARD_SLOTS.slice(0, 5).map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-black/20" />
        ))}
      </div>
    </section>
  );
};
