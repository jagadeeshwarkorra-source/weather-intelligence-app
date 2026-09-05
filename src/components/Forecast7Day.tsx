import React from 'react';
import { Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import { DailyForecast, TempUnit } from '../types';
import { formatTemp, getWeatherCondition } from '../utils/weatherCodes';
import { WeatherIcon } from './WeatherIcon';

interface Forecast7DayProps {
  daily: DailyForecast;
  unit: TempUnit;
  selectedDayIndex: number;
  onSelectDay: (index: number) => void;
}

export const Forecast7Day: React.FC<Forecast7DayProps> = ({
  daily,
  unit,
  selectedDayIndex,
  onSelectDay,
}) => {
  const daysCount = Math.min(daily.time.length, 7);

  // Compute absolute min & max across 7 days for the visual range bar
  const allMax = Math.max(...daily.temperature_2m_max.slice(0, daysCount));
  const allMin = Math.min(...daily.temperature_2m_min.slice(0, daysCount));
  const totalRange = Math.max(1, allMax - allMin);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-sky-400" />
          <h2 className="text-xl font-bold tracking-tight text-white font-sans">
            7-Day Forecast
          </h2>
        </div>
        <span className="text-xs text-slate-300">
          Click any day to highlight on trend chart
        </span>
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {Array.from({ length: daysCount }).map((_, index) => {
          const dateStr = daily.time[index];
          const dateObj = new Date(dateStr + 'T00:00:00');
          const isToday = index === 0;

          const dayName = isToday
            ? 'Today'
            : dateObj.toLocaleDateString([], { weekday: 'short' });
          const formattedDate = dateObj.toLocaleDateString([], {
            month: 'short',
            day: 'numeric',
          });

          const weathercode = daily.weathercode[index];
          const condition = getWeatherCondition(weathercode);
          const maxTemp = daily.temperature_2m_max[index];
          const minTemp = daily.temperature_2m_min[index];
          const isSelected = selectedDayIndex === index;

          // Compute bar percentage offsets
          const leftPercent = Math.max(0, ((minTemp - allMin) / totalRange) * 100);
          const widthPercent = Math.max(12, ((maxTemp - minTemp) / totalRange) * 100);

          return (
            <button
              key={dateStr}
              type="button"
              id={`forecast-day-card-${index}`}
              onClick={() => onSelectDay(index)}
              className={`text-left p-4 rounded-2xl transition-all duration-200 flex flex-col justify-between relative overflow-hidden group border backdrop-blur-2xl ${
                isSelected
                  ? 'bg-white/20 border-white/40 shadow-xl shadow-sky-500/15 ring-2 ring-white/30 -translate-y-1'
                  : 'bg-white/[0.08] border-white/15 hover:bg-white/[0.14] hover:border-white/30 shadow-lg shadow-black/10'
              }`}
            >
              {/* Day & Date Header */}
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`font-semibold text-sm ${
                      isToday ? 'text-sky-300 font-bold' : 'text-slate-100'
                    }`}
                  >
                    {dayName}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-sky-300 animate-pulse shadow-sm shadow-sky-300" />
                  )}
                </div>
                <span className="text-[11px] text-slate-300 block mt-0.5 font-mono">
                  {formattedDate}
                </span>
              </div>

              {/* Weather Condition Icon */}
              <div className="my-4 flex flex-col items-center justify-center">
                <div className="p-2.5 rounded-xl bg-white/10 group-hover:scale-110 transition duration-200 text-sky-300 border border-white/10">
                  <WeatherIcon name={condition.iconName} className="w-8 h-8" />
                </div>
                <span className="text-xs font-medium text-slate-200 mt-2 text-center line-clamp-1">
                  {condition.label}
                </span>
              </div>

              {/* Temperature Range */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-amber-300 flex items-center gap-0.5">
                    <ArrowUp className="w-3 h-3" />
                    {formatTemp(maxTemp, unit)}
                  </span>
                  <span className="text-sky-300 flex items-center gap-0.5">
                    <ArrowDown className="w-3 h-3" />
                    {formatTemp(minTemp, unit)}
                  </span>
                </div>

                {/* Relative temperature horizontal track */}
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative border border-white/10">
                  <div
                    className="absolute h-full rounded-full bg-gradient-to-r from-sky-400 via-amber-300 to-orange-400"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
