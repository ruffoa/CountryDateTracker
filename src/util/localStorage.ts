import { Country, LocalStorageCountries } from "../types/country";

const key = "countries";

export function getLocalStorage(): LocalStorageCountries | undefined {
  const countries = localStorage.getItem(key);
  
  if (countries) {
    return JSON.parse(countries);
  }
}

export function updateLocalStorage(countries: LocalStorageCountries) {
  localStorage.setItem(key, JSON.stringify(countries))
}