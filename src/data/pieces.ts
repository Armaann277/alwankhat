export type Piece = {
  slug: string;
  title: string;
  category: "Paintings" | "Calligraphy";
  price: number;
  sold: boolean;
  image: string;
  size: string;
  medium: string;
  year: string;
  story: string;
  featured?: boolean;
};

export const pieces: Piece[] = [
  {
    slug: "gulabi-raat",
    title: "Gulabi Raat",
    category: "Paintings",
    price: 6200,
    sold: false,
    image: "https://picsum.photos/seed/alwankhat-gulabi-raat/900/1125",
    size: '48 × 60 cm',
    medium: "Acrylic on canvas",
    year: "2026",
    featured: true,
    story:
      "A slow evening spilled in rose. Layers of blush and umber overlap like hours folding into one another, and a single gold thread of light holds the whole garden together.",
  },
  {
    slug: "alif",
    title: "Alif — The First Letter",
    category: "Calligraphy",
    price: 8400,
    sold: true,
    image: "https://picsum.photos/seed/alwankhat-alif/900/1125",
    size: '36 × 48 cm',
    medium: "Ink and gold leaf on handmade paper",
    year: "2025",
    featured: true,
    story:
      "One upright stroke, every different branch of meaning drawn from it. Commissioned by a collector in Hyderabad, drawn in a single evening while it rained.",
  },
  {
    slug: "gulon-mein",
    title: "Gulon Mein",
    category: "Paintings",
    price: 5900,
    sold: false,
    image: "https://picsum.photos/seed/alwankhat-gulon-mein/900/1125",
    size: '40 × 50 cm',
    medium: "Oil on canvas",
    year: "2026",
    story:
      "Roses that bloom below the surface of the paint — the kind that only show when the light comes from the side, early in the morning.",
  },
  {
    slug: "bismillah-in-gold",
    title: "Bismillah in Gold",
    category: "Calligraphy",
    price: 12000,
    sold: true,
    image: "https://picsum.photos/seed/alwankhat-bismillah-gold/900/1125",
    size: '60 × 90 cm',
    medium: "Gold leaf and pigment on cotton rag",
    year: "2024",
    story:
      "Every letter drawn in raised gold over a deep rose ground. Made for a wedding gift; the couple kept it, and we understood.",
  },
  {
    slug: "chandni-chowk-sunset",
    title: "Chandni Chowk Sunset",
    category: "Paintings",
    price: 7400,
    sold: false,
    image: "https://picsum.photos/seed/alwankhat-chandni-sunset/900/1125",
    size: '50 × 60 cm',
    medium: "Acrylic on canvas",
    year: "2025",
    story:
      "The street at the exact minute it turns gold. Warm brick, wailing rikshaws, and a sky that refuses to leave.",
  },
  {
    slug: "la-ilaha-illallah",
    title: "La ilaha illallah",
    category: "Calligraphy",
    price: 9800,
    sold: false,
    image: "https://picsum.photos/seed/alwankhat-shahada/900/1125",
    size: '54 × 72 cm',
    medium: "Ink on textured paper",
    year: "2025",
    story:
      "Calligraphy that asks to be read slowly. The letters recede, then return — a sentence you carry with you after the canvas is out of sight.",
  },
  {
    slug: "vasudha",
    title: "Vasudha — Earth",
    category: "Paintings",
    price: 5200,
    sold: false,
    image: "https://picsum.photos/seed/alwankhat-vasudha/900/1125",
    size: '38 × 46 cm',
    medium: "Acrylic and rice paper collage",
    year: "2026",
    story:
      "A quiet landscape built from torn paper and earth pigments, held together by one long continuous line from corner to corner.",
  },
  {
    slug: "noor",
    title: "Noor — Light",
    category: "Calligraphy",
    price: 6800,
    sold: false,
    image: "https://picsum.photos/seed/alwankhat-noor/900/1125",
    size: '42 × 56 cm',
    medium: "Ink and luminous wash",
    year: "2026",
    featured: true,
    story:
      "Light drawn as a single breath. The word emerges out of a field of nearly-black, exactly the way dawn does.",
  },
  {
    slug: "bahar",
    title: "Bahar — Spring",
    category: "Paintings",
    price: 4900,
    sold: false,
    image: "https://picsum.photos/seed/alwankhat-bahar/900/1125",
    size: '36 × 46 cm',
    medium: "Gouache on paper",
    year: "2026",
    story:
      "The first week of spring, before the colours decide. Soft pinks, a hint of gold, everything still learning to open.",
  },
];

export function getPiece(slug: string) {
  return pieces.find((piece) => piece.slug === slug);
}