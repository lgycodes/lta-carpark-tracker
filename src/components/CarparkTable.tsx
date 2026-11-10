import React from 'react';
import { Carpark } from '../types/carpark';
import { Star, Zap, Navigation2, ArrowUpDown, ChevronRight } from 'lucide-react';

interface CarparkTableProps {
  carparks: Carpark[];
  selectedCarpark: Carpark | null;
  onSelectCarpark: (carpark: Carpark) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  vehicleType: 'car' | 'motorcycle' | 'heavy';
}

export const CarparkTable: React.FC<CarparkTableProps> = ({
  carparks,
  selectedCarpark,
  onSelectCarpark,
  onToggleFavorite,
  vehicleType
}) => {
  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <th className="py-3 px-3 w-10 text-center">Fav</th>
              <th className="py-3 px-3">Code / ID</th>
              <th className="py-3 px-4 min-w-[220px]">Carpark Name & Location</th>
              <th className="py-3 px-3">Agency</th>
              <th className="py-3 px-4 text-right">Available Lots</th>
              <th className="py-3 px-4 text-right">Total</th>
              <th className="py-3 px-4 text-right">Occupancy</th>
              <th className="py-3 px-3 text-right">Clearance</th>
              <th className="py-3 px-4">Peak Rate</th>
              <th className="py-3 px-3 text-center">EV</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {carparks.length === 0 ? (
              <tr>
                <td colSpan={11} className="py-12 text-center text-slate-400">
                  No carparks match your filter criteria. Try adjusting your search or filters.
                </td>
              </tr>
            ) : (
              carparks.map((cp) => {
                const lotInfo =
                  vehicleType === 'motorcycle' && cp.lots.motorcycle
                    ? cp.lots.motorcycle
                    : vehicleType === 'heavy' && cp.lots.heavy
                    ? cp.lots.heavy
                    : cp.lots.car;

                const avail = lotInfo.available;
                const total = lotInfo.total;
                const occ = total > 0 ? Math.round(((total - avail) / total) * 100) : 100;
                const ratio = total > 0 ? avail / total : 0;

                let statusBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                if (avail <= 10) {
                  statusBadge = 'bg-rose-50 text-rose-700 border-rose-200';
                } else if (ratio < 0.25 || avail < 35) {
                  statusBadge = 'bg-amber-50 text-amber-800 border-amber-200';
                }

                const isSelected = selectedCarpark?.id === cp.id;

                return (
                  <tr
                    key={cp.id}
                    onClick={() => onSelectCarpark(cp)}
                    className={`h-11 transition-colors cursor-pointer hover:bg-slate-50/80 ${
                      isSelected ? 'bg-emerald-50/50' : ''
                    }`}
                  >
                    {/* Favorite */}
                    <td className="py-2 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => onToggleFavorite(cp.id, e)}
                        className="text-slate-400 hover:text-amber-500 transition-colors"
                        title="Toggle Favorite"
                      >
                        <Star className={`w-3.5 h-3.5 ${cp.is_favorite ? 'fill-amber-400 text-amber-500' : ''}`} />
                      </button>
                    </td>

                    {/* ID */}
                    <td className="py-2 px-3 font-mono font-semibold text-slate-800">
                      {cp.id}
                    </td>

                    {/* Name & Address */}
                    <td className="py-2 px-4">
                      <div className="font-semibold text-slate-900 line-clamp-1">{cp.name}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">{cp.address}</div>
                    </td>

                    {/* Agency & Region */}
                    <td className="py-2 px-3 text-slate-600 whitespace-nowrap">
                      <span>{cp.agency}</span>
                      <span className="text-slate-400 ml-1 font-normal">({cp.region})</span>
                    </td>

                    {/* Available Lots */}
                    <td className="py-2 px-4 text-right font-mono font-bold text-sm text-slate-900 tabular-nums">
                      <span className={`inline-block px-2 py-0.5 rounded border text-xs font-semibold ${statusBadge}`}>
                        {avail}
                      </span>
                    </td>

                    {/* Total Lots */}
                    <td className="py-2 px-4 text-right font-mono text-slate-600 tabular-nums">
                      {total}
                    </td>

                    {/* Occupancy */}
                    <td className="py-2 px-4 text-right font-mono text-slate-600 tabular-nums">
                      {occ}%
                    </td>

                    {/* Clearance */}
                    <td className="py-2 px-3 text-right font-mono text-slate-600 tabular-nums">
                      {cp.gantry_height}m
                    </td>

                    {/* Rates */}
                    <td className="py-2 px-4 text-slate-600 max-w-[180px] truncate" title={cp.rates.weekday_peak}>
                      {cp.rates.weekday_peak.split('(')[0]}
                    </td>

                    {/* EV */}
                    <td className="py-2 px-3 text-center">
                      {cp.has_ev_charging ? (
                        <span title={`EV Ready: ${cp.ev_chargers?.speed || 'AC'}`} className="inline-flex text-emerald-600">
                          <Zap className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-2 px-3 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onSelectCarpark(cp)}
                          className="px-2 py-1 text-[11px] font-medium text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => {
                            const url = `https://www.google.com/maps/dir/?api=1&destination=${cp.coordinates.lat},${cp.coordinates.lng}`;
                            window.open(url, '_blank', 'noopener,noreferrer');
                          }}
                          title="Open Directions"
                          className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                        >
                          <Navigation2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
