import type { Package }     from './packages';
import type { Destination } from './destinations';

export interface ItineraryStop {
  id: number;
  place: string;
  coords: [number, number, number];
  days: number;
  images: string[];
  description: string;
}

export interface JourneyData {
  title: string;
  stops: ItineraryStop[];
  totalDays: number;
}

export type JourneyPhase = 'intro' | 'traveling' | 'stopped' | 'celebration' | 'complete';

// Kashmir 3D scene coordinates (~1 unit ≈ 8 km)
const KC: Record<string, [number, number, number]> = {
  Srinagar:    [ 0.0, 0,  0.0],
  'Dal Lake':  [ 0.3, 0,  0.4],
  Gulmarg:     [-2.2, 0, -1.8],
  Pahalgam:    [ 2.8, 0,  1.2],
  Sonamarg:    [ 3.5, 0, -1.5],
  Doodhpathri: [-1.5, 0,  2.0],
  Yusmarg:     [-2.0, 0,  2.5],
  Vishansar:   [ 4.0, 0, -2.5],
  Gangabal:    [ 4.5, 0, -3.0],
};

export function destinationToJourney(dest: Destination): JourneyData {
  return {
    title: `${dest.name} — ${dest.title}`,
    stops: [{
      id: 1,
      place: dest.name,
      coords: KC[dest.name] ?? [0, 0, 0],
      days: 2,
      images: dest.images?.length ? dest.images : [dest.image],
      description: dest.description,
    }],
    totalDays: 2,
  };
}

export function packageToJourney(pkg: Package): JourneyData {
  const stops: ItineraryStop[] = pkg.locations.map((loc, i) => ({
    id: i + 1,
    place: loc,
    coords: KC[loc] ?? [i * 2.5 - pkg.locations.length * 1.2, 0, 0],
    days: Math.max(1, Math.round(pkg.nights / pkg.locations.length)),
    images: pkg.gallery?.length ? pkg.gallery : [pkg.image],
    description: `Discover the beauty of ${loc}, one of Kashmir's most stunning destinations.`,
  }));

  return { title: pkg.title, stops, totalDays: pkg.nights };
}
