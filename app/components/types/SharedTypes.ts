export interface Plant {
  latin: string;
  origin: string;
  id: number;
  common: string[];
  name: string;
  category: string;
  ideal_light: string;
  last_water: Date;
  last_rotated: Date;
  last_skipped: Date;
  health: string;
  climate: string;
  last_fertilized: Date;
  custom_schedule: number;
  image: string;
}

export interface LoaderData {
  catchedData: boolean;
  data: Plant[];
}

export interface Search {
  name: string;
  climate: string;
  ideal_light: string;
}

export interface Action {
  type: string;
  plant_id: number;
  id: number;
  created_at: Date;
}
