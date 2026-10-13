import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Loader2, Navigation } from 'lucide-react';
import { GeoLocation } from '../types/weather';
import { searchCities } from '../services/openMeteo';

interface SearchBarProps {
  onSelectCity: (location: GeoLocation) => void;
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSelectCity, isLoading = false }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      setSearchError(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      setSearchError(null);
      try {
        const hits = await searchCities(query.trim(), 6);
        setResults(hits);
        setIsOpen(true);
        setSelectedIndex(-1);
        if (hits.length === 0) {
          setSearchError(`No cities matching "${query}". Check spelling.`);
        }
      } catch (err) {
        setSearchError('Unable to query geocoding service. Please retry.');
      } finally {
        setIsSearching(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (loc: GeoLocation) => {
    onSelectCity(loc);
    setQuery(`${loc.name}${loc.country ? `, ${loc.country}` : ''}`);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' && results.length > 0) {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        handleSelect(results[selectedIndex]);
      } else if (results.length > 0) {
        handleSelect(results[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      handleSelect(results[0]);
    } else if (query.trim().length >= 2) {
      // Trigger immediate search
      setIsSearching(true);
      searchCities(query.trim(), 5)
        .then((hits) => {
          if (hits.length > 0) {
            handleSelect(hits[0]);
          } else {
            setSearchError(`City "${query}" not found. Please check spelling.`);
            setIsOpen(true);
          }
        })
        .catch(() => {
          setSearchError('Search failed. Check network connection.');
          setIsOpen(true);
        })
        .finally(() => setIsSearching(false));
    }
  };

  const clearQuery = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setSearchError(null);
    inputRef.current?.focus();
  };

  return (
    <div ref={dropdownRef} className="relative w-full max-w-xl">
      <form onSubmit={handleManualSearch} className="relative flex items-center">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          {isSearching || isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0 || searchError) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search city by name (e.g. Chennai, London, Tokyo)..."
          className="w-full pl-10 pr-24 py-2.5 bg-slate-800/90 hover:bg-slate-800 focus:bg-slate-900 text-slate-100 placeholder-slate-400 text-sm rounded-xl border border-slate-700/80 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all shadow-sm"
          autoComplete="off"
          aria-label="Search city for weather forecast"
        />

        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={clearQuery}
              className="p-1 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-700/60 transition-colors"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="submit"
            disabled={!query.trim()}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 disabled:opacity-40 disabled:hover:bg-sky-600 rounded-lg transition-colors whitespace-nowrap shadow-sm"
          >
            Search
          </button>
        </div>
      </form>

      {/* Dropdown Suggestions */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-md rounded-xl border border-slate-700 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {searchError ? (
            <div className="p-3 text-xs text-amber-400 flex items-center gap-2">
              <span className="shrink-0">⚠️</span>
              <span>{searchError}</span>
            </div>
          ) : results.length > 0 ? (
            <ul className="py-1 divide-y divide-slate-700/40 max-h-72 overflow-y-auto">
              {results.map((loc, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <li key={`${loc.id}-${idx}`}>
                    <button
                      type="button"
                      onClick={() => handleSelect(loc)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between text-xs transition-colors ${
                        isSelected
                          ? 'bg-sky-500/15 text-sky-200'
                          : 'text-slate-200 hover:bg-slate-700/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <div className="truncate">
                          <span className="font-semibold text-slate-100">{loc.name}</span>
                          <span className="text-slate-400 ml-1.5">
                            {loc.admin1 ? `${loc.admin1}, ` : ''}
                            {loc.country}
                          </span>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-400 font-mono tabular-nums shrink-0 ml-2">
                        {loc.latitude.toFixed(2)}°, {loc.longitude.toFixed(2)}°
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      )}
    </div>
  );
};
