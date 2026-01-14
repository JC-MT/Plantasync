export interface Plant {
  latin: string;
  origin: string;
  id: number;
  common: string[];
  name: string;
  category: string;
  ideal_light: string;
  last_water: string;
  last_rotated: string;
  last_skipped: string;
  health: string;
  climate: string;
  last_fertilized: string;
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

export interface User {
  name: string;
  password_hash: string;
  password_salt: string;
  id: string;
  created_at: Date;
  email: string;
}
