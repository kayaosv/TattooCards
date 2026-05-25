import { useEffect, useState } from 'react';
import { Cursor } from './components/Cursor.jsx';
import { ArtistsSection } from './sections/ArtistsSection.jsx';
import { ArtistsSectionMobile } from './sections/ArtistsSectionMobile.jsx';

const matches = (q) =>
  typeof window !== 'undefined' && window.matchMedia(q).matches;

const useMedia = (query) => {
  const [v, setV] = useState(() => matches(query));
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setV(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return v;
};

export const App = () => {
  const isDesktop = useMedia('(min-width: 1024px)');
  const reducedMotion = useMedia('(prefers-reduced-motion: reduce)');
  const showDesktop = isDesktop && !reducedMotion;

  return (
    <>
      {showDesktop && <Cursor />}
      <main className="w-screen min-h-screen bg-white">
        {showDesktop ? <ArtistsSection /> : <ArtistsSectionMobile />}
      </main>
    </>
  );
};
