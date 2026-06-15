export const Headline = () => {
  return (
    <>
      <div
        className="fat font-display font-black uppercase select-none"
        style={{
          fontSize: 'clamp(58px, 14.4vw, 207px)',
          lineHeight: '0.8em',
          letterSpacing: 'normal',
          height: '0.9em',
        }}
      >
        OUR
      </div>
      <div
        className="fat snd font-display font-black uppercase select-none"
        style={{
          fontSize: 'clamp(58px, 14.4vw, 207px)',
          lineHeight: '0.8em',
          letterSpacing: 'normal',
          height: '0.9em',
          marginTop: '-0.15em',
        }}
      >
        ARTISTS
      </div>
    </>
  );
};
