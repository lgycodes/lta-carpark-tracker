import React, { useState } from 'react';
import { Carpark } from '../types/carpark';
import { Zap, Navigation2, BatteryCharging, CheckCircle2, ChevronRight } from 'lucide-react';

interface EvNetworkViewProps {
  carparks: Carpark[];
  onSelectCarpark: (carpark: Carpark) => void;
}

export const EvNetworkView: React.FC<EvNetworkViewProps> = ({
  carparks,
  onSelectCarpark
}) => {
  const [operatorFilter, setOperatorFilter] = useState<string>('All');
  const [speedFilter, setSpeedFilter] = useState<'All' | 'DC' | 'AC'>('All');

  // Filter only carparks that have EV chargers
  const evCarparks = carparks.filter(cp => cp.has_ev_charging && cp.ev_chargers);

  const filtered = evCarparks.filter(cp => {
    if (operatorFilter !== 'All' && !cp.ev_chargers?.operator.toLowerCase().includes(operatorFilter.toLowerCase())) {
      return false;
    }
    if (speedFilter === 'DC' && !cp.ev_chargers?.speed.toLowerCase().includes('dc')) {
      return false;
    }
    if (speedFilter === 'AC' && !cp.ev_chargers?.speed.toLowerCase().includes('ac')) {
      return false;
    }
    return true;
  });

  const totalEvStations = evCarparks.length;
  const totalBays = evCarparks.reduce((sum, cp) => sum + (cp.ev_chargers?.total || 0), 0);
  const availableBays = evCarparks.reduce((sum, cp) => sum + (cp.ev_chargers?.available || 0), 0);

  return (
    <div className="space-y-6 text-left">
      {/* Top Banner & EV Metrics */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Singapore National EV Charging Network</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Live EV Charging Hubs & Bay Availability
            </h2>
            <p className="text-xs text-slate-500">
              Locate public EV chargers from SP Mobility, Shell Recharge, and Charge+ across Singapore carparks with real-time bay statuses.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">EV Hubs</span>
              <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">{totalEvStations}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Total Bays</span>
              <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">{totalBays}</span>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80 text-center">
              <span className="text-[10px] text-emerald-800 uppercase tracking-wider block">Avail Now</span>
              <span className="text-xl font-bold font-mono text-emerald-800 tabular-nums">{availableBays}</span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-600">Operator:</span>
            {['All', 'SP Mobility', 'Shell Recharge', 'Charge+'].map((op) => (
              <button
                key={op}
                onClick={() => setOperatorFilter(op)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  operatorFilter === op
                    ? 'bg-slate-900 text-white font-medium shadow-2xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {op}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            <span className="font-semibold text-slate-600">Speed:</span>
            {(['All', 'DC', 'AC'] as const).map((spd) => (
              <button
                key={spd}
                onClick={() => setSpeedFilter(spd)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  speedFilter === spd
                    ? 'bg-emerald-700 text-white font-medium shadow-2xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {spd === 'All' ? 'All Speeds' : spd === 'DC' ? 'DC Fast' : 'AC Standard'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of EV Charging Carparks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((cp) => {
          const ev = cp.ev_chargers!;
          const ratio = ev.total > 0 ? ev.available / ev.total : 0;
          const isCritical = ev.available === 0;

          return (
            <div
              key={cp.id}
              onClick={() => onSelectCarpark(cp)}
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50/80 transition-all cursor-pointer shadow-2xs text-left space-y-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                    <span className="font-mono font-semibold text-slate-800">{cp.id}</span>
                    <span aria-hidden="true">·</span>
                    <span>{cp.agency}</span>
                    <span aria-hidden="true">·</span>
                    <span>{cp.region}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 line-clamp-1">{cp.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-1">{cp.address}</p>
                </div>

                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                  <BatteryCharging className="w-5 h-5" />
                </div>
              </div>

              {/* Live Charging Bays Indicator */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-600">Available Charging Bays</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold font-mono text-emerald-700 tabular-nums">
                      {ev.available}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">/ {ev.total}</span>
                  </div>
                </div>

                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${isCritical ? 'bg-rose-500' : 'bg-emerald-500'}`}
                    style={{ width: `${Math.min(100, Math.max(8, (ev.available / ev.total) * 100))}%` }}
                  />
                </div>
              </div>

              {/* Operator and Power Specs */}
              <div className="text-xs space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span>Charging Provider:</span>
                  <strong className="text-slate-900">{ev.operator}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Power Rating:</span>
                  <strong className="text-slate-900 font-mono">{ev.speed}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Standard Lot Free:</span>
                  <span className="font-mono font-semibold text-slate-800">{cp.lots.car.available} Lots Free</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  View Full Specs & Fees
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const url = `https://www.google.com/maps/dir/?api=1&destination=${cp.coordinates.lat},${cp.coordinates.lng}`;
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }}
                  className="flex items-center gap-1 text-slate-600 hover:text-slate-900 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <Navigation2 className="w-3 h-3" />
                  <span>Navigate</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
