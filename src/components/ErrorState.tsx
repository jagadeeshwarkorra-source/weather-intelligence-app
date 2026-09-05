import React from 'react';
import { AlertTriangle, WifiOff, RefreshCw, MapPinOff } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  isNotFound?: boolean;
  onRetry: () => void;
  onResetToDefault?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message,
  isNotFound,
  onRetry,
  onResetToDefault,
}) => {
  return (
    <div
      id="weather-error-container"
      className="w-full max-w-xl mx-auto my-12 p-8 rounded-3xl bg-white/10 border border-rose-500/30 shadow-2xl backdrop-blur-2xl text-center flex flex-col items-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-300 mb-5 shadow-lg shadow-rose-500/10 backdrop-blur-md">
        {isNotFound ? (
          <MapPinOff className="w-8 h-8" />
        ) : (
          <WifiOff className="w-8 h-8" />
        )}
      </div>

      <h3 className="text-xl font-bold text-white mb-2 font-sans">
        {isNotFound ? 'Location Not Found' : 'Weather Service Unavailable'}
      </h3>

      <p className="text-sm text-slate-200 max-w-md mb-6 leading-relaxed">
        {message}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          id="retry-fetch-btn"
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-sky-500/80 hover:bg-sky-500 text-white shadow-lg shadow-sky-500/20 border border-white/20 backdrop-blur-md transition"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry Connection</span>
        </button>

        {onResetToDefault && (
          <button
            id="reset-default-city-btn"
            onClick={onResetToDefault}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20 backdrop-blur-md transition"
          >
            <span>Reset to London</span>
          </button>
        )}
      </div>
    </div>
  );
};
