export interface Plant {
  latin: string;
  origin: string;
  id: number;
  common: string[];
  name: string;
  category: string;
  ideal_light: string;
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