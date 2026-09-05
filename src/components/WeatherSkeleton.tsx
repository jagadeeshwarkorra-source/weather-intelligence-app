import React from 'react';

export const WeatherSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-pulse">
      {/* Search bar placeholder */}
      <div className="w-full max-w-3xl mx-auto h-14 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20" />

      {/* Hero card skeleton */}
      <div className="h-80 w-full rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-8 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="w-48 h-8 bg-white/15 rounded-lg" />
            <div className="w-32 h-4 bg-white/10 rounded" />
          </div>
          <div className="w-24 h-8 bg-white/15 rounded-lg" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex items-center gap-6">
            <div className="w-20 h-20 bg-white/15 rounded-2xl" />
            <div className="space-y-2">
              <div className="w-36 h-12 bg-white/15 rounded-lg" />
              <div className="w-28 h-4 bg-white/10 rounded" />
            </div>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="h-24 bg-white/5 rounded-2xl border border-white/10" />
            <div className="h-24 bg-white/5 rounded-2xl border border-white/10" />
            <div className="h-24 bg-white/5 rounded-2xl border border-white/10" />
            <div className="h-24 bg-white/5 rounded-2xl border border-white/10" />
          </div>
        </div>
      </div>

      {/* 7-Day Forecast skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="h-44 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 p-4 flex flex-col justify-between"
          >
            <div className="w-16 h-4 bg-white/15 rounded" />
            <div className="w-10 h-10 bg-white/15 rounded-xl mx-auto" />
            <div className="w-full h-3 bg-white/15 rounded-full" />
          </div>
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="h-80 w-full rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-6" />
    </div>
  );
};
