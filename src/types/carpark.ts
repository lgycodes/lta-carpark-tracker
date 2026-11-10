export type AgencyType = 'HDB' | 'URA' | 'LTA' | 'Commercial';

export type CarparkStructureType = 
  | 'Multi-Storey Car Park'
  | 'Surface Car Park'
  | 'Basement Car Park'
  | 'Mechanised Car Park';

export type ParkingSystemType = 'Electronic Parking System' | 'Coupon Parking';

export type VehicleCategory = 'C' | 'Y' | 'H'; // C: Car, Y: Motorcycle, H: Heavy

export type AvailabilityStatus = 'ample' | 'moderate' | 'critical' | 'full';

export interface LotDetail {
  total: number;
  available: number;
}

export interface CarparkRates {
  weekday_peak: string;     // e.g. "$1.20 / 30 mins (7am - 5pm)"
  weekday_offpeak: string;  // e.g. "$0.60 / 30 mins"
  saturday: string;
  sunday_ph: string;
  grace_period_mins: number;
  estimated_hourly_rate: number; // approximate for calculator
}

export interface Carpark {
  id: string; // e.g. "ACB", "TP24", "ION-01"
  name: string;
  address: string;
  agency: AgencyType;
  carpark_type: CarparkStructureType;
  parking_system: ParkingSystemType;
  coordinates: {
    lat: number;
    lng: number;
  };
  region: 'Central' | 'East' | 'West' | 'North' | 'North-East' | 'South';
  short_term_parking: string;
  free_parking: string;
  night_parking: boolean;
  car_park_decks: number;
  gantry_height: number; // clearance height in meters, e.g. 2.15
  has_ev_charging: boolean;
  ev_chargers?: {
    total: number;
    available: number;
    operator: string;
    speed: string; // e.g. "22kW AC", "50kW DC Fast"
  };
  rates: CarparkRates;
  lots: {
    car: LotDetail;
    motorcycle?: LotDetail;
    heavy?: LotDetail;
  };
  trend: 'filling' | 'emptying' | 'stable';
  last_updated: string;
  is_favorite?: boolean;
  distance_km?: number;
  tags?: string[];
}

export interface CarparkFilterState {
  searchQuery: string;
  region: string; // 'All' | 'Central' | 'East' | 'West' | 'North' | 'North-East' | 'South'
  agency: string; // 'All' | 'HDB' | 'URA' | 'LTA' | 'Commercial'
  vehicleType: 'car' | 'motorcycle' | 'heavy';
  availability: 'all' | 'ample' | 'moderate' | 'critical';
  onlyEvCharging: boolean;
  onlyFreeParking: boolean;
  minClearance: number; // e.g. 0, 1.9, 2.0, 2.15
  sortBy: 'distance' | 'available_lots' | 'occupancy' | 'rate' | 'name';
  sortOrder: 'asc' | 'desc';
}

export interface ApiBackendConfig {
  mode: 'simulated' | 'datagov' | 'custom_backend';
  customEndpointUrl: string;
  apiKey?: string;
  autoRefreshIntervalSeconds: number; // 0 for off, or 15, 30, 60
  lastSyncTimestamp?: string;
}
