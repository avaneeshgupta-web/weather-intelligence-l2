import React, { useState } from 'react';
import { Calendar, Droplets, Wind, ArrowUp, ArrowDown } from 'lucide-react';
import { DailyForecast, TemperatureUnit } from '../types/weather';
import { ForecastCard } from './ForecastCard';
import { getWeatherCodeInfo } from '../utils/weatherCodes';
import { formatFullDate, formatTemp } from '../utils/formatters';
import { WeatherIcon } from './WeatherIcon';

interface ForecastGridProps {
  daily: DailyForecast;
  tempUnit: TemperatureUnit;
}

export const ForecastGrid: React.FC<ForecastGridProps> = ({ daily, tempUnit }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  const times = daily.time || [];
  const weatherCodes = daily.weathercode || [];
  const maxTemps = daily.temperature_2m_max || [];
  const minTemps = daily.temperature_2m_min || [];
  const precipSums = daily.precipitation_sum || [];
  const windSpeeds = daily.windspeed_10m_max || [];

  // Determine global min and max for the 7-day scale
  const globalMin = Math.min(...minTemps);
  const globalMax = Math.max(...maxTemps);

  // Selected Day Details
  const selDate = times[selectedDayIndex] || '';
  const selCode = weatherCodes[selectedDayIndex] ?? 0;
  const selMax = maxTemps[selectedDayIndex] ?? 0;
  const selMin = minTemps[selectedDayIndex] ?? 0;
  const selPrecip = precipSums[selectedDayIndex] ?? 0;
  const selWind = windSpeeds[selectedDayIndex] ?? 0;
  const selWeatherInfo = getWeatherCodeInfo(selCode);

  return (
    <section aria-labelledby="seven-day-forecast-title" className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 id="seven-day-forecast-title" className="text-base font-bold text-slate-100">
              7-Day Meteorological Forecast
            </h3>
            <p className="text-xs text-slate-400">
              High-resolution synoptic models via Open-Meteo API
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-400">
          Showing daily high/lows, precipitation sum, and max gusts
        </div>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {times.slice(0, 7).map((date, idx) => (
          <ForecastCard
            key={date}
            date={date}
            isToday={idx === 0}
            weatherCode={weatherCodes[idx] ?? 0}
            tempMax={maxTemps[idx] ?? 0}
            tempMin={minTemps[idx] ?? 0}
            precipitation={precipSums[idx] ?? 0}
            windSpeedMax={windSpeeds[idx] ?? 0}
            tempUnit={tempUnit}
            isSelected={selectedDayIndex === idx}
            onClick={() => setSelectedDayIndex(idx)}
            globalMin={globalMin}
            globalMax={globalMax}
          />
        ))}
      </div>

      {/* Selected Day Quick Inspector Panel */}
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center shrink-0">
            <WeatherIcon
              name={selWeatherInfo.icon}
              className={`w-7 h-7 ${selWeatherInfo.accentColor}`}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">
                {selectedDayIndex === 0 ? "Today's Outlook" : formatFullDate(selDate)}
              </span>
              <span className="text-xs text-slate-400">({selWeatherInfo.label})</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {selWeatherInfo.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono tabular-nums">
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/60">
            <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-300">Max:</span>
            <span className="font-bold text-white">{formatTemp(selMax, tempUnit)}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/60">
            <ArrowDown className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-slate-300">Min:</span>
            <span className="font-bold text-white">{formatTemp(selMin, tempUnit)}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/60">
            <Droplets className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-300">Precip:</span>
            <span className="font-bold text-white">{selPrecip.toFixed(1)} mm</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/60">
            <Wind className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-300">Max Wind:</span>
            <span className="font-bold text-white">{Math.round(selWind)} km/h</span>
          </div>
        </div>
      </div>
    </section>
  );
};
