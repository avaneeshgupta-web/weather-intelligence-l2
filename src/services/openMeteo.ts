import { GeoLocation, WeatherData } from '../types/weather';

export const POPULAR_LOCATIONS: GeoLocation[] = [
  {
    id: 1264527,
    name: 'Chennai',
    latitude: 13.08784,
    longitude: 80.27847,
    country: 'India',
    country_code: 'IN',
    admin1: 'Tamil Nadu',
    timezone: 'Asia/Kolkata',
    population: 4681087
  },
  {
    id: 2643743,
    name: 'London',
    latitude: 51.50853,
    longitude: -0.12574,
    country: 'United Kingdom',
    country_code: 'GB',
    admin1: 'England',
    timezone: 'Europe/London',
    population: 8961936
  },
  {
    id: 5128581,
    name: 'New York',
    latitude: 40.7128,
    longitude: -74.006,
    country: 'United States',
    country_code: 'US',
    admin1: 'New York',
    timezone: 'America/New_York',
    population: 8804190
  },
  {
    id: 1850147,
    name: 'Tokyo',
    latitude: 35.6895,
    longitude: 139.6917,
    country: 'Japan',
    country_code: 'JP',
    admin1: 'Tokyo',
    timezone: 'Asia/Tokyo',
    population: 13960000
  },
  {
    id: 2988507,
    name: 'Paris',
    latitude: 48.8534,
    longitude: 2.3488,
    country: 'France',
    country_code: 'FR',
    admin1: 'Île-de-France',
    timezone: 'Europe/Paris',
    population: 2161000
  },
  {
    id: 2147714,
    name: 'Sydney',
    latitude: -33.8678,
    longitude: 151.2073,
    country: 'Australia',
    country_code: 'AU',
    admin1: 'New South Wales',
    timezone: 'Australia/Sydney',
    population: 5312000
  }
];

export async function searchCities(query: string, count: number = 5): Promise<GeoLocation[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) {
    return [];
  }

  const endpoint = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    trimmed
  )}&count=${count}&language=en&format=json`;

  try {
    const res = await fetch(endpoint, {
      headers: {
        Accept: 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Geocoding request failed with status: ${res.status}`);
    }

    const data = await res.json();
    if (!data || !Array.isArray(data.results)) {
      return [];
    }

    return data.results.map((item: any) => ({
      id: item.id ?? Math.random(),
      name: item.name,
      latitude: item.latitude,
      longitude: item.longitude,
      country: item.country || '',
      country_code: item.country_code || '',
      admin1: item.admin1 || '',
      admin2: item.admin2 || '',
      timezone: item.timezone || 'auto',
      population: item.population,
      elevation: item.elevation
    }));
  } catch (error) {
    console.error('Error fetching geocoding suggestions:', error);
    throw error;
  }
}

export async function fetchWeather(location: GeoLocation): Promise<WeatherData> {
  const { latitude, longitude } = location;
  const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&timezone=auto`;

  try {
    const res = await fetch(endpoint, {
      headers: {
        Accept: 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Weather forecast request failed with status: ${res.status}`);
    }

    const data = await res.json();

    if (!data.current_weather || !data.daily) {
      throw new Error('Incomplete weather payload received from Open-Meteo API.');
    }

    return {
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone || location.timezone || 'auto',
      current_weather: data.current_weather,
      daily: data.daily,
      location,
      fetchedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}
