import React, { useState, useEffect, useCallback } from 'react';
import {
  GeoLocation,
  WeatherData,
  TemperatureUnit,
  PlanningRecommendation,
  ActivityFeasibility
} from './types/weather';
import { POPULAR_LOCATIONS, fetchWeather } from './services/openMeteo';
import { generatePlanningRecommendations, evaluateActivityFeasibility } from './utils/recommendations';
import { Navbar } from './components/Navbar';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { ForecastGrid } from './components/ForecastGrid';
import { RecommendationBanner } from './components/RecommendationBanner';
import { ActivityPlanner } from './components/ActivityPlanner';
import { ErrorMessage } from './components/ErrorMessage';
import { LoadingSkeleton } from './components/LoadingSkeleton';

export default function App() {
  // Default to London or Chennai on initial load
  const [currentLocation, setCurrentLocation] = useState<GeoLocation>(POPULAR_LOCATIONS[0]); // Chennai
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tempUnit, setTempUnit] = useState<TemperatureUnit>('celsius');

  const [recommendations, setRecommendations] = useState<PlanningRecommendation[]>([]);
  const [activities, setActivities] = useState<ActivityFeasibility[]>([]);

  // Load weather for a specified location
  const loadWeatherData = useCallback(async (loc: GeoLocation) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(loc);
      setWeatherData(data);
      setCurrentLocation(loc);

      // Compute rule-based recommendations & activity matrix
      const recs = generatePlanningRecommendations(data.current_weather, data.daily);
      setRecommendations(recs);

      const acts = evaluateActivityFeasibility(data.current_weather, data.daily);
      setActivities(acts);
    } catch (err: any) {
      console.error('Failed to load weather data:', err);
      setError(
        err?.message ||
          'Unable to retrieve weather data for this location. Please check your network and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadWeatherData(currentLocation);
  }, []);

  const handleSelectCity = (location: GeoLocation) => {
    loadWeatherData(location);
  };

  const handleRefresh = () => {
    if (currentLocation) {
      loadWeatherData(currentLocation);
    }
  };

  const handleToggleTempUnit = () => {
    setTempUnit((prev) => (prev === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-sky-500/30 selection:text-sky-200">
      {/* Top Navbar */}
      <Navbar
        onSelectCity={handleSelectCity}
        activeCityId={currentLocation.id}
        activeCityName={currentLocation.name}
        tempUnit={tempUnit}
        onToggleTempUnit={handleToggleTempUnit}
        onRefresh={handleRefresh}
        isLoading={isLoading}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Error State */}
        {error && (
          <ErrorMessage
            message={error}
            onRetry={handleRefresh}
            onSelectFallbackCity={handleSelectCity}
          />
        )}

        {/* Loading State Skeleton */}
        {isLoading && !weatherData && <LoadingSkeleton />}

        {/* Loaded Weather Dashboard */}
        {weatherData && (
          <div className="space-y-8">
            {/* 1. Current Weather Primary Display */}
            <CurrentWeatherCard
              weatherData={weatherData}
              tempUnit={tempUnit}
            />

            {/* 2. Planning Recommendations Engine Banner */}
            <RecommendationBanner recommendations={recommendations} />

            {/* 3. 7-Day Forecast Grid */}
            <ForecastGrid
              daily={weatherData.daily}
              tempUnit={tempUnit}
            />

            {/* 4. Activity Feasibility Planner */}
            <ActivityPlanner activities={activities} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/40 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Weather Intelligence</span>
            <span>·</span>
            <span>Meteorological Data powered by Open-Meteo API</span>
          </div>
          <div className="text-slate-400">
            WMO Synoptic Standards · Rule-Based Planning Engine
          </div>
        </div>
      </footer>
    </div>
  );
}
