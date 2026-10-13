import React from 'react';
import {
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Umbrella,
  Wind,
  ThermometerSnowflake,
  Sun,
  ShieldAlert
} from 'lucide-react';
import { PlanningRecommendation } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface RecommendationBannerProps {
  recommendations: PlanningRecommendation[];
}

export const RecommendationBanner: React.FC<RecommendationBannerProps> = ({
  recommendations
}) => {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <section aria-labelledby="planning-recommendations-title" className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 id="planning-recommendations-title" className="text-base font-bold text-slate-100">
              Planning Recommendations Engine
            </h3>
            <p className="text-xs text-slate-400">
              Dynamic rule-based operational advice derived from current meteorological thresholds
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {recommendations.map((rec) => {
          let badgeColor = 'bg-slate-800 text-slate-200 border-slate-700';
          let borderAccent = 'border-slate-700/80';
          let bgCard = 'bg-slate-800/60';
          let iconColor = 'text-sky-400';

          if (rec.severity === 'alert') {
            badgeColor = 'bg-rose-500/15 text-rose-300 border-rose-500/30';
            borderAccent = 'border-rose-500/30';
            bgCard = 'bg-rose-950/20';
            iconColor = 'text-rose-400';
          } else if (rec.severity === 'warning') {
            badgeColor = 'bg-amber-500/15 text-amber-300 border-amber-500/30';
            borderAccent = 'border-amber-500/30';
            bgCard = 'bg-amber-950/20';
            iconColor = 'text-amber-400';
          } else if (rec.severity === 'caution') {
            badgeColor = 'bg-blue-500/15 text-blue-300 border-blue-500/30';
            borderAccent = 'border-blue-500/30';
            bgCard = 'bg-blue-950/20';
            iconColor = 'text-blue-400';
          } else if (rec.severity === 'success') {
            badgeColor = 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
            borderAccent = 'border-emerald-500/30';
            bgCard = 'bg-emerald-950/20';
            iconColor = 'text-emerald-400';
          }

          return (
            <div
              key={rec.id}
              className={`p-4 rounded-xl border ${borderAccent} ${bgCard} backdrop-blur-sm shadow-md flex flex-col justify-between transition-all hover:bg-slate-800/80`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg bg-slate-900/80 ${iconColor} border border-slate-700/60`}>
                      <WeatherIcon name={rec.iconName} className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-200">
                      {rec.title}
                    </span>
                  </div>

                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md border ${badgeColor}`}>
                    {rec.severity}
                  </span>
                </div>

                <p className="text-sm font-medium text-slate-100 leading-snug">
                  "{rec.advice}"
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-700/40 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono tabular-nums text-[11px]">
                  {rec.metricContext}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-500">
                  Automated Rule
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
