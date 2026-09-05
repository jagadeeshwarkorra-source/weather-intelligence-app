import React from 'react';
import { Lightbulb, CheckCircle2, AlertTriangle, AlertOctagon, Sparkles } from 'lucide-react';
import { ActivityRecommendation, CurrentWeather, DailyForecast } from '../types';
import { calculateComfortScore, generateSmartRecommendations } from '../utils/recommendations';
import { WeatherIcon } from './WeatherIcon';

interface SmartPlanningCardProps {
  current: CurrentWeather;
  daily?: DailyForecast;
}

export const SmartPlanningCard: React.FC<SmartPlanningCardProps> = ({ current, daily }) => {
  const recommendations = generateSmartRecommendations(current, daily);
  const comfort = calculateComfortScore(current);

  const getStatusBadge = (status: ActivityRecommendation['status']) => {
    switch (status) {
      case 'ideal':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 backdrop-blur-md">
            <CheckCircle2 className="w-3 h-3" /> Ideal
          </span>
        );
      case 'caution':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30 backdrop-blur-md">
            <AlertTriangle className="w-3 h-3" /> Caution
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-200 border border-rose-400/30 backdrop-blur-md">
            <AlertOctagon className="w-3 h-3" /> Advisory
          </span>
        );
    }
  };

  const getBorderColor = (status: ActivityRecommendation['status']) => {
    switch (status) {
      case 'ideal':
        return 'border-white/15 hover:border-emerald-400/40 bg-white/[0.07] hover:bg-white/[0.12] backdrop-blur-xl shadow-md';
      case 'caution':
        return 'border-amber-400/30 hover:border-amber-400/50 bg-amber-500/10 hover:bg-amber-500/15 backdrop-blur-xl shadow-md';
      case 'warning':
        return 'border-rose-400/30 hover:border-rose-400/50 bg-rose-500/10 hover:bg-rose-500/15 backdrop-blur-xl shadow-md';
    }
  };

  return (
    <div
      id="smart-planning-recommendations-card"
      className="p-6 sm:p-8 rounded-3xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-2xl"
    >
      {/* Header with Comfort Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-white/10 text-amber-300 border border-white/20 backdrop-blur-md">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white font-sans">
              Smart Planning Recommendations
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Automated intelligence tailored to current atmospheric conditions and outdoor safety
          </p>
        </div>

        {/* Comfort Index Meter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/10 border border-white/15 shadow-sm backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-sky-300" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300">
                Comfort Index
              </span>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-white font-mono">
                  {comfort.score}/100
                </span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border backdrop-blur-sm ${comfort.tone}`}>
                  {comfort.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            id={`recommendation-item-${rec.id}`}
            className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${getBorderColor(
              rec.status
            )}`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-white/10 text-sky-300 border border-white/15 backdrop-blur-md">
                    <WeatherIcon name={rec.iconName} className="w-4 h-4" />
                  </div>
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-300">
                    {rec.title}
                  </span>
                </div>
                {getStatusBadge(rec.status)}
              </div>

              <h3 className="text-base font-bold text-white mb-1.5 leading-snug">
                {rec.summary}
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                {rec.details}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
