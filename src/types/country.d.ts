export interface Trip {
  startDate: Date;
  endDate: Date;
  name?: string;
  description?: string;
}

export interface TripWithCountry extends Trip {
  country: string
}

export interface Country {
  name: string;
  daysPerWindow: number;
  windowSize: number;
  trips: Array<Trip>;
}

export interface LocalStorageCountries {
  [name: string]: Country;
}