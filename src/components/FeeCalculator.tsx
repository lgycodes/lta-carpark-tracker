import React, { useState } from 'react';
import { Carpark } from '../types/carpark';
import { Calculator, ArrowRight, DollarSign, Clock, ShieldCheck, ExternalLink } from 'lucide-react';

interface FeeCalculatorProps {
  carparks: Carpark[];
  onSelectCarpark: (carpark: Carpark) => void;
}

export const FeeCalculator: React.FC<FeeCalculatorProps> = ({
  carparks,
  onSelectCarpark
}) => {
  const [targetRegion, setTargetRegion] = useState<string>('Central');
  const [durationHours, setDurationHours] = useState<number>(2.5);
  const [dayOfWeek, setDayOfWeek] = useState<'weekday' | 'saturday' | 'sunday'>('weekday');
  const [entryTime, setEntryTime] = useState<string>('14:00');

  // Filter carparks by selected region
  const regionalCarparks = carparks.filter(
    cp => targetRegion === 'All' || cp.region === targetRegion
  );

  // Compute estimated cost for each carpark
  const computeCost = (cp: Carpark) => {
    // Check free sunday parking
    if (dayOfWeek === 'sunday' && cp.free_parking && cp.free_parking.includes('SUN')) {
      return { cost: 0.00, isFree: true, note: 'Free Sunday Parking' };
    }

    // Grace period check
    if (durationHours <= cp.rates.grace_period_mins / 60) {
      return { cost: 0.00, isFree: true, note: `Exited within ${cp.rates.grace_period_mins}m grace period` };
    }

    const hourNumber = parseInt(entryTime.split(':')[0], 10);
    let hourly = cp.rates.estimated_hourly_rate;

    // Evening flat fee for malls
    if (hourNumber >= 18 && cp.agency === 'Commercial') {
      return {
        cost: 3.50,
        isFree: false,
        note: 'Evening per-entry flat rate'
      };
    }

    const calculated = Math.round(hourly * durationHours * 100) / 100;
    return {
      cost: calculated,
      isFree: false,
      note: `${cp.rates.weekday_peak.split('(')[0]}`
    };
  };

  const rankedCarparks = [...regionalCarparks].map(cp => ({
    carpark: cp,
    ...computeCost(cp)
  })).sort((a, b) => a.cost - b.cost);

  return (
    <div className="space-y-6 text-left">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>Multi-Carpark Rate Comparison Engine</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Compare Parking Rates Across Singapore
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Planning a trip to Orchard, Marina Bay, or your neighborhood hub? Calculate and rank expected parking costs across HDB, URA, and commercial carparks before you drive.
          </p>
        </div>

        {/* Input Parameters Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 text-xs">
          <div>
            <label className="block text-slate-600 font-semibold mb-1.5">Destination Region</label>
            <select
              value={targetRegion}
              onChange={(e) => setTargetRegion(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium text-slate-800 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Singapore</option>
              <option value="Central">Central (CBD & Orchard)</option>
              <option value="East">East (Tampines, Changi, Bedok)</option>
              <option value="West">West (Jurong, Clementi, One-North)</option>
              <option value="North">North (Woodlands, Yishun, AMK)</option>
              <option value="North-East">North-East (Punggol, Serangoon)</option>
              <option value="South">South (HarbourFront & Sentosa)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1.5">Day of Parking</label>
            <select
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium text-slate-800 focus:outline-none focus:border-emerald-500"
            >
              <option value="weekday">Weekday (Monday - Friday)</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday / Public Holiday</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1.5">Entry Time</label>
            <select
              value={entryTime}
              onChange={(e) => setEntryTime(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium text-slate-800 focus:outline-none focus:border-emerald-500"
            >
              <option value="09:00">09:00 AM (Morning Peak)</option>
              <option value="12:30">12:30 PM (Lunch Hour)</option>
              <option value="14:00">02:00 PM (Afternoon)</option>
              <option value="19:00">07:00 PM (Dinner / Evening)</option>
              <option value="22:00">10:00 PM (Late Night)</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-slate-600 font-semibold">Duration</label>
              <span className="font-mono font-bold text-slate-900">{durationHours} hrs</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={8}
              step={0.5}
              value={durationHours}
              onChange={(e) => setDurationHours(parseFloat(e.target.value))}
              className="w-full accent-emerald-600 mt-2"
            />
          </div>
        </div>
      </div>

      {/* Comparison Results List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Ranked by lowest estimated cost for {durationHours} hours parking:</span>
          <span>{rankedCarparks.length} Carparks Compared</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {rankedCarparks.map((item, idx) => {
            const cp = item.carpark;
            const isCheapest = idx === 0;

            return (
              <div
                key={cp.id}
                onClick={() => onSelectCarpark(cp)}
                className={`p-4 rounded-xl border transition-all cursor-pointer bg-white hover:bg-slate-50/80 ${
                  isCheapest ? 'border-emerald-500 ring-1 ring-emerald-500 shadow-2xs' : 'border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <span className="font-mono font-semibold text-slate-800">{cp.id}</span>
                      <span aria-hidden="true">·</span>
                      <span>{cp.agency}</span>
                      <span aria-hidden="true">·</span>
                      <span>{cp.region}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-1 mt-0.5">{cp.name}</h4>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-lg font-bold font-mono text-slate-900 tabular-nums">
                      ${item.cost.toFixed(2)}
                    </span>
                    <span className="block text-[10px] text-slate-400">Total SGD</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-3 text-xs space-y-1">
                  <div className="flex justify-between text-slate-600">
                    <span>Rate Structure:</span>
                    <span className="truncate max-w-[170px] text-slate-800 font-medium">{item.note}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Available Lots:</span>
                    <span className="font-mono font-semibold text-emerald-700">{cp.lots.car.available} / {cp.lots.car.total}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Height Clearance:</span>
                    <span className="font-mono text-slate-700">{cp.gantry_height}m</span>
                  </div>
                </div>

                {isCheapest && (
                  <div className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Best Value Option in this Area</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 text-slate-500">
                  <span className="truncate">{cp.address.split(',')[0]}</span>
                  <span className="text-emerald-700 font-medium flex items-center gap-0.5 shrink-0">
                    View
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
