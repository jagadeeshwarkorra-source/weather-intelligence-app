import React from 'react';
import {
  MapPin,
  Wind,
  Compass,
  ArrowUp,
  ArrowDown,
  Clock,
  Droplets,
  Thermometer,
} from 'lucide-react';
import { GeocodingResult, TempUnit, WeatherData } from '../types';
import { formatTemp, formatWindSpeed, getWeatherCondition } from '../utils/weatherCodes';
import { WeatherIcon } from './WeatherIcon';

interface CurrentWeatherCardProps {
  weather: WeatherData;
  city: GeocodingResult;
  unit: TempUnit;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  weather,
  city,
  unit,
}) => {
  const current = weather.current_weather;
  const condition = getWeatherCondition(current.weathercode);
  const todayMax = weather.daily.temperature_2m_max[0] ?? current.temperature;
  const todayMin = weather.daily.temperature_2m_min[0] ?? current.temperature;

  // Derive humidity and apparent temperature from hourly data if available for current hour
  const currentHourTime = current.time ? current.time.slice(0, 13) : '';
  const hourlyIndex = weather.hourly?.time.findIndex((t) => t.startsWith(currentHourTime)) ?? -1;
  const apparentTemp =
    hourlyIndex !== -1 && weather.hourly?.apparent_temperature
      ? weather.hourly.apparent_temperature[hourlyIndex]
      : current.temperature;
  const humidity =
    hourlyIndex !== -1 && weather.hourly?.relative_humidity_2m
      ? weather.hourly.relative_humidity_2m[hourlyIndex]
      : null;
  const precipProb =
    weather.daily.precipitation_probability_max?.[0] ??
    (hourlyIndex !== -1 && weather.hourly?.precipitation_probability
      ? weather.hourly.precipitation_probability[hourlyIndex]
      : null);

  // Format local observation time
  const observationTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      id="current-weather-card"
      className="relative overflow-hidden rounded-3xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-2xl p-6 sm:p-8 transition-all"
    >
      {/* Dynamic ambient atmospheric background glow */}
      <div
        className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-35 pointer-events-none bg-gradient-to-br ${condition.gradient}`}
      />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-25 pointer-events-none bg-sky-500/25" />

      {/* Header with location and live status */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-white/10 text-sky-300 border border-white/20">
              <MapPin className="w-4 h-4" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
              {city.name}
            </h1>
            {city.country_code && (
              <span className="text-xs px-2 py-0.5 rounded-md font-semibold bg-white/10 text-slate-200 border border-white/15">
                {city.country_code}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-300 mt-1 flex items-center gap-2">
            <span>{[city.admin1, city.country].filter(Boolean).join(', ')}</span>
            <span className="text-slate-500">•</span>
            <span className="font-mono text-xs text-slate-300">
              {weather.latitude.toFixed(2)}°N, {weather.longitude.toFixed(2)}°E
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-xs text-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-300" />
            <span>Local Time: {observationTime}</span>
          </div>
          <span
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border backdrop-blur-md ${condition.badgeColor}`}
          >
            {condition.label}
          </span>
        </div>
      </div>

      {/* Core Temperature and Weather Display */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
        {/* Main Temperature Section */}
        <div className="lg:col-span-7 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative flex items-center justify-center p-5 rounded-2xl bg-white/10 border border-white/20 shadow-lg backdrop-blur-xl group">
            <div className="text-sky-300 transform group-hover:scale-110 transition duration-300">
              <WeatherIcon name={condition.iconName} className="w-16 h-16 sm:w-20 sm:h-20" />
            </div>
            {current.is_day === 0 && (
              <span className="absolute bottom-2 right-2 text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-indigo-950/80 text-indigo-200 border border-indigo-500/40 backdrop-blur-sm">
                Night
              </span>
            )}
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl sm:text-7xl font-extrabold tracking-tighter text-white font-display">
                {formatTemp(current.temperature, unit)}
              </span>
            </div>

            <p className="text-base text-slate-200 font-medium mt-1">
              {condition.description}
            </p>

            <div className="flex items-center gap-4 mt-3 text-xs sm:text-sm text-slate-300">
              <span className="flex items-center gap-1 font-medium text-amber-200 bg-amber-500/20 px-2.5 py-1 rounded-lg border border-amber-500/30 backdrop-blur-md">
                <ArrowUp className="w-3.5 h-3.5" /> High {formatTemp(todayMax, unit)}
              </span>
              <span className="flex items-center gap-1 font-medium text-sky-200 bg-sky-500/20 px-2.5 py-1 rounded-lg border border-sky-500/30 backdrop-blur-md">
                <ArrowDown className="w-3.5 h-3.5" /> Low {formatTemp(todayMin, unit)}
              </span>
            </div>
          </div>
        </div>

        {/* Secondary Weather Intelligence Pillars */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
          {/* Wind Speed & Direction */}
          <div className="p-4 rounded-2xl bg-white/[0.07] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 backdrop-blur-xl flex flex-col justify-between transition-all duration-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-300 text-xs">
              <span>Wind Speed</span>
              <Wind className="w-4 h-4 text-sky-300" />
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-white tracking-tight">
                {formatWindSpeed(current.windspeed, unit)}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs text-slate-300">
              <Compass className="w-3 h-3 text-slate-400" />
              <span>Direction: {Math.round(current.winddirection)}°</span>
            </div>
          </div>

          {/* Feels Like */}
          <div className="p-4 rounded-2xl bg-white/[0.07] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 backdrop-blur-xl flex flex-col justify-between transition-all duration-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-300 text-xs">
              <span>Feels Like</span>
              <Thermometer className="w-4 h-4 text-amber-300" />
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-white tracking-tight">
                {formatTemp(apparentTemp, unit)}
              </span>
            </div>
            <div className="mt-1 text-xs text-slate-300">
              {apparentTemp > current.temperature ? 'Warmer due to humidity' : 'Wind chill factor'}
            </div>
          </div>

          {/* Precipitation Chance */}
          <div className="p-4 rounded-2xl bg-white/[0.07] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 backdrop-blur-xl flex flex-col justify-between transition-all duration-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-300 text-xs">
              <span>Rain Probability</span>
              <Droplets className="w-4 h-4 text-blue-300" />
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-white tracking-tight">
                {precipProb !== null ? `${precipProb}%` : 'Low'}
              </span>
            </div>
            <div className="mt-1 text-xs text-slate-300">
              {precipProb && precipProb > 40 ? 'Precipitation expected' : 'Minimal rain risk'}
            </div>
          </div>

          {/* Relative Humidity */}
          <div className="p-4 rounded-2xl bg-white/[0.07] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 backdrop-blur-xl flex flex-col justify-between transition-all duration-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-300 text-xs">
              <span>Humidity</span>
              <Droplets className="w-4 h-4 text-teal-300" />
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-white tracking-tight">
                {humidity !== null ? `${humidity}%` : '55%'}
              </span>
            </div>
            <div className="mt-1 text-xs text-slate-300">
              Timezone: {weather.timezone.split('/')[1]?.replace('_', ' ') || weather.timezone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
