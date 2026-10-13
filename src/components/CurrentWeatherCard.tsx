import React from 'react';
import {
  Wind,
  Droplets,
  ArrowUp,
  ArrowDown,
  Navigation,
  Clock,
  Compass
} from 'lucide-react';
import { WeatherData, TemperatureUnit } from '../types/weather';
import { getWeatherCodeInfo } from '../utils/weatherCodes';
import { WeatherIcon } from './WeatherIcon';
import {
  formatTemp,
  formatFullDate,
  formatTime,
  getWindDirectionLabel
} from '../utils/formatters';

interface CurrentWeatherCardProps {
  weatherData: WeatherData;
  tempUnit: TemperatureUnit;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  weatherData,
  tempUnit
}) => {
  const { current_weather, daily, location, fetchedAt } = weatherData;
  const weatherInfo = getWeatherCodeInfo(current_weather.weathercode);

  const todayHigh = daily.temperature_2m_max[0] ?? current_weather.temperature;
  const todayLow = daily.temperature_2m_min[0] ?? current_weather.temperature;
  const todayPrecipitation = daily.precipitation_sum[0] ?? 0;
  const windDir = getWindDirectionLabel(current_weather.winddirection);
  const formattedDate = formatFullDate(daily.time[0] || new Date().toISOString().slice(0, 10));

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-800/60 backdrop-blur-xl shadow-xl transition-all">
      {/* Background ambient gradient glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${weatherInfo.bgGradient} pointer-events-none opacity-80`}
      />

      <div className="relative p-6 sm:p-8 z-10 flex flex-col justify-between h-full">
        {/* Top Header: Location & Time */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-700/60">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-sky-400 mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>
                {location.latitude.toFixed(2)}°N, {location.longitude.toFixed(2)}°E · Elev {location.elevation ? `${Math.round(location.elevation)}m` : 'Sea Level'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-baseline gap-2">
              <span>{location.name}</span>
              <span className="text-base font-normal text-slate-400">
                {location.admin1 ? `${location.admin1}, ` : ''}
                {location.country}
              </span>
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <span>{formattedDate}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 font-mono tabular-nums">
                <Clock className="w-3 h-3 text-slate-500" />
                Updated {formatTime(fetchedAt)}
              </span>
            </div>
          </div>

          {/* Condition Badge */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/70 border border-slate-700/70 text-slate-200">
              <span className={`w-2.5 h-2.5 rounded-full ${weatherInfo.category === 'clear' ? 'bg-amber-400' : weatherInfo.category === 'rain' ? 'bg-blue-400' : 'bg-slate-400'}`} />
              <span className="text-xs font-semibold uppercase tracking-wider">{weatherInfo.label}</span>
            </div>
            <p className="text-[11px] text-slate-400 sm:text-right max-w-[200px] hidden sm:block">
              {weatherInfo.description}
            </p>
          </div>
        </div>

        {/* Center: Hero Temp & Primary Weather Icon */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-6 items-center">
          <div className="md:col-span-7 flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-900/60 border border-slate-700/80 flex items-center justify-center text-slate-100 shadow-inner">
                <WeatherIcon
                  name={weatherInfo.icon}
                  className={`w-12 h-12 sm:w-14 sm:h-14 ${weatherInfo.accentColor}`}
                />
              </div>
            </div>

            <div>
              <div className="flex items-baseline">
                <span className="text-5xl sm:text-7xl font-extrabold text-white tracking-tighter font-mono tabular-nums">
                  {Math.round(
                    tempUnit === 'fahrenheit'
                      ? (current_weather.temperature * 9) / 5 + 32
                      : current_weather.temperature
                  )}
                </span>
                <span className="text-2xl sm:text-3xl font-light text-slate-400 ml-1">
                  {tempUnit === 'celsius' ? '°C' : '°F'}
                </span>
              </div>
              <div className="text-sm font-medium text-slate-300 mt-1">
                {weatherInfo.label}
              </div>
            </div>
          </div>

          {/* Day High / Low strip */}
          <div className="md:col-span-5 bg-slate-900/60 rounded-xl p-4 border border-slate-700/50 flex flex-col justify-center gap-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Today's Thermal Range
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <ArrowUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">High</div>
                  <div className="text-lg font-bold text-slate-100 font-mono tabular-nums">
                    {formatTemp(todayHigh, tempUnit)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                  <ArrowDown className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Low</div>
                  <div className="text-lg font-bold text-slate-100 font-mono tabular-nums">
                    {formatTemp(todayLow, tempUnit)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Atmospheric Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-700/60">
          {/* Wind Speed */}
          <div className="bg-slate-900/40 rounded-xl p-3 border border-slate-700/40 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-800 text-sky-400 shrink-0">
              <Wind className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] text-slate-400 font-medium">Wind Speed</div>
              <div className="text-sm font-bold text-slate-100 font-mono tabular-nums">
                {current_weather.windspeed.toFixed(1)} km/h
              </div>
            </div>
          </div>

          {/* Wind Direction */}
          <div className="bg-slate-900/40 rounded-xl p-3 border border-slate-700/40 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-800 text-indigo-400 shrink-0">
              <Navigation
                className="w-4 h-4 transition-transform duration-300"
                style={{ transform: `rotate(${current_weather.winddirection}deg)` }}
              />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] text-slate-400 font-medium">Direction</div>
              <div className="text-sm font-bold text-slate-100 font-mono tabular-nums">
                {windDir} ({Math.round(current_weather.winddirection)}°)
              </div>
            </div>
          </div>

          {/* Precipitation Today */}
          <div className="col-span-2 sm:col-span-1 bg-slate-900/40 rounded-xl p-3 border border-slate-700/40 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-800 text-blue-400 shrink-0">
              <Droplets className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] text-slate-400 font-medium">Precipitation</div>
              <div className="text-sm font-bold text-slate-100 font-mono tabular-nums">
                {todayPrecipitation.toFixed(1)} mm
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
