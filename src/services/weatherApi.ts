import { GeocodingResponse, GeocodingResult, WeatherData } from '../types';

export class WeatherApiError extends Error {
  isNotFound?: boolean;
  constructor(message: string, isNotFound = false) {
    super(message);
    this.name = 'WeatherApiError';
    this.isNotFound = isNotFound;
  }
}

/**
 * Searches for cities using the Open-Meteo Geocoding API.
 */
export async function searchCities(query: string, count: number = 5): Promise<GeocodingResult[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    trimmed
  )}&count=${count}&language=en&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new WeatherApiError(`Geocoding request failed with status: ${response.status}`);
    }

    const data: GeocodingResponse = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new WeatherApiError('City not found. Please check spelling.', true);
    }

    return data.results;
  } catch (error) {
    if (error instanceof WeatherApiError) {
      throw error;
    }
    throw new WeatherApiError(
      'Unable to connect to weather geocoding service. Please check your network and try again.'
    );
  }
}

/**
 * Fetches the 7-day forecast and current weather for a specific latitude and longitude.
 */
export async function fetchWeatherData(latitude: number, longitude: number): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max,uv_index_max&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weathercode,wind_speed_10m&timezone=auto`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new WeatherApiError(`Weather data request failed with status: ${response.status}`);
    }

    const data: WeatherData = await response.json();

    if (!data.current_weather || !data.daily) {
      throw new WeatherApiError('Received incomplete weather data. Please try again.');
    }

    return data;
  } catch (error) {
    if (error instanceof WeatherApiError) {
      throw error;
    }
    throw new WeatherApiError(
      'Network error fetching weather forecast. Please check your connection and retry.'
    );
  }
}

/**
 * Default initial city to showcase working intelligence immediately.
 */
export const DEFAULT_CITY: GeocodingResult = {
  id: 2643743,
  name: 'London',
  latitude: 51.50853,
  longitude: -0.12574,
  country: 'United Kingdom',
  country_code: 'GB',
  admin1: 'England',
  timezone: 'Europe/London',
};

export const POPULAR_CITIES: Array<{ name: string; country: string; lat: number; lon: number }> = [
  { name: 'London', country: 'United Kingdom', lat: 51.50853, lon: -0.12574 },
  { name: 'New York', country: 'United States', lat: 40.71427, lon: -74.00597 },
  { name: 'Tokyo', country: 'Japan', lat: 35.6895, lon: 139.69171 },
  { name: 'Paris', country: 'France', lat: 48.85341, lon: 2.3488 },
  { name: 'San Francisco', country: 'United States', lat: 37.77493, lon: -122.41942 },
  { name: 'Sydney', country: 'Australia', lat: -33.86785, lon: 151.20732 },
  { name: 'Dubai', country: 'United Arab Emirates', lat: 25.07725, lon: 55.30927 },
];
