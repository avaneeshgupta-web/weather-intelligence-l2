import React from 'react';
import { CloudLightning, RefreshCw, Thermometer } from 'lucide-react';
import { GeoLocation, TemperatureUnit } from '../types/weather';
import { SearchBar } from './SearchBar';
import { POPULAR_LOCATIONS } from '../services/openMeteo';

interface NavbarProps {
  onSelectCity: (location: GeoLocation) => void;
  activeCityId?: number;
  activeCityName?: string;
  tempUnit: TemperatureUnit;
  onToggleTempUnit: () => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectCity,
  activeCityName,
  tempUnit,
  onToggleTempUnit,
  onRefresh,
  isLoading
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 py-3.5">
          {/* Brand Zone */}
          <div className="flex items-center justify-between w-full lg:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 text-white shrink-0">
                <CloudLightning className="w-5 h-5 text-sky-100" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
                    Weather Intelligence
                  </h1>
                  <span className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    Live Engine
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Predictive atmospheric data & rule-based activity advice
                </p>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onToggleTempUnit}
                className="px-2.5 py-1.5 text-xs font-mono font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                title="Switch Celsius / Fahrenheit"
              >
                {tempUnit === 'celsius' ? '°C' : '°F'}
              </button>
              <button
                onClick={onRefresh}
                disabled={isLoading}
                className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors disabled:opacity-50"
                title="Refresh meteorological data"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-sky-400' : ''}`} />
              </button>
            </div>
          </div>

          {/* Search Bar Zone */}
          <div className="w-full lg:max-w-md xl:max-w-lg">
            <SearchBar onSelectCity={onSelectCity} isLoading={isLoading} />
          </div>

          {/* Controls & Quick Cities */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Quick Cities Pill Bar */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700/80">
              {POPULAR_LOCATIONS.slice(0, 4).map((loc) => {
                const isActive = activeCityName?.toLowerCase() === loc.name.toLowerCase();
                return (
                  <button
                    key={loc.id}
                    onClick={() => onSelectCity(loc)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-sky-500 text-white shadow-sm font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                    }`}
                  >
                    {loc.name}
                  </button>
                );
              })}
            </div>

            {/* Unit Switcher */}
            <button
              onClick={onToggleTempUnit}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700 transition-colors"
              title="Toggle Temperature Unit"
            >
              <Thermometer className="w-3.5 h-3.5 text-sky-400" />
              <span>{tempUnit === 'celsius' ? '°C' : '°F'}</span>
            </button>

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 rounded-xl border border-slate-700 transition-colors disabled:opacity-50"
              title="Refresh weather data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-sky-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Quick cities scrollable strip on mobile/tablet */}
        <div className="flex lg:hidden items-center gap-1.5 pb-2.5 pt-1 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mr-1 shrink-0">
            Quick:
          </span>
          {POPULAR_LOCATIONS.map((loc) => {
            const isActive = activeCityName?.toLowerCase() === loc.name.toLowerCase();
            return (
              <button
                key={loc.id}
                onClick={() => onSelectCity(loc)}
                className={`px-2.5 py-1 rounded-lg shrink-0 transition-colors ${
                  isActive
                    ? 'bg-sky-500 text-white font-semibold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
                }`}
              >
                {loc.name}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
