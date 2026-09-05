import React, { useState, useEffect, useCallback } from 'react';
import { GeocodingResult, TempUnit, WeatherData } from './types';
import { DEFAULT_CITY, fetchWeatherData, searchCities, WeatherApiError } from './services/weatherApi';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { Forecast7Day } from './components/Forecast7Day';
import { TemperatureTrendChart } from './components/TemperatureTrendChart';
import { SmartPlanningCard } from './components/SmartPlanningCard';
import { SelectedDayBanner } from './components/SelectedDayBanner';
import { WeatherSkeleton } from './components/WeatherSkeleton';
import { ErrorState } from './components/ErrorState';
import { Globe, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentCity, setCurrentCity] = useState<GeocodingResult>(DEFAULT_CITY);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isNotFoundError, setIsNotFoundError] = useState<boolean>(false);
  const [unit, setUnit] = useState<TempUnit>('C');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [isLocating, setIsLocating] = useState<boolean>(false);

  // Fetch weather data for the specified coordinates
  const loadWeatherForCity = useCallback(async (city: GeocodingResult) => {
    setIsLoading(true);
    setErrorMessage(null);
    setIsNotFoundError(false);

    try {
      const data = await fetchWeatherData(city.latitude, city.longitude);
      setWeather(data);
      setCurrentCity(city);
      setSelectedDayIndex(0);
    } catch (err: any) {
      const msg =
        err instanceof WeatherApiError
          ? err.message
          : 'Unable to load weather forecast. Please check your connection.';
      setErrorMessage(msg);
      setIsNotFoundError(err?.isNotFound || false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadWeatherForCity(DEFAULT_CITY);
  }, [loadWeatherForCity]);

  // Handle city selection from search bar
  const handleSelectCity = (city: GeocodingResult) => {
    loadWeatherForCity(city);
  };

  // Toggle °C / °F
  const handleToggleUnit = () => {
    setUnit((prev) => (prev === 'C' ? 'F' : 'C'));
  };

  // Manual refresh
  const handleRefresh = () => {
    if (currentCity) {
      loadWeatherForCity(currentCity);
    }
  };

  // Geolocation lookup
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setErrorMessage('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setErrorMessage(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Attempt reverse geocoding via Open-Meteo or fall back to GPS label
          const locationCity: GeocodingResult = {
            id: Math.round(latitude * 1000 + longitude),
            name: 'Local Coordinate Area',
            latitude,
            longitude,
            country: 'GPS Location',
          };

          // Try reverse lookup with Open-Meteo search if possible or load directly
          await loadWeatherForCity(locationCity);
        } catch {
          setErrorMessage('Could not load forecast for your current GPS position.');
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        setIsLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setErrorMessage('Location permission was denied. You can still search for any city.');
        } else {
          setErrorMessage('Unable to determine location. Please search for your city by name.');
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0a0f1d] to-[#0f172a] text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-sky-500/30 selection:text-sky-200">
      {/* Ambient background light orbs for Frosted Glass refraction */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-sky-500/15 rounded-full blur-[140px] opacity-70" />
        <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-indigo-600/15 rounded-full blur-[140px] opacity-60" />
        <div className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[150px] opacity-60" />
      </div>

      {/* Top Navbar */}
      <Navbar
        unit={unit}
        onToggleUnit={handleToggleUnit}
        onRefresh={handleRefresh}
        isLoading={isLoading}
        onUseCurrentLocation={handleUseCurrentLocation}
        isLocating={isLocating}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Geocoding Bar */}
        <SearchBar
          onSelectCity={handleSelectCity}
          isLoading={isLoading}
          currentCityName={currentCity.name}
          errorMessage={isNotFoundError ? errorMessage : null}
          onClearError={() => {
            setErrorMessage(null);
            setIsNotFoundError(false);
          }}
        />

        {/* Global Network Error / Fallback State */}
        {errorMessage && !isNotFoundError ? (
          <ErrorState
            message={errorMessage}
            isNotFound={false}
            onRetry={() => loadWeatherForCity(currentCity)}
            onResetToDefault={() => loadWeatherForCity(DEFAULT_CITY)}
          />
        ) : isLoading && !weather ? (
          <WeatherSkeleton />
        ) : weather ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Current Weather Display */}
            <CurrentWeatherCard
              weather={weather}
              city={currentCity}
              unit={unit}
            />

            {/* Selected Day Focus Spotlight Banner */}
            <SelectedDayBanner
              daily={weather.daily}
              selectedIndex={selectedDayIndex}
              unit={unit}
            />

            {/* 7-Day Forecast Cards */}
            <Forecast7Day
              daily={weather.daily}
              unit={unit}
              selectedDayIndex={selectedDayIndex}
              onSelectDay={(idx) => setSelectedDayIndex(idx)}
            />

            {/* 7-Day Temperature Trend Chart (Recharts) */}
            <TemperatureTrendChart
              daily={weather.daily}
              unit={unit}
              selectedDayIndex={selectedDayIndex}
              onSelectDay={(idx) => setSelectedDayIndex(idx)}
            />

            {/* Smart Planning Recommendations */}
            <SmartPlanningCard
              current={weather.current_weather}
              daily={weather.daily}
            />
          </div>
        ) : null}
      </main>

      {/* Clean Modern Frosted Footer */}
      <footer className="w-full border-t border-white/10 bg-slate-950/40 backdrop-blur-2xl mt-16 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-sky-400" />
            <span>
              Real-time atmospheric modeling powered by{' '}
              <a
                href="https://open-meteo.com/"
                target="_blank"
                rel="noreferrer"
                className="text-slate-300 hover:text-sky-300 underline transition"
              >
                Open-Meteo
              </a>{' '}
              (WMO compliant, no API key required)
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Secure Client-Side Engine
            </span>
            <span>•</span>
            <span>7-Day Resolution</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
