import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { TrendingUp, ThermometerSnowflake, Flame } from 'lucide-react';
import { DailyForecast, TempUnit } from '../types';
import { formatTemp, getRawTempValue, getWeatherCondition } from '../utils/weatherCodes';

interface TemperatureTrendChartProps {
  daily: DailyForecast;
  unit: TempUnit;
  selectedDayIndex: number;
  onSelectDay: (index: number) => void;
}

interface ChartDataPoint {
  index: number;
  day: string;
  date: string;
  fullDate: string;
  high: number;
  low: number;
  condition: string;
  weathercode: number;
}

export const TemperatureTrendChart: React.FC<TemperatureTrendChartProps> = ({
  daily,
  unit,
  selectedDayIndex,
  onSelectDay,
}) => {
  const daysCount = Math.min(daily.time.length, 7);

  const chartData: ChartDataPoint[] = [];

  for (let i = 0; i < daysCount; i++) {
    const dateStr = daily.time[i];
    const dateObj = new Date(dateStr + 'T00:00:00');
    const dayName = i === 0 ? 'Today' : dateObj.toLocaleDateString([], { weekday: 'short' });
    const formattedDate = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' });
    const weathercode = daily.weathercode[i];
    const condition = getWeatherCondition(weathercode);

    const highRaw = daily.temperature_2m_max[i];
    const lowRaw = daily.temperature_2m_min[i];

    chartData.push({
      index: i,
      day: dayName,
      date: formattedDate,
      fullDate: dateStr,
      high: getRawTempValue(highRaw, unit),
      low: getRawTempValue(lowRaw, unit),
      condition: condition.label,
      weathercode,
    });
  }

  // Calculate high and low peak across the 7 days
  const allHighs = chartData.map((d) => d.high);
  const allLows = chartData.map((d) => d.low);
  const maxTemp = Math.max(...allHighs);
  const minTemp = Math.min(...allLows);
  const avgTemp = Math.round(((maxTemp + minTemp) / 2) * 10) / 10;

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: ChartDataPoint = payload[0].payload;
      return (
        <div className="bg-slate-900/85 border border-white/20 p-3.5 rounded-2xl shadow-2xl backdrop-blur-2xl text-xs">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-2 mb-2">
            <span className="font-bold text-white font-sans text-sm">
              {data.day} ({data.date})
            </span>
            <span className="text-sky-300 font-medium">{data.condition}</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-6">
              <span className="text-amber-300 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" /> High:
              </span>
              <span className="font-bold text-slate-100 font-mono">
                {data.high}°{unit}
              </span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span className="text-sky-300 flex items-center gap-1">
                <ThermometerSnowflake className="w-3.5 h-3.5" /> Low:
              </span>
              <span className="font-bold text-slate-100 font-mono">
                {data.low}°{unit}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      id="temperature-trend-chart-card"
      className="p-6 rounded-3xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-2xl"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-sky-400" />
            <h2 className="text-xl font-bold tracking-tight text-white font-sans">
              7-Day Temperature Trend
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Dynamic thermal trajectory comparing daily maximums and minimums
          </p>
        </div>

        {/* Summary Badges */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-xs backdrop-blur-md">
            <span className="text-slate-300 mr-1.5">Week Peak:</span>
            <span className="font-bold text-amber-300 font-mono">
              {maxTemp}°{unit}
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-sky-500/20 border border-sky-500/30 text-xs backdrop-blur-md">
            <span className="text-slate-300 mr-1.5">Week Trough:</span>
            <span className="font-bold text-sky-300 font-mono">
              {minTemp}°{unit}
            </span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 15, right: 15, left: -20, bottom: 0 }}
            onClick={(state) => {
              if (state && state.activeTooltipIndex !== undefined) {
                onSelectDay(state.activeTooltipIndex);
              }
            }}
          >
            <defs>
              {/* Amber gradient for Highs */}
              <linearGradient id="gradientHigh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
              </linearGradient>
              {/* Sky gradient for Lows */}
              <linearGradient id="gradientLow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#ffffff"
              opacity={0.1}
              vertical={false}
            />

            <XAxis
              dataKey="day"
              stroke="#94a3b8"
              tickLine={false}
              axisLine={{ stroke: '#ffffff', strokeOpacity: 0.15 }}
              tick={{ fill: '#cbd5e1', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />

            <YAxis
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#cbd5e1', fontSize: 11, fontFamily: 'monospace' }}
              domain={['dataMin - 2', 'dataMax + 2']}
              tickFormatter={(v) => `${Math.round(v)}°`}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Daily High Area */}
            <Area
              type="monotone"
              dataKey="high"
              name="High Temp"
              stroke="#f59e0b"
              strokeWidth={2.5}
              fill="url(#gradientHigh)"
              dot={{ r: 4, fill: '#f59e0b', stroke: '#0f172a', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#f59e0b', stroke: '#ffffff', strokeWidth: 2 }}
            />

            {/* Daily Low Area */}
            <Area
              type="monotone"
              dataKey="low"
              name="Low Temp"
              stroke="#38bdf8"
              strokeWidth={2}
              fill="url(#gradientLow)"
              dot={{ r: 3.5, fill: '#38bdf8', stroke: '#0f172a', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#38bdf8', stroke: '#ffffff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend & interaction hint */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 mt-2 border-t border-white/10 text-xs text-slate-300">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
            <span className="text-slate-200 font-medium">Daily High Temp (°{unit})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-sky-400 shadow-sm shadow-sky-400/50" />
            <span className="text-slate-200 font-medium">Daily Low Temp (°{unit})</span>
          </div>
        </div>

        <div className="text-slate-400 font-mono text-[11px]">
          Median: {avgTemp}°{unit}
        </div>
      </div>
    </div>
  );
};
