import { Carpark, CarparkFilterState, ApiBackendConfig } from '../types/carpark';
import { INITIAL_SINGAPORE_CARPARKS } from '../data/singaporeCarparks';
import { DEFAULT_API_CONFIG, DataGovSgResponse } from '../config/apiConfig';

class CarparkService {
  private carparks: Carpark[] = [...INITIAL_SINGAPORE_CARPARKS];
  private lastFetchedTime: string = new Date().toISOString();
  private userLocation: { lat: number; lng: number } | null = { lat: 1.2847, lng: 103.8502 }; // Default to Marina Bay / CBD
  private config: ApiBackendConfig = {
    mode: 'simulated',
    customEndpointUrl: DEFAULT_API_CONFIG.DEFAULT_CUSTOM_ENDPOINT,
    autoRefreshIntervalSeconds: DEFAULT_API_CONFIG.DEFAULT_REFRESH_SECONDS,
    lastSyncTimestamp: new Date().toISOString(),
  };

  constructor() {
    this.loadFavorites();
    this.loadConfig();
  }

  public getConfig(): ApiBackendConfig {
    return { ...this.config };
  }

  public saveConfig(newConfig: Partial<ApiBackendConfig>) {
    this.config = { ...this.config, ...newConfig };
    try {
      localStorage.setItem(DEFAULT_API_CONFIG.STORAGE_KEY_CONFIG, JSON.stringify(this.config));
    } catch {
      // ignore in iframe storage restrict
    }
  }

  private loadConfig() {
    try {
      const saved = localStorage.getItem(DEFAULT_API_CONFIG.STORAGE_KEY_CONFIG);
      if (saved) {
        this.config = { ...this.config, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
  }

  private loadFavorites() {
    try {
      const saved = localStorage.getItem(DEFAULT_API_CONFIG.STORAGE_KEY_FAVORITES);
      if (saved) {
        const favIds: string[] = JSON.parse(saved);
        this.carparks = this.carparks.map(cp => ({
          ...cp,
          is_favorite: favIds.includes(cp.id)
        }));
      }
    } catch {
      // fallback
    }
  }

  public toggleFavorite(carparkId: string): boolean {
    let isFav = false;
    this.carparks = this.carparks.map(cp => {
      if (cp.id === carparkId) {
        isFav = !cp.is_favorite;
        return { ...cp, is_favorite: isFav };
      }
      return cp;
    });

    try {
      const favIds = this.carparks.filter(c => c.is_favorite).map(c => c.id);
      localStorage.setItem(DEFAULT_API_CONFIG.STORAGE_KEY_FAVORITES, JSON.stringify(favIds));
    } catch {
      // fallback
    }
    return isFav;
  }

  public setUserLocation(loc: { lat: number; lng: number }) {
    this.userLocation = loc;
    this.recalculateDistances();
  }

  public getUserLocation() {
    return this.userLocation;
  }

  private recalculateDistances() {
    if (!this.userLocation) return;
    this.carparks = this.carparks.map(cp => ({
      ...cp,
      distance_km: this.calculateHaversineDistance(
        this.userLocation!.lat,
        this.userLocation!.lng,
        cp.coordinates.lat,
        cp.coordinates.lng
      )
    }));
  }

  // Haversine formula in kilometers
  private calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = R * c;
    return Math.round(dist * 10) / 10;
  }

  /**
   * Refresh Carpark Data:
   * Handles Simulated fluctuations, Data.gov.sg API, or Custom backend endpoint
   */
  public async fetchCarparks(): Promise<{ carparks: Carpark[]; source: string; status: 'ok' | 'error' }> {
    this.lastFetchedTime = new Date().toISOString();

    if (this.config.mode === 'custom_backend' && this.config.customEndpointUrl) {
      try {
        const headers: Record<string, string> = {};
        if (this.config.apiKey) {
          headers['AccountKey'] = this.config.apiKey;
          headers['Authorization'] = `Bearer ${this.config.apiKey}`;
        }
        const res = await fetch(this.config.customEndpointUrl, { headers });
        if (res.ok) {
          const data = await res.json();
          // 1. Direct Carpark[] format
          if (Array.isArray(data)) {
            this.carparks = data;
            this.recalculateDistances();
            this.saveConfig({ lastSyncTimestamp: this.lastFetchedTime });
            return { carparks: this.carparks, source: 'Custom Backend API', status: 'ok' };
          }
          // 2. LTA DataMall v2 { value: [...] } format
          if (data && Array.isArray(data.value)) {
            this.mergeLtaDataMallLots(data.value);
            this.recalculateDistances();
            this.saveConfig({ lastSyncTimestamp: this.lastFetchedTime });
            return { carparks: this.carparks, source: 'LTA DataMall v2 Live Feed', status: 'ok' };
          }
          // 3. Data.gov.sg format
          if (data && Array.isArray(data.items)) {
            this.mergeDataGovLotData(data);
            this.recalculateDistances();
            this.saveConfig({ lastSyncTimestamp: this.lastFetchedTime });
            return { carparks: this.carparks, source: 'Data.gov.sg Backend Feed', status: 'ok' };
          }
        }
      } catch (err) {
        console.warn('Custom backend failed, falling back to simulated data', err);
      }
    }

    if (this.config.mode === 'datagov') {
      try {
        const res = await fetch(DEFAULT_API_CONFIG.DATA_GOV_SG_URL);
        if (res.ok) {
          const data: DataGovSgResponse = await res.json();
          this.mergeDataGovLotData(data);
          this.recalculateDistances();
          this.saveConfig({ lastSyncTimestamp: this.lastFetchedTime });
          return { carparks: this.carparks, source: 'Data.gov.sg Live Feed', status: 'ok' };
        }
      } catch (err) {
        console.warn('Data.gov.sg fetch failed, falling back to simulated data', err);
      }
    }

    // Default: High-fidelity simulation mode with realistic vehicle traffic drift
    this.carparks = this.carparks.map(cp => {
      // Simulate small organic lot fluctuation (-3 to +3 lots)
      const delta = Math.floor(Math.random() * 7) - 3;
      const currentAvail = cp.lots.car.available;
      const total = cp.lots.car.total;
      
      const newAvail = Math.max(0, Math.min(total, currentAvail + delta));
      const trend: 'filling' | 'emptying' | 'stable' = 
        newAvail < currentAvail ? 'filling' : newAvail > currentAvail ? 'emptying' : 'stable';

      return {
        ...cp,
        lots: {
          ...cp.lots,
          car: {
            ...cp.lots.car,
            available: newAvail
          }
        },
        trend,
        last_updated: this.lastFetchedTime
      };
    });

    this.recalculateDistances();
    this.saveConfig({ lastSyncTimestamp: this.lastFetchedTime });
    return { carparks: this.carparks, source: 'Live Simulated Stream', status: 'ok' };
  }

  private mergeDataGovLotData(data: DataGovSgResponse) {
    if (!data.items || !data.items[0] || !data.items[0].carpark_data) return;
    const lotMap = new Map<string, number>();

    data.items[0].carpark_data.forEach(item => {
      const carInfo = item.carpark_info.find(i => i.lot_type === 'C');
      if (carInfo) {
        lotMap.set(item.carpark_number.toUpperCase(), parseInt(carInfo.lots_available, 10));
      }
    });

    this.carparks = this.carparks.map(cp => {
      if (lotMap.has(cp.id.toUpperCase())) {
        const liveAvail = lotMap.get(cp.id.toUpperCase())!;
        return {
          ...cp,
          lots: {
            ...cp.lots,
            car: {
              ...cp.lots.car,
              available: liveAvail
            }
          },
          last_updated: data.items[0].timestamp || new Date().toISOString()
        };
      }
      return cp;
    });
  }

  private mergeLtaDataMallLots(ltaItems: Array<{
    CarParkID: string;
    Area?: string;
    Development?: string;
    Location?: string;
    AvailableLots: number;
    LotType: string;
    Agency: string;
  }>) {
    const lotMap = new Map<string, number>();

    ltaItems.forEach(item => {
      // Map car lot availability
      if (item.LotType === 'C' || !item.LotType) {
        if (item.CarParkID) {
          lotMap.set(item.CarParkID.toUpperCase(), item.AvailableLots);
        }
        if (item.Development) {
          lotMap.set(item.Development.toLowerCase(), item.AvailableLots);
        }
      }
    });

    this.carparks = this.carparks.map(cp => {
      let matchedLots: number | undefined;

      if (lotMap.has(cp.id.toUpperCase())) {
        matchedLots = lotMap.get(cp.id.toUpperCase());
      } else {
        // Try fuzzy development name match
        for (const [devName, lots] of lotMap.entries()) {
          if (cp.name.toLowerCase().includes(devName) || devName.includes(cp.name.toLowerCase())) {
            matchedLots = lots;
            break;
          }
        }
      }

      if (matchedLots !== undefined) {
        return {
          ...cp,
          lots: {
            ...cp.lots,
            car: {
              ...cp.lots.car,
              available: matchedLots
            }
          },
          last_updated: new Date().toISOString()
        };
      }
      return cp;
    });
  }

  /**
   * Filter and sort carparks based on user criteria
   */
  public filterAndSort(filter: CarparkFilterState): Carpark[] {
    return this.carparks.filter(cp => {
      // Search Query filter (matches Name, ID, Address, or Tags)
      if (filter.searchQuery.trim()) {
        const q = filter.searchQuery.toLowerCase();
        const matchesName = cp.name.toLowerCase().includes(q);
        const matchesId = cp.id.toLowerCase().includes(q);
        const matchesAddress = cp.address.toLowerCase().includes(q);
        const matchesTags = cp.tags?.some(t => t.toLowerCase().includes(q)) ?? false;
        if (!matchesName && !matchesId && !matchesAddress && !matchesTags) {
          return false;
        }
      }

      // Region Filter
      if (filter.region !== 'All' && cp.region !== filter.region) {
        return false;
      }

      // Agency Filter
      if (filter.agency !== 'All' && cp.agency !== filter.agency) {
        return false;
      }

      // Vehicle Type Lot Filter
      if (filter.vehicleType === 'motorcycle' && !cp.lots.motorcycle) {
        return false;
      }
      if (filter.vehicleType === 'heavy' && !cp.lots.heavy) {
        return false;
      }

      // Availability Filter
      const lotInfo = filter.vehicleType === 'motorcycle' 
        ? cp.lots.motorcycle! 
        : filter.vehicleType === 'heavy'
        ? cp.lots.heavy!
        : cp.lots.car;

      const availRatio = lotInfo.total > 0 ? lotInfo.available / lotInfo.total : 0;
      
      if (filter.availability === 'ample' && (availRatio < 0.25 || lotInfo.available < 20)) {
        return false;
      }
      if (filter.availability === 'moderate' && (availRatio < 0.08 || availRatio >= 0.25)) {
        return false;
      }
      if (filter.availability === 'critical' && lotInfo.available > 15) {
        return false;
      }

      // EV Charging Filter
      if (filter.onlyEvCharging && !cp.has_ev_charging) {
        return false;
      }

      // Free Parking Filter
      if (filter.onlyFreeParking && (cp.free_parking === 'NO' || !cp.free_parking)) {
        return false;
      }

      // Minimum Gantry Clearance
      if (filter.minClearance > 0 && cp.gantry_height < filter.minClearance) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const getLots = (cp: Carpark) => {
        return filter.vehicleType === 'motorcycle' && cp.lots.motorcycle
          ? cp.lots.motorcycle.available
          : filter.vehicleType === 'heavy' && cp.lots.heavy
          ? cp.lots.heavy.available
          : cp.lots.car.available;
      };

      const getOccupancyRate = (cp: Carpark) => {
        const info = filter.vehicleType === 'motorcycle' && cp.lots.motorcycle
          ? cp.lots.motorcycle
          : filter.vehicleType === 'heavy' && cp.lots.heavy
          ? cp.lots.heavy
          : cp.lots.car;
        return info.total > 0 ? (info.total - info.available) / info.total : 1;
      };

      if (filter.sortBy === 'distance') {
        const distA = a.distance_km ?? 9999;
        const distB = b.distance_km ?? 9999;
        return filter.sortOrder === 'asc' ? distA - distB : distB - distA;
      }

      if (filter.sortBy === 'available_lots') {
        const lotsA = getLots(a);
        const lotsB = getLots(b);
        return filter.sortOrder === 'asc' ? lotsA - lotsB : lotsB - lotsA;
      }

      if (filter.sortBy === 'occupancy') {
        const occA = getOccupancyRate(a);
        const occB = getOccupancyRate(b);
        return filter.sortOrder === 'asc' ? occA - occB : occB - occA;
      }

      if (filter.sortBy === 'rate') {
        const rateA = a.rates.estimated_hourly_rate;
        const rateB = b.rates.estimated_hourly_rate;
        return filter.sortOrder === 'asc' ? rateA - rateB : rateB - rateA;
      }

      // Default: Name
      return filter.sortOrder === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    });
  }
}

export const carparkService = new CarparkService();
