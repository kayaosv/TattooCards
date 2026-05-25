// Mock data for 8 artists × 6 works = 48 unique tattoo card slots.
// Image pool is a curated set of Unsplash photo IDs, all manually picked
// from `tattoo`, `tattoo-artist`, `blackwork-tattoo` and `tattoo-arm`
// searches and HEAD-verified to return 200 on the public CDN.
//
// Switched away from loremflickr (FASE 7) because some returned Flickr
// images had baked-in photographer watermarks / red borders.

const u = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

const TATTOO_POOL = [
  '1568515045052-f9a854d70bfd',
  '1597852075234-fd721ac361d3',
  '1598371839696-5c5bb00bdc28',
  '1605647533135-51b5906087d0',
  '1552627019-947c3789ffb5',
  '1565058379802-bbe93b2f703a',
  '1542727365-19732a80dcfd',
  '1564426622559-5af68da63b96',
  '1562962230-16e4623d36e6',
  '1562379825-415aea84ebcf',
  '1586243287039-23f4c8e2e7ab',
  '1531951829979-d658d7e5e8a6',
  '1516008684536-605574d804ce',
  '1601848714157-d845bb5c11ff',
  '1583213261205-63258746ed4c',
  '1650783756107-739513b38177',
  '1616879564267-a336232e3a95',
  '1485463598028-44d6c47bf23f',
  '1627458514257-41d0ea46e326',
  '1479767574301-a01c78234a0c',
  '1513078094721-e7b6e0394a6a',
  '1662753361921-e6784e43f88b',
  '1561377455-190afb395ed7',
  '1561491040-14a86bca9106',
  '1557130641-1b14718f096a',
  '1557130680-6a87a704ac0b',
  '1691048539876-b172790bb66c',
  '1571434305870-0621521af411',
  '1556807215-f47c31a66ac2',
  '1556807166-18a5c02aa7c4',
  '1680011200206-1dd6726e8f32',
  '1557130680-0f816eef4743',
  '1611501275019-9b5cda994e8d',
  '1581833971358-2c8b550f87b3',
  '1565098772267-60af42b81ef2',
  '1583743089695-4b816a340f82',
  '1517649763962-0c623066013b',
  '1517466787929-bc90951d0974',
  '1593989716762-392976e5340f',
  '1543244128-30d70d41e2a9',
  '1635527948959-1b47e7903cb9',
  '1610942933193-8fafd0973f6d',
  '1667586340943-8bbc65afb845',
  '1634958086072-9afdf5531b27',
  '1611763123076-b4277e3d8e24',
  '1576904394143-8cfeacabde55',
  '1523505706581-ebcc99ba63cf',
  '1686216464646-0aff8f6aa7af',
  '1759247943688-5d47a84dd615',
  '1753259669126-660f46975072',
  '1753260814170-9f77d48c016e',
];

// Deterministic 6-work slice per artist. Stride of 6 means no overlap between
// adjacent artists; pool length (51) > 8 × 6 = 48 so every slot is unique.
const worksFor = (offset, count = 6) =>
  Array.from({ length: count }, (_, i) => u(TATTOO_POOL[(offset + i) % TATTOO_POOL.length]));

export const ARTISTS = [
  {
    id: 'kael',
    name: 'Kael Rivera',
    alias: 'BLACKFIN',
    specialty: 'Blackwork & Geometric',
    yearsActive: 8,
    instagram: '@blackfin.ink',
    accentColor: '#0A0A0A',
    works: worksFor(0),
  },
  {
    id: 'mira',
    name: 'Mira Solé',
    alias: 'NEONHEART',
    specialty: 'Neo-traditional',
    yearsActive: 6,
    instagram: '@neonheart.tattoo',
    accentColor: '#B11515',
    works: worksFor(6),
  },
  {
    id: 'iko',
    name: 'Iko Tanaka',
    alias: 'GHOSTHAND',
    specialty: 'Japanese Irezumi',
    yearsActive: 12,
    instagram: '@ghosthand.irezumi',
    accentColor: '#1A2B5C',
    works: worksFor(12),
  },
  {
    id: 'sade',
    name: 'Sade Okafor',
    alias: 'FINELINE',
    specialty: 'Fineline & Micro',
    yearsActive: 5,
    instagram: '@sade.fineline',
    accentColor: '#7A6A50',
    works: worksFor(18),
  },
  {
    id: 'arlo',
    name: 'Arlo Vance',
    alias: 'HYPERREAL',
    specialty: 'Realism & Portrait',
    yearsActive: 10,
    instagram: '@arlo.hyperreal',
    accentColor: '#3D2A1A',
    works: worksFor(24),
  },
  {
    id: 'noor',
    name: 'Noor Halabi',
    alias: 'AXIS',
    specialty: 'Sacred Geometry',
    yearsActive: 7,
    instagram: '@axis.studio',
    accentColor: '#0E3A4F',
    works: worksFor(30),
  },
  {
    id: 'vex',
    name: 'Vex Lambert',
    alias: 'TYPEMACHINE',
    specialty: 'Lettering & Script',
    yearsActive: 9,
    instagram: '@typemachine',
    accentColor: '#202020',
    works: worksFor(36),
  },
  {
    id: 'rune',
    name: 'Rune Halvorsen',
    alias: 'BLEEDING_INK',
    specialty: 'Watercolor & Abstract',
    yearsActive: 6,
    instagram: '@bleeding.ink',
    accentColor: '#A23B6C',
    works: worksFor(42),
  },
];

// Flattened linear queue of card slots feeding the carousel.
export const CARD_SLOTS = ARTISTS.flatMap((a) =>
  a.works.map((url, i) => ({
    id: `${a.id}-${i}`,
    artistId: a.id,
    imageUrl: url,
  })),
);
