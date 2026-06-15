import { useEffect } from 'react';
import { Headline } from '../components/Headline.jsx';
import { Tagline } from '../components/Tagline.jsx';
import { Carousel } from '../carousel/Carousel.jsx';

export const ArtistsSection = () => {
  useEffect(() => {
    document.documentElement.classList.add('lock-scroll');
    return () => document.documentElement.classList.remove('lock-scroll');
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white text-black" style={{ height: '100dvh' }}>
      <Carousel />
      <div className="absolute top-[58px] left-[22px] w-[473px] z-10">
        <Headline />
        <Tagline />
      </div>
    </section>
  );
};
