import React, { useState } from 'react';
import { Carpark } from '../types/carpark';
import { 
  X, Star, Zap, Navigation2, Clock, ShieldCheck, 
  Car, Bike, Truck, Calculator, ExternalLink, Copy, Check 
} from 'lucide-react';

interface CarparkDetailModalProps {
  carpark: Carpark | null;
  onClose: () => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  vehicleType: 'car' | 'motorcycle' | 'heavy';
}

export const CarparkDetailModal: React.FC<CarparkDetailModalProps> = ({
  carpark,
  onClose,
  onToggleFavorite,
  vehicleType
}) => {
  const [parkingDurationHours, setParkingDurationHours] = useState<number>(2);
  const [dayType, setDayType] = useState<'weekday' | 'saturday' | 'sunday'>('weekday');
  const [entryHour, setEntryHour] = useState<number>(14); // 2:00 PM default
  const [copied, setCopied] = useState(false);

  if (!carpark) return null;

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

  let statusBadge = 'bg-emerald-50 text-emerald-800 border-emerald-200';
  let statusText = 'Ample Lots Available';
  if (avail <= 10) {
    statusBadge = 'bg-rose-50 text-rose-800 border-rose-200';
    statusText = 'Critical / Nearly Full';
  } else if (availRatio < 0.25 || avail < 35) {
    statusBadge = 'bg-amber-50 text-amber-800 border-amber-200';
    statusText = 'Limited Lots Remaining';
  }

  // Parking Fee Calculation Logic
  const calculateEstimatedFee = () => {
    // Free parking check
    if (dayType === 'sunday' && carpark.free_parking && carpark.free_parking.includes('SUN')) {
      return 0.00;
    }

    if (parkingDurationHours <= (carpark.rates.grace_period_mins / 60)) {
      return 0.00;
    }

    const hourly = carpark.rates.estimated_hourly_rate;
    // Commercial malls usually have cheaper evening rates or entry charges
    if (entryHour >= 18 && carpark.agency === 'Commercial') {
      return Math.min(3.50, hourly * parkingDurationHours * 0.7);
    }

    return Math.round(hourly * parkingDurationHours * 100) / 100;
  };

  const estimatedFee = calculateEstimatedFee();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`${carpark.id} - ${carpark.name}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${carpark.coordinates.lat},${carpark.coordinates.lng}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const openWaze = () => {
    window.open(
      `https://waze.com/ul?ll=${carpark.coordinates.lat},${carpark.coordinates.lng}&navigate=yes`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-mono font-bold text-slate-900 text-sm">{carpark.id}</span>
              <span aria-hidden="true">·</span>
              <span>{carpark.agency}</span>
              <span aria-hidden="true">·</span>
              <span>{carpark.carpark_type}</span>
              <span aria-hidden="true">·</span>
              <span>{carpark.region} Region</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 leading-snug">{carpark.name}</h2>
            <p className="text-xs text-slate-500">{carpark.address}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={(e) => onToggleFavorite(carpark.id, e)}
              className={`p-2 rounded-lg border transition-colors ${
                carpark.is_favorite 
                  ? 'bg-amber-50 border-amber-200 text-amber-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
              }`}
              title="Toggle Favorite"
            >
              <Star className={`w-4 h-4 ${carpark.is_favorite ? 'fill-amber-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Real-time Status Card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-baseline justify-between mb-2">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Real-Time Availability ({vehicleType.toUpperCase()})
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-bold font-mono tracking-tight text-slate-900 tabular-nums">
                    {avail}
                  </span>
                  <span className="text-sm text-slate-500 font-mono tabular-nums">
                    / {total} Total Lots
                  </span>
                </div>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${statusBadge}`}>
                {statusText}
              </span>
            </div>

            {/* Occupancy Bar */}
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-2">
              <div 
                className={`h-full transition-all duration-300 ${
                  avail <= 10 ? 'bg-rose-500' : availRatio < 0.25 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, Math.max(5, 100 - occupancyPercent))}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>{occupancyPercent}% Occupancy Rate</span>
              <span className="capitalize">{carpark.trend} trend · Updated moments ago</span>
            </div>
          </div>

          {/* Vehicle Category Breakdown */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-lg border border-slate-200 bg-white">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Car className="w-3.5 h-3.5" />
                <span>Car Lots</span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 tabular-nums">
                {carpark.lots.car.available} <span className="text-xs text-slate-400 font-normal">/ {carpark.lots.car.total}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-white">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Bike className="w-3.5 h-3.5" />
                <span>Motorcycle</span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 tabular-nums">
                {carpark.lots.motorcycle ? (
                  <>
                    {carpark.lots.motorcycle.available} <span className="text-xs text-slate-400 font-normal">/ {carpark.lots.motorcycle.total}</span>
                  </>
                ) : (
                  <span className="text-xs text-slate-400 font-normal">N/A</span>
                )}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-white">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Truck className="w-3.5 h-3.5" />
                <span>Heavy Vehicles</span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 tabular-nums">
                {carpark.lots.heavy ? (
                  <>
                    {carpark.lots.heavy.available} <span className="text-xs text-slate-400 font-normal">/ {carpark.lots.heavy.total}</span>
                  </>
                ) : (
                  <span className="text-xs text-slate-400 font-normal">N/A</span>
                )}
              </div>
            </div>
          </div>

          {/* EV Charging & Clearance Technical Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 space-y-1.5">
              <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>Electric Vehicle (EV) Charging</span>
              </div>
              {carpark.has_ev_charging && carpark.ev_chargers ? (
                <div className="space-y-1 text-slate-600">
                  <div>Operator: <strong className="text-slate-800">{carpark.ev_chargers.operator}</strong></div>
                  <div>Power / Speed: <strong className="text-slate-800">{carpark.ev_chargers.speed}</strong></div>
                  <div className="text-emerald-700 font-medium">
                    {carpark.ev_chargers.available} of {carpark.ev_chargers.total} charging bays available
                  </div>
                </div>
              ) : (
                <p className="text-slate-500">No public EV chargers currently installed at this facility.</p>
              )}
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 space-y-1.5">
              <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-slate-700" />
                <span>Gantry Clearance & Parking System</span>
              </div>
              <div className="space-y-1 text-slate-600">
                <div>Max Height Clearance: <strong className="font-mono text-slate-900">{carpark.gantry_height} meters</strong></div>
                <div>System: <strong className="text-slate-800">{carpark.parking_system}</strong></div>
                <div>Decks: <strong className="text-slate-800">{carpark.car_park_decks} levels</strong></div>
              </div>
            </div>
          </div>

          {/* Official Rates Breakdown */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Official Rate Schedule</h4>
            <div className="rounded-lg border border-slate-200 divide-y divide-slate-100 text-xs bg-white">
              <div className="flex justify-between py-2 px-3">
                <span className="text-slate-600">Weekday Peak</span>
                <span className="font-medium text-slate-900">{carpark.rates.weekday_peak}</span>
              </div>
              <div className="flex justify-between py-2 px-3">
                <span className="text-slate-600">Weekday Off-Peak / Night</span>
                <span className="font-medium text-slate-900">{carpark.rates.weekday_offpeak}</span>
              </div>
              <div className="flex justify-between py-2 px-3">
                <span className="text-slate-600">Saturday</span>
                <span className="font-medium text-slate-900">{carpark.rates.saturday}</span>
              </div>
              <div className="flex justify-between py-2 px-3">
                <span className="text-slate-600">Sunday & Public Holidays</span>
                <span className="font-medium text-slate-900">{carpark.rates.sunday_ph}</span>
              </div>
              <div className="flex justify-between py-2 px-3 bg-slate-50 text-slate-600">
                <span>Grace Period (No charge if exit within)</span>
                <span className="font-mono font-medium text-slate-900">{carpark.rates.grace_period_mins} mins</span>
              </div>
            </div>
          </div>

          {/* Interactive Fee Estimator */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-950 uppercase tracking-wider">
                <Calculator className="w-4 h-4 text-emerald-600" />
                <span>Instant Parking Fee Estimator</span>
              </div>
              <span className="text-xs text-slate-500">
                Grace period: {carpark.rates.grace_period_mins}m
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Day of Visit</label>
                <select
                  value={dayType}
                  onChange={(e) => setDayType(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 rounded-md p-1.5 text-xs text-slate-800"
                >
                  <option value="weekday">Weekday (Mon - Fri)</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday / Public Holiday</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Entry Time</label>
                <select
                  value={entryHour}
                  onChange={(e) => setEntryHour(parseInt(e.target.value, 10))}
                  className="w-full bg-white border border-slate-300 rounded-md p-1.5 text-xs text-slate-800"
                >
                  <option value={9}>09:00 AM (Morning Peak)</option>
                  <option value={12}>12:00 PM (Lunch)</option>
                  <option value={14}>02:00 PM (Afternoon)</option>
                  <option value={19}>07:00 PM (Evening / Dinner)</option>
                  <option value={22}>10:00 PM (Night)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Duration: {parkingDurationHours} hrs</label>
                <input
                  type="range"
                  min={0.25}
                  max={8}
                  step={0.5}
                  value={parkingDurationHours}
                  onChange={(e) => setParkingDurationHours(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600 mt-2"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-emerald-200/60">
              <span className="text-xs text-slate-600">
                Estimated Parking Cost ({parkingDurationHours}h on {dayType}):
              </span>
              <span className="text-xl font-bold font-mono text-emerald-800 tabular-nums">
                ${estimatedFee.toFixed(2)} SGD
              </span>
            </div>
          </div>
        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Carpark Info' : 'Copy Carpark Code'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={openWaze}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Waze</span>
            </button>
            <button
              onClick={openGoogleMaps}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors"
            >
              <Navigation2 className="w-3.5 h-3.5" />
              <span>Google Maps Directions</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
