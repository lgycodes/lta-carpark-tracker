import React from 'react';
import { Search, X, SlidersHorizontal, Map, Table, Columns, Car, Bike, Truck, Zap, Shield } from 'lucide-react';
import { CarparkFilterState } from '../types/carpark';

interface FilterBarProps {
  filter: CarparkFilterState;
  setFilter: React.Dispatch<React.SetStateAction<CarparkFilterState>>;
  viewMode: 'split' | 'map' | 'table';
  setViewMode: (mode: 'split' | 'map' | 'table') => void;
  resultCount: number;
}

const REGIONS = ['All', 'Central', 'East', 'West', 'North', 'North-East', 'South'];
const AGENCIES = ['All', 'HDB', 'URA', 'LTA', 'Commercial'];

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  setFilter,
  viewMode,
  setViewMode,
  resultCount
}) => {
  return (
    <div className="space-y-3">
      {/* Search and Primary Segmented View Switch */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filter.searchQuery}
            onChange={(e) => setFilter(prev => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="Search carpark code (e.g. TP24, ACB), name, mall, or street..."
            className="w-full pl-10 pr-9 py-2 text-sm bg-white border border-slate-200 rounded-lg placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-2xs transition-colors"
          />
          {filter.searchQuery && (
            <button
              onClick={() => setFilter(prev => ({ ...prev, searchQuery: '' }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* View Switch: Split Map+List / Full Map / Table */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 shrink-0 self-start md:self-auto">
          <button
            onClick={() => setViewMode('split')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
              viewMode === 'split' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Split View</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
              viewMode === 'map' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Full Map</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
              viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Dense Table</span>
          </button>
        </div>
      </div>

      {/* Filter Ribbon: Regions, Vehicle Category, Agency & Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-200/60">
        {/* Regions Segmented Pills (Functional Buttons) */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
          <span className="text-xs font-medium text-slate-500 mr-1 hidden sm:inline">Region:</span>
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setFilter(prev => ({ ...prev, region: r }))}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                filter.region === r
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Vehicle Type Tabs */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg border border-slate-200 shrink-0">
          <button
            onClick={() => setFilter(prev => ({ ...prev, vehicleType: 'car' }))}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
              filter.vehicleType === 'car' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>Cars</span>
          </button>
          <button
            onClick={() => setFilter(prev => ({ ...prev, vehicleType: 'motorcycle' }))}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
              filter.vehicleType === 'motorcycle' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bike className="w-3.5 h-3.5" />
            <span>Motorcycles</span>
          </button>
          <button
            onClick={() => setFilter(prev => ({ ...prev, vehicleType: 'heavy' }))}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
              filter.vehicleType === 'heavy' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Heavy</span>
          </button>
        </div>
      </div>

      {/* Secondary Controls: Agencies, Feature Toggles & Sorting */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex flex-wrap items-center gap-2">
          {/* Agency dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Agency:</span>
            <select
              value={filter.agency}
              onChange={(e) => setFilter(prev => ({ ...prev, agency: e.target.value }))}
              aria-label="Filter by agency"
              className="bg-white border border-slate-200 rounded-md px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
            >
              {AGENCIES.map(a => (
                <option key={a} value={a}>{a === 'All' ? 'All Agencies' : a}</option>
              ))}
            </select>
          </div>

          {/* Availability selector */}
          <div className="flex items-center gap-1.5 ml-2">
            <span className="text-slate-500 font-medium">Status:</span>
            <select
              value={filter.availability}
              onChange={(e) => setFilter(prev => ({ ...prev, availability: e.target.value as any }))}
              aria-label="Filter by lot status"
              className="bg-white border border-slate-200 rounded-md px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Lots</option>
              <option value="ample">Ample (&gt;25%)</option>
              <option value="moderate">Limited (&lt;25%)</option>
              <option value="critical">Critical / Full (&lt;15)</option>
            </select>
          </div>

          {/* EV Charging toggle */}
          <button
            onClick={() => setFilter(prev => ({ ...prev, onlyEvCharging: !prev.onlyEvCharging }))}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md border transition-colors whitespace-nowrap shrink-0 ${
              filter.onlyEvCharging
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-medium'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Zap className="w-3 h-3 text-emerald-600" />
            <span>EV Charging Only</span>
          </button>

          {/* Free Parking Hours toggle */}
          <button
            onClick={() => setFilter(prev => ({ ...prev, onlyFreeParking: !prev.onlyFreeParking }))}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md border transition-colors whitespace-nowrap shrink-0 ${
              filter.onlyFreeParking
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-medium'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Shield className="w-3 h-3 text-emerald-600" />
            <span>Free Parking Hours</span>
          </button>
        </div>

        {/* Sort and Count */}
        <div className="flex items-center gap-3 shrink-0 ml-auto">
          <span className="text-slate-500 text-[11px] font-mono tabular-nums">
            Showing <strong className="text-slate-800">{resultCount}</strong> carparks
          </span>
          <div className="flex items-center gap-1">
            <span className="text-slate-500 font-medium">Sort:</span>
            <select
              value={`${filter.sortBy}-${filter.sortOrder}`}
              onChange={(e) => {
                const [by, order] = e.target.value.split('-') as [any, any];
                setFilter(prev => ({ ...prev, sortBy: by, sortOrder: order }));
              }}
              aria-label="Sort carparks by"
              className="bg-white border border-slate-200 rounded-md px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
            >
              <option value="distance-asc">Distance (Nearest First)</option>
              <option value="available_lots-desc">Available Lots (Most First)</option>
              <option value="occupancy-asc">Occupancy (Least Crowded)</option>
              <option value="rate-asc">Hourly Rate (Cheapest)</option>
              <option value="name-asc">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
