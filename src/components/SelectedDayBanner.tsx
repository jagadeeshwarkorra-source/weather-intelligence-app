import React from 'react';
import { Calendar, ArrowUp, ArrowDown, Droplets, Sun, Sparkles } from 'lucide-react';
import { DailyForecast, TempUnit } from '../types';
import { formatTemp, getWeatherCondition } from '../utils/weatherCodes';
import { WeatherIcon } from './WeatherIcon';

interface SelectedDayBannerProps {
  daily: DailyForecast;
  selectedIndex: number;
  unit: TempUnit;
}

export const SelectedDayBanner: React.FC<SelectedDayBannerProps> = ({
  daily,
  selectedIndex,
  unit,
}) => {
  if (selectedIndex < 0 || selectedIndex >= daily.time.length) return null;

  const dateStr = daily.time[selectedIndex];
  const dateObj = new Date(dateStr + 'T00:00:00');
  const isToday = selectedIndex === 0;
  const isTomorrow = selectedIndex === 1;

  const dayTitle = isToday
    ? 'Today'
    : isTomorrow
    ? 'Tomorrow'
    : dateObj.toLocaleDateString([], { weekday: 'long' });

  const formattedDate = dateObj.toLocaleDateString([], {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const weathercode = daily.weathercode[selectedIndex];
  const condition = getWeatherCondition(weathercode);
  const maxTemp = daily.temperature_2m_max[selectedIndex];
  const minTemp = daily.temperature_2m_min[selectedIndex];
  const precipProb = daily.precipitation_probability_max?.[selectedIndex];
  const uvIndex = daily.uv_index_max?.[selectedIndex];

  return (
    <div
      id="selected-day-spotlight-banner"
      className="p-5 rounded-2xl bg-white/10 border border-white/20 shadow-xl backdrop-blur-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-white/10 text-sky-300 border border-white/20 backdrop-blur-md">
          <WeatherIcon name={condition.iconName} className="w-7 h-7" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-base font-sans">{dayTitle}</span>
            <span className="text-xs text-slate-300 font-mono">({formattedDate})</span>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/15 text-sky-200 border border-white/20 backdrop-blur-md">
              Selected Focus
            </span>
          </div>
          <p className="text-xs text-slate-200 mt-0.5">{condition.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-slate-200">
          <span className="text-amber-300 flex items-center gap-0.5 font-bold">
            <ArrowUp className="w-3.5 h-3.5" /> {formatTemp(maxTemp, unit)}
          </span>
          <span className="text-slate-400">/</span>
          <span className="text-sky-300 flex items-center gap-0.5 font-bold">
            <ArrowDown className="w-3.5 h-3.5" /> {formatTemp(minTemp, unit)}
          </span>
        </div>

        {precipProb !== undefined && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-blue-200">
            <Droplets className="w-3.5 h-3.5 text-blue-300" />
            <span>Rain Risk: {precipProb}%</span>
          </div>
        )}

        {uvIndex !== undefined && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-amber-200">
            <Sun className="w-3.5 h-3.5 text-amber-300" />
            <span>UV Index: {Math.round(uvIndex)}</span>
          </div>
        )}
      </div>
    </div>
  );
};
