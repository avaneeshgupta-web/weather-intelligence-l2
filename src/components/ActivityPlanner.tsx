import React from 'react';
import { ShieldCheck, Activity, Bike, Coffee, Footprints } from 'lucide-react';
import { ActivityFeasibility } from '../types/weather';

interface ActivityPlannerProps {
  activities: ActivityFeasibility[];
}

export const ActivityPlanner: React.FC<ActivityPlannerProps> = ({ activities }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Activity':
        return <Activity className="w-4 h-4" />;
      case 'Bike':
        return <Bike className="w-4 h-4" />;
      case 'Coffee':
        return <Coffee className="w-4 h-4" />;
      case 'Footprints':
        return <Footprints className="w-4 h-4" />;
      default:
        return <ShieldCheck className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: ActivityFeasibility['status'], color: ActivityFeasibility['statusColor']) => {
    if (color === 'emerald') {
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    }
    if (color === 'sky') {
      return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
    }
    if (color === 'amber') {
      return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    }
    return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
  };

  return (
    <section aria-labelledby="activity-planner-title" className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 id="activity-planner-title" className="text-base font-bold text-slate-100">
              Outdoor Activity Suitability
            </h3>
            <p className="text-xs text-slate-400">
              Evaluated against humidity, precipitation risk, and thermal comfort
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {activities.map((act) => (
          <div
            key={act.name}
            className="p-4 rounded-xl border border-slate-800 bg-slate-850/70 hover:bg-slate-800/80 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-slate-800 text-sky-400 border border-slate-700">
                    {getIcon(act.iconName)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 leading-tight">
                      {act.name}
                    </h4>
                    <span className="text-[10px] text-slate-400">{act.category}</span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md border ${getStatusBadge(
                    act.status,
                    act.statusColor
                  )}`}
                >
                  {act.status}
                </span>
              </div>

              <p className="text-xs text-slate-300 font-medium">
                {act.reason}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
