import React from 'react';
import { CloudSun, RotateCw, Sparkles, Navigation } from 'lucide-react';
import { TempUnit } from '../types';

interface NavbarProps {
  unit: TempUnit;
  onToggleUnit: () => void;
  onRefresh: () => void;
  isLoading: boolean;
  onUseCurrentLocation: () => void;
  isLocating: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  unit,
  onToggleUnit,
  onRefresh,
  isLoading,
  onUseCurrentLocation,
  isLocating,
}) => {
  return (
    <header className="w-full border-b border-white/10 bg-slate-950/40 backdrop-blur-2xl sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-400/90 to-indigo-500/90 flex items-center justify-center shadow-lg shadow-sky-500/20 ring-1 ring-white/30">
            <CloudSun className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white font-sans">
                Weather Intelligence
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-white/10 text-sky-300 border border-white/15 backdrop-blur-md">
                <Sparkles className="w-3 h-3" /> Live
              </span>
            </div>
            <p className="text-xs text-slate-300 hidden sm:block">
              Open-Meteo High-Resolution Atmospheric Engine
            </p>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Current Location Button */}
          <button
            id="use-my-location-btn"
            onClick={onUseCurrentLocation}
            disabled={isLocating || isLoading}
            title="Locate via GPS"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-200 bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/25 backdrop-blur-xl transition shadow-sm disabled:opacity-50"
          >
            <Navigation className={`w-3.5 h-3.5 text-sky-300 ${isLocating ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">Current Location</span>
          </button>

          {/* Unit Toggle */}
          <div className="flex items-center bg-white/10 p-1 rounded-xl border border-white/15 backdrop-blur-xl shadow-inner">
            <button
              id="unit-celsius-btn"
              onClick={() => unit !== 'C' && onToggleUnit()}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                unit === 'C'
                  ? 'bg-white/20 text-white shadow-sm border border-white/30 backdrop-blur-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              °C
            </button>
            <button
              id="unit-fahrenheit-btn"
              onClick={() => unit !== 'F' && onToggleUnit()}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                unit === 'F'
                  ? 'bg-white/20 text-white shadow-sm border border-white/30 backdrop-blur-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              °F
            </button>
          </div>

          {/* Refresh Button */}
          <button
            id="refresh-weather-btn"
            onClick={onRefresh}
            disabled={isLoading}
            title="Refresh current forecast"
            className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/25 backdrop-blur-xl transition disabled:opacity-50"
          >
            <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-sky-300' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
};
