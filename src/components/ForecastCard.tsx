import React from 'react';
import { Droplets, Wind, ChevronRight } from 'lucide-react';
import { TemperatureUnit } from '../types/weather';
import { getWeatherCodeInfo } from '../utils/weatherCodes';
import { WeatherIcon } from './WeatherIcon';
import { formatDayName, formatTemp } from '../utils/formatters';

interface ForecastCardProps {
  date: string;
  isToday: boolean;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipitation: number;
  windSpeedMax: number;
  tempUnit: TemperatureUnit;
  isSelected?: boolean;
  onClick?: () => void;
  // Min & max across entire 7-day range for relative temp bar scaling
  globalMin: number;
  globalMax: number;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({
  date,
  isToday,
  weatherCode,
  tempMax,
  tempMin,
  precipitation,
  windSpeedMax,
  tempUnit,
  isSelected = false,
  onClick,
  globalMin,
  globalMax
}) => {
  const weatherInfo = getWeatherCodeInfo(weatherCode);
  const dayName = isToday ? 'Today' : formatDayName(date);
  const dateFormatted = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  // Calculate percentage bar for temperature range
  const rangeSpan = Math.max(1, globalMax - globalMin);
  const leftPercent = Math.max(0, Math.min(100, ((tempMin - globalMin) / rangeSpan) * 100));
  const widthPercent = Math.max(12, Math.min(100 - leftPercent, ((tempMax - tempMin) / rangeSpan) * 100));

  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left w-full p-4 rounded-xl border transition-all duration-200 relative overflow-hidden flex flex-col justify-between group ${
        isSelected
          ? 'bg-slate-800 border-sky-500 shadow-lg shadow-sky-500/10 ring-1 ring-sky-500/30'
          : 'bg-slate-850/80 hover:bg-slate-800 border-slate-800 hover:border-slate-700/80'
      }`}
    >
      {/* Active Day Indicator bar */}
      {isToday && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-indigo-500" />
      )}

      {/* Top: Day and Date */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span
            className={`text-sm font-bold tracking-tight ${
              isToday ? 'text-sky-400' : 'text-slate-100'
            }`}
          >
            {dayName}
          </span>
          <span className="text-[11px] text-slate-400 font-mono tabular-nums">
            {dateFormatted}
          </span>
        </div>

        {/* Condition Icon & Text */}
        <div className="flex items-center gap-3 my-3">
          <div className="w-10 h-10 rounded-lg bg-slate-900/80 border border-slate-700/60 flex items-center justify-center shrink-0">
            <WeatherIcon
              name={weatherInfo.icon}
              className={`w-6 h-6 ${weatherInfo.accentColor}`}
            />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-slate-200 truncate">
              {weatherInfo.label}
            </div>
            <div className="text-[11px] text-slate-400 truncate">
              {weatherInfo.category}
            </div>
          </div>
        </div>
      </div>

      {/* Center: Relative Temperature Bar & Values */}
      <div className="my-2">
        <div className="flex items-center justify-between text-xs font-mono tabular-nums mb-1">
          <span className="text-slate-400">{formatTemp(tempMin, tempUnit)}</span>
          <span className="text-white font-bold">{formatTemp(tempMax, tempUnit)}</span>
        </div>

        {/* Visual Temperature Bar */}
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden relative">
          <div
            className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-rose-400"
            style={{
              left: `${leftPercent}%`,
              width: `${widthPercent}%`
            }}
          />
        </div>
      </div>

      {/* Bottom: Precipitation & Wind summary */}
      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1 font-mono tabular-nums">
          <Droplets className={`w-3 h-3 ${precipitation > 0 ? 'text-blue-400' : 'text-slate-500'}`} />
          <span className={precipitation > 0 ? 'text-blue-300 font-semibold' : ''}>
            {precipitation.toFixed(1)}mm
          </span>
        </div>

        <div className="flex items-center gap-1 font-mono tabular-nums">
          <Wind className="w-3 h-3 text-slate-500" />
          <span>{Math.round(windSpeedMax)} km/h</span>
        </div>
      </div>
    </button>
  );
};
