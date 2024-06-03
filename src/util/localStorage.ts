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

const userKey = "user"

export function getUser() {
  const user = localStorage.getItem(userKey);
  
  if (user) {
    return JSON.parse(user);
  }
}

export function setUser(name: string) {
  localStorage.setItem(userKey, JSON.stringify({ name: name }));
}