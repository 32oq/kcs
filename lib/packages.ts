export interface Package {
  id: string;
  slug: string;
  title: string;
  nights: number;
  days: number;
  price: number;
  original_price?: number;
  inclusions: string[];
  locations: string[];
  image: string;
  gallery?: string[];
  badge?: string;
  category: string;
  rating: number;
  description: string;
  highlight: string;
}

export const packages: Package[] = [
  {
    id: "pkg_001",
    slug: "romantic-escape-kashmir",
    title: "Romantic Escape to Kashmir",
    nights: 5,
    days: 6,
    price: 21000,
    original_price: 25000,
    inclusions: ["Houseboat", "Cab", "Meals"],
    locations: ["Srinagar", "Gulmarg", "Pahalgam"],
    image: "https://images.unsplash.com/photo-1595815771614-ade5019d8b1f?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1597047084897-51e81819a499?q=80&w=1200",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=1200",
    ],
    badge: "Best Seller",
    category: "Honeymoon",
    rating: 4.9,
    description: "Perfect romantic getaway with houseboat stay and scenic valleys.",
    highlight: "Houseboat Stay",
  },
  {
    id: "pkg_002",
    slug: "best-of-kashmir",
    title: "Best of Kashmir with Shikara Ride",
    nights: 7,
    days: 8,
    price: 36000,
    inclusions: ["Hotel", "Cab", "Meals", "Shikara"],
    locations: ["Srinagar", "Pahalgam", "Sonamarg"],
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1582972236019-ea9a7e9c47ff?q=80&w=1200",
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200",
    ],
    badge: "Top Rated",
    category: "Family",
    rating: 4.8,
    description: "Complete Kashmir experience with lakes, valleys, and cultural tours.",
    highlight: "Shikara on Dal Lake",
  },
  {
    id: "pkg_003",
    slug: "kashmir-holiday-experience",
    title: "Kashmir Holiday Experience",
    nights: 5,
    days: 6,
    price: 16999,
    inclusions: ["Hotel", "Cab", "Meals"],
    locations: ["Srinagar", "Pahalgam", "Gulmarg"],
    image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1617469165786-8007eda3caa7?q=80&w=1200",
      "https://images.unsplash.com/photo-1580654843061-8c9a1c1c4f6b?q=80&w=1200",
    ],
    badge: "Budget Pick",
    category: "Budget",
    rating: 4.7,
    description: "Affordable trip covering major Kashmir highlights.",
    highlight: "Value for Money",
  },
  {
    id: "pkg_004",
    slug: "dreamscapes-kashmir",
    title: "Dreamscapes of Kashmir",
    nights: 6,
    days: 7,
    price: 19999,
    inclusions: ["Hotel", "Cab", "Meals", "Activities"],
    locations: ["Srinagar", "Pahalgam", "Gulmarg"],
    image: "https://images.unsplash.com/photo-1580746738099-9d5f3c51d4c7?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1580746738099-9d5f3c51d4c7?q=80&w=1200",
      "https://images.unsplash.com/photo-1622308644420-b20142dc993c?q=80&w=1200",
    ],
    badge: "Popular",
    category: "Family",
    rating: 4.8,
    description: "Balanced itinerary covering all major destinations.",
    highlight: "3 Destinations",
  },
  {
    id: "pkg_005",
    slug: "magical-kashmir-tour",
    title: "Magical Kashmir Tour",
    nights: 5,
    days: 6,
    price: 27000,
    inclusions: ["Hotel", "Cab", "Meals", "Guide"],
    locations: ["Srinagar", "Pahalgam", "Sonamarg"],
    image: "https://images.unsplash.com/photo-1610878180933-123728745d22?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1621337208301-7a1b6c62a0f5?q=80&w=1200",
      "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?q=80&w=1200",
    ],
    badge: "Luxury",
    category: "Premium",
    rating: 4.9,
    description: "Premium experience with curated sightseeing and comfort stays.",
    highlight: "Premium Curated",
  },
  {
    id: "pkg_006",
    slug: "journey-serene-kashmir",
    title: "Journey to Serene Kashmir",
    nights: 7,
    days: 8,
    price: 24999,
    inclusions: ["Hotel", "Cab", "Meals", "Activities"],
    locations: ["Srinagar", "Pahalgam", "Gulmarg", "Sonamarg"],
    image: "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1593696954577-ab3d39317b97?q=80&w=1200",
      "https://images.unsplash.com/photo-1595815771614-ade5019d8b1f?q=80&w=1200",
    ],
    badge: "Extended Trip",
    category: "Extended",
    rating: 4.8,
    description: "Extended tour covering all major valleys and experiences.",
    highlight: "4 Destinations",
  },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}
