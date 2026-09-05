import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2, AlertCircle, X } from 'lucide-react';
import { GeocodingResult } from '../types';
import { POPULAR_CITIES, searchCities, WeatherApiError } from '../services/weatherApi';

interface SearchBarProps {
  onSelectCity: (city: GeocodingResult) => void;
  isLoading: boolean;
  currentCityName?: string;
  errorMessage?: string | null;
  onClearError?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSelectCity,
  isLoading,
  currentCityName,
  errorMessage,
  onClearError,
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<GeocodingResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced auto-suggestions
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (query.trim().length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      setIsSearching(false);
      return;
    }

    debounceTimerRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchCities(query.trim(), 5);
        setSuggestions(results);
        setShowDropdown(results.length > 0);
        setLocalError(null);
      } catch (err) {
        if (err instanceof WeatherApiError && err.isNotFound) {
          // Keep suggestions empty if not found during typing
          setSuggestions([]);
        }
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query]);

  // Handle direct form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    if (onClearError) onClearError();
    setLocalError(null);
    setIsSearching(true);
    setShowDropdown(false);

    try {
      // Prompt explicitly specifies count=1:
      // https://geocoding-api.open-meteo.com/v1/search?name={query}&count=1&language=en&format=json
      const results = await searchCities(trimmed, 1);
      if (results && results.length > 0) {
        onSelectCity(results[0]);
        setQuery('');
        setSuggestions([]);
      }
    } catch (err) {
      if (err instanceof WeatherApiError) {
        setLocalError(err.message);
      } else {
        setLocalError('City not found. Please check spelling.');
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSuggestion = (city: GeocodingResult) => {
    if (onClearError) onClearError();
    setLocalError(null);
    onSelectCity(city);
    setQuery('');
    setShowDropdown(false);
  };

  const handleQuickCityClick = (cityItem: { name: string; country: string; lat: number; lon: number }) => {
    if (onClearError) onClearError();
    setLocalError(null);
    const mockGeocoding: GeocodingResult = {
      id: Math.round(cityItem.lat * 1000 + cityItem.lon),
      name: cityItem.name,
      latitude: cityItem.lat,
      longitude: cityItem.lon,
      country: cityItem.country,
    };
    onSelectCity(mockGeocoding);
  };

  const activeError = localError || errorMessage;

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      {/* Search Input Container */}
      <div ref={dropdownRef} className="relative">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <div className="absolute left-4 text-slate-400 pointer-events-none flex items-center">
            {isSearching || isLoading ? (
              <Loader2 className="w-5 h-5 text-sky-400 animate-spin" />
            ) : (
              <Search className="w-5 h-5 text-slate-400" />
            )}
          </div>

          <input
            id="city-search-input"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (activeError) {
                setLocalError(null);
                if (onClearError) onClearError();
              }
            }}
            placeholder="Search city name (e.g., Paris, Tokyo, New York, Seattle)..."
            className="w-full pl-12 pr-28 py-3.5 bg-white/10 hover:bg-white/[0.14] focus:bg-white/[0.18] text-white placeholder-slate-300 text-sm md:text-base rounded-2xl border border-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/20 shadow-2xl backdrop-blur-2xl transition duration-200 outline-none"
            autoComplete="off"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                setShowDropdown(false);
              }}
              className="absolute right-20 text-slate-300 hover:text-white p-1 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            id="city-search-submit-btn"
            type="submit"
            disabled={!query.trim() || isSearching || isLoading}
            className="absolute right-2 px-4 py-2 bg-gradient-to-r from-sky-400/90 to-blue-500/90 hover:from-sky-400 hover:to-blue-500 text-white text-xs md:text-sm font-semibold rounded-xl border border-white/20 shadow-md shadow-sky-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition backdrop-blur-md"
          >
            Search
          </button>
        </form>

        {/* Auto-suggest dropdown */}
        {showDropdown && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/85 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl z-50 overflow-hidden divide-y divide-white/10">
            {suggestions.map((item) => (
              <button
                key={`${item.id}-${item.latitude}-${item.longitude}`}
                type="button"
                onClick={() => handleSelectSuggestion(item)}
                className="w-full px-4 py-3 text-left hover:bg-white/10 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-white/10 text-sky-300 group-hover:bg-white/20 transition">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-100 group-hover:text-white transition">
                      {item.name}
                    </span>
                    <span className="text-xs text-slate-300 ml-2">
                      {[item.admin1, item.country].filter(Boolean).join(', ')}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {item.latitude.toFixed(2)}°, {item.longitude.toFixed(2)}°
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Explicit Error Display Requirement:
          "Display a clear 'City not found. Please check spelling.' message when an invalid city is searched.
           Handle network errors gracefully with retry/fallback messaging." */}
      {activeError && (
        <div
          id="city-search-error"
          className="mt-3 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-sm flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-1 duration-200 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
            <span>{activeError}</span>
          </div>
          <button
            onClick={() => {
              setLocalError(null);
              if (onClearError) onClearError();
            }}
            className="text-rose-300 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Quick City Navigation Chips */}
      <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 text-xs no-scrollbar">
        <span className="text-slate-400 flex items-center gap-1 font-medium whitespace-nowrap pl-1">
          <MapPin className="w-3 h-3 text-slate-400" /> Popular:
        </span>
        {POPULAR_CITIES.map((city) => {
          const isCurrent = currentCityName === city.name;
          return (
            <button
              key={city.name}
              type="button"
              onClick={() => handleQuickCityClick(city)}
              className={`px-2.5 py-1 rounded-lg transition whitespace-nowrap border ${
                isCurrent
                  ? 'bg-white/25 text-white border-white/40 font-semibold backdrop-blur-md shadow-sm'
                  : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/15 border-white/15 backdrop-blur-md'
              }`}
            >
              {city.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
