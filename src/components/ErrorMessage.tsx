import React from 'react';
import { AlertCircle, RotateCcw, MapPin } from 'lucide-react';
import { GeoLocation } from '../types/weather';
import { POPULAR_LOCATIONS } from '../services/openMeteo';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  onSelectFallbackCity?: (loc: GeoLocation) => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  onSelectFallbackCity
}) => {
  return (
    <div className="my-8 p-6 sm:p-8 rounded-2xl border border-rose-500/30 bg-rose-950/20 backdrop-blur-md text-slate-100 shadow-xl max-w-2xl mx-auto text-center">
      <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>

      <h3 className="text-lg font-bold text-white mb-2">
        Weather Data Unavailable
      </h3>

      <p className="text-sm text-rose-200/90 mb-6 max-w-md mx-auto">
        {message || 'City not found. Please check spelling and try again.'}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-md transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry Request</span>
          </button>
        )}

        {onSelectFallbackCity && (
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="text-slate-400">Or try:</span>
            {POPULAR_LOCATIONS.slice(0, 3).map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => onSelectFallbackCity(loc)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs transition-colors"
              >
                <MapPin className="w-3 h-3 text-sky-400" />
                <span>{loc.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
