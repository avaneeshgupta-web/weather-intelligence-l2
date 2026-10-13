import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Central Visual Spinner Banner */}
      <div className="flex items-center justify-center p-6 bg-slate-800/40 border border-slate-700/60 rounded-2xl gap-3">
        <Loader2 className="w-5 h-5 text-sky-400 animate-spin" />
        <span className="text-sm font-medium text-slate-300">
          Fetching high-resolution atmospheric models from Open-Meteo...
        </span>
      </div>

      {/* Current Weather Card Skeleton */}
      <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-6 sm:p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="h-4 w-32 bg-slate-700/60 rounded" />
            <div className="h-8 w-56 bg-slate-700 rounded" />
            <div className="h-4 w-40 bg-slate-700/60 rounded" />
          </div>
          <div className="h-8 w-28 bg-slate-700 rounded-xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-slate-700/60" />
            <div className="space-y-3">
              <div className="h-14 w-36 bg-slate-700 rounded" />
              <div className="h-4 w-28 bg-slate-700/60 rounded" />
            </div>
          </div>
          <div className="md:col-span-5 h-28 bg-slate-700/40 rounded-xl" />
        </div>

        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-700/50">
          <div className="h-16 bg-slate-700/40 rounded-xl" />
          <div className="h-16 bg-slate-700/40 rounded-xl" />
          <div className="h-16 bg-slate-700/40 rounded-xl" />
        </div>
      </div>

      {/* Recommendations Banner Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="h-28 bg-slate-800/40 border border-slate-800 rounded-xl" />
        <div className="h-28 bg-slate-800/40 border border-slate-800 rounded-xl" />
        <div className="h-28 bg-slate-800/40 border border-slate-800 rounded-xl" />
      </div>

      {/* 7-Day Forecast Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="h-44 bg-slate-800/40 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="h-4 w-16 bg-slate-700/60 rounded" />
            <div className="h-10 w-10 bg-slate-700/60 rounded-lg mx-auto" />
            <div className="h-4 w-20 bg-slate-700/60 rounded mx-auto" />
            <div className="h-2 w-full bg-slate-700/40 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};
