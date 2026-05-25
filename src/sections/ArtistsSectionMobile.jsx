import { ARTISTS, CARD_SLOTS } from '../data/artists.js';

const ARTIST_BY_ID = Object.fromEntries(ARTISTS.map((a) => [a.id, a]));

export const ArtistsSectionMobile = () => {
  return (
    <section className="relative w-full min-h-screen bg-white text-black">
      <div className="px-6 pt-12 pb-8">
        <h2
          className="font-display font-black uppercase leading-[0.85]"
          style={{ fontSize: 'clamp(4rem, 14vw, 8rem)' }}
        >
          Our<br />Artists
        </h2>
        <p className="font-display font-bold mt-4 text-base">
          Tattoo Studio crafting permanent stories since MMXXVI.
        </p>
      </div>

      <div
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-6 pb-12 no-scrollbar"
        style={{ scrollbarWidth: 'none' }}
      >
        {CARD_SLOTS.map((card) => {
          const artist = ARTIST_BY_ID[card.artistId];
          return (
            <article
              key={card.id}
              className="relative shrink-0 snap-center w-[78vw] aspect-[6/5] overflow-hidden"
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
                style={{ background: `linear-gradient(to top, ${artist.accentColor}E6, transparent 60%)` }}
              >
                <div className="font-display font-black uppercase text-white text-2xl leading-none mb-1">
                  {artist.name}
                </div>
                <div className="font-mono text-white/80 text-[10px] uppercase tracking-widest mb-2">
                  ({artist.alias})
                </div>
                <div className="h-px bg-white/80 mb-2" />
                <div className="font-body text-white uppercase tracking-wider text-xs">
                  {artist.specialty}
                </div>
                <div className="font-mono text-white/70 text-[10px] mt-1">
                  {artist.yearsActive} years · {artist.instagram}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
