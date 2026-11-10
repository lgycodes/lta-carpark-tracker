import React from 'react';
import { Carpark } from '../types/carpark';
import { Star, Zap, Navigation2, ArrowUpRight, ShieldCheck, ChevronRight } from 'lucide-react';

interface CarparkCardProps {
  carpark: Carpark;
  isSelected: boolean;
  onSelect: (carpark: Carpark) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  vehicleType: 'car' | 'motorcycle' | 'heavy';
}

export const CarparkCard: React.FC<CarparkCardProps> = ({
  carpark,
  isSelected,
  onSelect,
  onToggleFavorite,
  vehicleType,
}) => {
  const lotInfo =
    vehicleType === 'motorcycle' && carpark.lots.motorcycle
      ? carpark.lots.motorcycle
      : vehicleType === 'heavy' && carpark.lots.heavy
      ? carpark.lots.heavy
      : carpark.lots.car;

  const avail = lotInfo.available;
  const total = lotInfo.total;
  const occupancyPercent = total > 0 ? Math.round(((total - avail) / total) * 100) : 100;
  const availRatio = total > 0 ? avail / total : 0;

  // Semantic color for status
  let statusColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  let barColor = 'bg-emerald-500';
  let statusLabel = 'Ample Lots';

  if (avail <= 10) {
    statusColor = 'text-rose-700 bg-rose-50 border-rose-200';
    barColor = 'bg-rose-500';
    statusLabel = 'Critical / Full';
  } else if (availRatio < 0.25 || avail < 35) {
    statusColor = 'text-amber-800 bg-amber-50 border-amber-200';
    barColor = 'bg-amber-500';
    statusLabel = 'Limited Lots';
  }

  // Open directions link in Google Maps
  const handleDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://www.google.com/maps/dir/?api=1&destination=${carpark.coordinates.lat},${carpark.coordinates.lng}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={() => onSelect(carpark)}
      className={`group relative p-4 rounded-xl border transition-all duration-150 cursor-pointer text-left ${
        isSelected
          ? 'bg-emerald-50/40 border-emerald-500 shadow-sm ring-1 ring-emerald-500'
          : 'bg-white hover:bg-slate-50/70 border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Top Header: Unboxed metadata with typographic separators */}
      <div className="flex items-center justify-between gap-2 mb-2 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 truncate">
          <span className="font-semibold text-slate-700">{carpark.id}</span>
          <span aria-hidden="true">·</span>
          <span>{carpark.agency}</span>
          <span aria-hidden="true">·</span>
          <span>{carpark.region}</span>
          {carpark.distance_km !== undefined && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-slate-600">{carpark.distance_km} km</span>
            </>
          )}
        </div>

        {/* Favorite star */}
        <button
          onClick={(e) => onToggleFavorite(carpark.id, e)}
          title={carpark.is_favorite ? 'Remove from favorites' : 'Save to favorites'}
          className={`p-1.5 rounded-md hover:bg-slate-100 transition-colors ${
            carpark.is_favorite ? 'text-amber-500 fill-amber-500' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Star className={`w-4 h-4 ${carpark.is_favorite ? 'fill-amber-400 text-amber-500' : ''}`} />
        </button>
      </div>

      {/* Carpark Title & Address */}
      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight mb-1">
        {carpark.name}
      </h3>
      <p className="text-xs text-slate-500 line-clamp-1 mb-3">{carpark.address}</p>

      {/* Availability Metrics Bar */}
      <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80 mb-3">
        <div className="flex items-baseline justify-between mb-1.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono tracking-tight text-slate-900">
              {avail}
            </span>
            <span className="text-xs text-slate-500">/ {total} available</span>
          </div>
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${statusColor}`}>
            {statusLabel}
          </span>
        </div>

        {/* Occupancy bar */}
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${barColor}`}
            style={{ width: `${Math.min(100, Math.max(4, 100 - occupancyPercent))}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1 font-mono">
          <span>{occupancyPercent}% Occupied</span>
          <span className="capitalize">{carpark.trend} lot trend</span>
        </div>
      </div>

      {/* Feature & Rules Highlights: Unboxed clean inline typography */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 mb-3">
        <span className="text-slate-700 font-medium">Clearance: {carpark.gantry_height}m</span>
        <span aria-hidden="true" className="text-slate-300">·</span>
        <span className="truncate">{carpark.rates.weekday_peak.split('(')[0]}</span>
        {carpark.has_ev_charging && (
          <>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-emerald-700 font-medium flex items-center gap-1">
              <Zap className="w-3 h-3" />
              <span>EV Ready</span>
            </span>
          </>
        )}
      </div>

      {carpark.free_parking && carpark.free_parking !== 'NO' && (
        <div className="text-[11px] text-slate-600 bg-slate-100/70 px-2.5 py-1 rounded-md mb-3 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="truncate">Free: {carpark.free_parking}</span>
        </div>
      )}

      {/* Bottom Action Row */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
        <span className="text-emerald-700 font-medium group-hover:underline flex items-center gap-1">
          Calculate Fee & Specs
          <ChevronRight className="w-3.5 h-3.5" />
        </span>
        <button
          onClick={handleDirections}
          className="flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium px-2 py-1 hover:bg-slate-100 rounded transition-colors"
          title="Open in Google Maps"
        >
          <Navigation2 className="w-3 h-3 text-slate-500" />
          <span>Directions</span>
        </button>
      </div>
    </div>
  );
};
