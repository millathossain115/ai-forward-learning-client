export interface VectorPoint {
  id: string;
  label: string;
  category: 'animals' | 'food' | 'vehicles';
  x: number; // 0.0 to 1.0 (normalized)
  y: number; // 0.0 to 1.0 (normalized)
  color: string;
}

export interface RankedVectorPoint extends VectorPoint {
  sortKey: number;
  scoreText: string;
  cosineSim: number;
  l2Dist: number;
}

export type MetricType = 'cosine' | 'l2' | 'inner';
export type IndexType = 'exact' | 'ivfflat' | 'hnsw';

export interface Centroid {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
}

export interface PresetQuery {
  text: string;
  x: number;
  y: number;
  targetCat: 'animals' | 'food' | 'vehicles';
}

export const DATASET: VectorPoint[] = [
  // Animals / Pets
  { id: '1', label: 'Cat', category: 'animals', x: 0.20, y: 0.25, color: '#f59e0b' },
  { id: '2', label: 'Kitten', category: 'animals', x: 0.23, y: 0.28, color: '#fbbf24' },
  { id: '3', label: 'Dog', category: 'animals', x: 0.28, y: 0.20, color: '#d97706' },
  { id: '4', label: 'Puppy', category: 'animals', x: 0.32, y: 0.24, color: '#b45309' },

  // Food / Fruits
  { id: '5', label: 'Apple', category: 'food', x: 0.75, y: 0.22, color: '#10b981' },
  { id: '6', label: 'Banana', category: 'food', x: 0.82, y: 0.28, color: '#34d399' },
  { id: '7', label: 'Orange', category: 'food', x: 0.70, y: 0.32, color: '#059669' },
  { id: '8', label: 'Mango', category: 'food', x: 0.85, y: 0.20, color: '#047857' },

  // Vehicles / Transport
  { id: '9', label: 'Car', category: 'vehicles', x: 0.72, y: 0.78, color: '#38bdf8' },
  { id: '10', label: 'Truck', category: 'vehicles', x: 0.78, y: 0.84, color: '#0284c7' },
  { id: '11', label: 'Bicycle', category: 'vehicles', x: 0.65, y: 0.70, color: '#60a5fa' },
  { id: '12', label: 'Airplane', category: 'vehicles', x: 0.85, y: 0.88, color: '#2563eb' },
];

export const PRESET_QUERIES: PresetQuery[] = [
  { text: 'Feline companion', x: 0.21, y: 0.26, targetCat: 'animals' },
  { text: 'Sweet citrus snack', x: 0.73, y: 0.29, targetCat: 'food' },
  { text: 'Heavy cargo motor vehicle', x: 0.77, y: 0.82, targetCat: 'vehicles' },
];

export const CENTROIDS: Centroid[] = [
  { id: 'c1', label: 'Centroid: Animals', x: 0.26, y: 0.24, color: '#f59e0b' },
  { id: 'c2', label: 'Centroid: Food', x: 0.78, y: 0.25, color: '#10b981' },
  { id: 'c3', label: 'Centroid: Vehicles', x: 0.75, y: 0.80, color: '#38bdf8' },
];

export const CANVAS_W = 600;
export const CANVAS_H = 380;
