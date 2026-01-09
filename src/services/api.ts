import axios from 'axios';
import type { Country } from '../types/country';

const BASE_URL = 'https://restcountries.com/v3.1';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const fetchAllCountries = async (): Promise<Country[]> => {
  try {
    // Split into multiple requests due to API query string length limit
    const fields1 = 'name,cca2,cca3,region,subregion,latlng,area,population,capital,flags';
    const fields2 = 'name,cca3,languages,currencies,continents,capitalInfo';

    const [response1, response2] = await Promise.all([
      api.get<Country[]>(`/all?fields=${fields1}`),
      api.get<Country[]>(`/all?fields=${fields2}`)
    ]);

    // Merge the two responses
    const merged = response1.data.map((country, index) => ({
      ...country,
      ...response2.data[index]
    }));

    return merged;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch countries: ${error.message}`);
    }
    throw error;
  }
};

export const fetchCountryByName = async (name: string): Promise<Country[]> => {
  try {
    const response = await api.get<Country[]>(`/name/${name}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch country: ${error.message}`);
    }
    throw error;
  }
};

export const fetchCountriesByRegion = async (region: string): Promise<Country[]> => {
  try {
    const response = await api.get<Country[]>(`/region/${region}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch countries by region: ${error.message}`);
    }
    throw error;
  }
};
