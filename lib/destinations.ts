export interface Destination {
  id: string;
  name: string;
  title: string;
  description: string;
  highlights: string[];
  ideal_for: string[];
  best_for: string[];
  image: string;
  slug: string;
}

export const destinations: Destination[] = [
  {
    id: "dest_001",
    name: "Srinagar",
    title: "The Heart of Kashmir",
    description:
      "Famous for Dal Lake, houseboats, Mughal gardens, and traditional Kashmiri culture.",
    highlights: ["Dal Lake", "Houseboats", "Shikara Ride", "Mughal Gardens"],
    ideal_for: ["Couples", "Families", "First-time visitors"],
    best_for: ["Sightseeing", "Culture", "Relaxation"],
    image:
      "https://source.unsplash.com/1200x800/?dal+lake,srinagar,kashmir,houseboat",
    slug: "srinagar",
  },
  {
    id: "dest_002",
    name: "Gulmarg",
    title: "Meadow of Flowers",
    description:
      "A top destination for snow, skiing, and the famous Gondola ride.",
    highlights: ["Gondola Ride", "Snow Sports", "Skiing", "Meadows"],
    ideal_for: ["Adventure lovers", "Couples", "Snow seekers"],
    best_for: ["Winter trips", "Adventure", "Photography"],
    image:
      "https://source.unsplash.com/800x600/?gulmarg,kashmir,snow,gondola",
    slug: "gulmarg",
  },
  {
    id: "dest_003",
    name: "Pahalgam",
    title: "Valley of Shepherds",
    description:
      "A scenic valley known for rivers, pine forests, and peaceful surroundings.",
    highlights: ["Lidder River", "Betaab Valley", "Aru Valley"],
    ideal_for: ["Families", "Nature lovers", "Honeymooners"],
    best_for: ["Relaxation", "Nature", "Scenic stays"],
    image:
      "https://source.unsplash.com/800x600/?pahalgam,kashmir,valley,river,pine",
    slug: "pahalgam",
  },
  {
    id: "dest_004",
    name: "Sonamarg",
    title: "Meadow of Gold",
    description:
      "Known for glaciers, alpine landscapes, and breathtaking mountain views.",
    highlights: ["Thajiwas Glacier", "High-altitude drives", "Snow views"],
    ideal_for: ["Adventure travelers", "Nature lovers"],
    best_for: ["Glacier visits", "Road trips", "Summer travel"],
    image:
      "https://source.unsplash.com/800x600/?sonamarg,kashmir,glacier,mountain,alpine",
    slug: "sonamarg",
  },
  {
    id: "dest_005",
    name: "Doodhpathri",
    title: "Valley of Milk",
    description:
      "A peaceful meadow destination with lush greenery and flowing streams.",
    highlights: ["Green meadows", "Streams", "Picnic spots"],
    ideal_for: ["Families", "Day trips", "Nature lovers"],
    best_for: ["Relaxation", "Short trips"],
    image:
      "https://source.unsplash.com/800x600/?kashmir,meadow,green,stream,valley",
    slug: "doodhpathri",
  },
  {
    id: "dest_006",
    name: "Yusmarg",
    title: "Hidden Gem of Kashmir",
    description:
      "A quiet and less crowded destination with scenic meadows and forests.",
    highlights: ["Pine forests", "Open meadows", "Peaceful environment"],
    ideal_for: ["Couples", "Offbeat travelers"],
    best_for: ["Peace", "Nature walks"],
    image:
      "https://source.unsplash.com/800x600/?kashmir,pine+forest,meadow,quiet,offbeat",
    slug: "yusmarg",
  },
];
