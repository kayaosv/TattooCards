export const CardOverlay = ({ artist, overlayRef, lineRef, textRefs, open }) => {
  return (
    <div
      ref={overlayRef}
      aria-hidden={!open}
      className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none"
      style={{
        background: `linear-gradient(to top, ${artist.accentColor}E6 0%, ${artist.accentColor}80 40%, transparent 80%)`,
        opacity: 0,
        visibility: 'hidden',
      }}
    >
      <div className="overflow-hidden mb-2">
        <div
          ref={(el) => { textRefs.current[0] = el; }}
          className="font-display font-black text-white uppercase leading-none"
          style={{ fontSize: 'clamp(28px, 3vw, 48px)' }}
        >
          {artist.name}
        </div>
      </div>

      <div className="overflow-hidden mb-3">
        <div
          ref={(el) => { textRefs.current[1] = el; }}
          className="font-mono text-white/80 text-xs uppercase tracking-widest"
        >
          ({artist.alias})
        </div>
      </div>

      <div
        ref={lineRef}
        className="h-px bg-white/90 mb-3"
        style={{ transformOrigin: 'left center' }}
      />

      <div className="overflow-hidden mb-1">
        <div
          ref={(el) => { textRefs.current[2] = el; }}
          className="font-body text-white uppercase tracking-wider text-sm"
        >
          {artist.specialty}
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          ref={(el) => { textRefs.current[3] = el; }}
          className="font-mono text-white/70 text-xs"
        >
          {artist.yearsActive} years · {artist.instagram}
        </div>
      </div>
    </div>
  );
};
