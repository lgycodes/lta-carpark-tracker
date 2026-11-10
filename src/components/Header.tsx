import React from 'react';
import { RefreshCw, MapPin, Database, Sparkles } from 'lucide-react';
import { ApiBackendConfig } from '../types/carpark';

interface HeaderProps {
  activeTab: 'map' | 'table' | 'ev' | 'calculator';
  setActiveTab: (tab: 'map' | 'table' | 'ev' | 'calculator') => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  onOpenBackendModal: () => void;
  backendConfig: ApiBackendConfig;
  totalCarparks: number;
  totalAvailableLots: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onRefresh,
  isRefreshing,
  onOpenBackendModal,
  backendConfig,
  totalCarparks,
  totalAvailableLots
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand Wordmark (Single Text Element) */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
              SG
            </div>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setActiveTab('map'); }}
              className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-emerald-700 transition-colors"
            >
              ParkSG <span className="font-normal text-slate-500 text-sm ml-1">Live Carpark Lots</span>
            </a>
          </div>

          {/* Zone 2: Navigation Links (Single-Line, 4-5 items) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('map')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'map' ? 'border-emerald-600 text-slate-900 font-semibold' : 'border-transparent'
              }`}
            >
              Live Map & Directory
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'table' ? 'border-emerald-600 text-slate-900 font-semibold' : 'border-transparent'
              }`}
            >
              Dense Data Grid
            </button>
            <button
              onClick={() => setActiveTab('ev')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'ev' ? 'border-emerald-600 text-slate-900 font-semibold' : 'border-transparent'
              }`}
            >
              EV Charging Network
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'calculator' ? 'border-emerald-600 text-slate-900 font-semibold' : 'border-transparent'
              }`}
            >
              Rates & Fee Estimator
            </button>
          </nav>

          {/* Zone 3: Primary Action & Quick Tools */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Backend connection button */}
            <button
              onClick={onOpenBackendModal}
              title="Configure Backend Connection & API Integration"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Database className="w-3.5 h-3.5 text-slate-500" />
              <span>Backend API</span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-1 py-0.2 rounded font-medium ml-1">
                {backendConfig.mode === 'simulated' ? 'Sim' : backendConfig.mode === 'datagov' ? 'DataGov' : 'Custom'}
              </span>
            </button>

            {/* Refresh live lots button */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 disabled:opacity-75"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Syncing...' : 'Sync Lots'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
