export interface GeoLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code?: string;
  admin1?: string; // State / Province / County
  admin2?: string;
  timezone?: string;
  population?: number;
  elevation?: number;
}

export interface CurrentWeather {
  time: string;
  temperature: number;
  weathercode: number;
  windspeed: number;
  winddirection: number;
  is_day: number;
}

export interface DailyForecast {
  time: string[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  windspeed_10m_max: number[];
}

export interface WeatherData {
  latitude: number;
  longitude: number;
  timezone: string;
  current_weather: CurrentWeather;
  daily: DailyForecast;
  location: GeoLocation;
  fetchedAt: string;
}

export interface PlanningRecommendation {
  id: string;
  ruleKey: 'rain' | 'hot' | 'cold' | 'wind' | 'clear' | 'neutral';
  title: string;
  advice: string;
  severity: 'warning' | 'caution' | 'alert' | 'success' | 'info';
  metricContext: string;
  iconName: 'Umbrella' | 'Flame' | 'ThermometerSnowflake' | 'Wind' | 'Sun' | 'Compass';
}

export interface ActivityFeasibility {
  name: string;
  category: string;
  status: 'Optimal' | 'Favorable' | 'Caution' | 'Not Advised';
  statusColor: 'emerald' | 'sky' | 'amber' | 'rose';
  reason: string;
  iconName: string;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WindSpeedUnit = 'kmh' | 'mph';
