import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Carpark } from '../types/carpark';
import { Crosshair, Navigation } from 'lucide-react';

interface CarparkMapProps {
  carparks: Carpark[];
  selectedCarpark: Carpark | null;
  onSelectCarpark: (carpark: Carpark) => void;
  userLocation: { lat: number; lng: number } | null;
  onUpdateUserLocation: (loc: { lat: number; lng: number }) => void;
  vehicleType: 'car' | 'motorcycle' | 'heavy';
}

// Singapore Land Authority (SLA) OneMap Official Tile Configuration
const ONEMAP_TILE_URL = 'https://www.onemap.gov.sg/maps/json/raster/v4/Default/{z}/{x}/{y}.png';
const ONEMAP_ATTRIBUTION = '<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a> &copy; Singapore Land Authority';

// Bounds strictly for Singapore
const SG_BOUNDS = L.latLngBounds(
  L.latLng(1.15, 103.55), // Southwest
  L.latLng(1.48, 104.10)  // Northeast
);

export const CarparkMap: React.FC<CarparkMapProps> = ({
  carparks,
  selectedCarpark,
  onSelectCarpark,
  userLocation,
  onUpdateUserLocation,
  vehicleType
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Initialize Leaflet map with Singapore OneMap
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on Singapore: [1.3200, 103.8400]
    const map = L.map(mapContainerRef.current, {
      center: [1.3200, 103.8400],
      zoom: 12,
      minZoom: 11,
      maxZoom: 19,
      maxBounds: SG_BOUNDS,
      maxBoundsViscosity: 0.8,
      zoomControl: false,
      attributionControl: true,
    });

    // Singapore Land Authority (SLA) OneMap Tile Layer
    L.tileLayer(ONEMAP_TILE_URL, {
      maxZoom: 19,
      minZoom: 11,
      attribution: ONEMAP_ATTRIBUTION,
    }).addTo(map);

    // Zoom control in bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers when carparks, vehicleType, or selection changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    carparks.forEach((cp) => {
      const lotInfo = vehicleType === 'motorcycle' && cp.lots.motorcycle
        ? cp.lots.motorcycle
        : vehicleType === 'heavy' && cp.lots.heavy
        ? cp.lots.heavy
        : cp.lots.car;

      const avail = lotInfo.available;
      const total = lotInfo.total;
      const ratio = total > 0 ? avail / total : 0;

      // Status color palette
      let bgColor = 'bg-emerald-600 text-white border-emerald-700';
      let statusText = 'Ample';
      if (avail <= 10) {
        bgColor = 'bg-rose-600 text-white border-rose-700';
        statusText = 'Critical';
      } else if (ratio < 0.25 || avail < 35) {
        bgColor = 'bg-amber-500 text-white border-amber-600';
        statusText = 'Limited';
      }

      const isSelected = selectedCarpark?.id === cp.id;
      const ringClass = isSelected ? 'ring-4 ring-emerald-500/50 scale-110 z-50' : 'hover:scale-105';

      // Custom HTML Marker with visible lot count
      const iconHtml = `
        <div class="relative flex flex-col items-center cursor-pointer transition-transform duration-150 ${ringClass}">
          <div class="px-2 py-1 rounded-md text-[11px] font-bold font-mono tracking-tight shadow-md border flex items-center gap-1 ${bgColor}">
            <span>${avail}</span>
            <span class="text-[9px] opacity-80 uppercase font-sans">lots</span>
          </div>
          <div class="w-2 h-2 rotate-45 -mt-1 ${bgColor}"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-carpark-pin',
        html: iconHtml,
        iconSize: [44, 32],
        iconAnchor: [22, 32],
        popupAnchor: [0, -32]
      });

      const marker = L.marker([cp.coordinates.lat, cp.coordinates.lng], { icon: customIcon });

      // Clean popup content
      const popupHtml = `
        <div class="p-4 w-64 bg-white text-slate-800 font-sans">
          <div class="flex items-center justify-between gap-2 mb-1.5">
            <span class="text-[10px] font-semibold uppercase tracking-wider text-slate-500">${cp.agency} · ${cp.region}</span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded ${
              avail <= 10 ? 'bg-rose-100 text-rose-800' : ratio < 0.25 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
            }">${statusText}</span>
          </div>
          <h4 class="text-sm font-bold text-slate-900 leading-tight mb-1">${cp.name}</h4>
          <p class="text-xs text-slate-500 line-clamp-1 mb-2.5">${cp.address}</p>
          
          <div class="grid grid-cols-2 gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200/80 mb-3 text-center">
            <div>
              <span class="text-[10px] uppercase text-slate-400 block">Available</span>
              <span class="text-base font-bold font-mono text-emerald-600">${avail}</span>
            </div>
            <div>
              <span class="text-[10px] uppercase text-slate-400 block">Capacity</span>
              <span class="text-base font-semibold font-mono text-slate-700">${total}</span>
            </div>
          </div>

          <div class="text-[11px] text-slate-600 space-y-1 mb-3">
            <div><strong class="font-medium">Rates:</strong> ${cp.rates.weekday_peak.split('(')[0]}</div>
            <div><strong class="font-medium">Height Limit:</strong> ${cp.gantry_height}m</div>
            ${cp.has_ev_charging ? '<div class="text-emerald-700 font-medium">⚡ EV Charging Available</div>' : ''}
          </div>

          <button id="btn-popup-${cp.id}" class="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-md transition-colors">
            View Details & Calculator
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml, { closeButton: false, offset: [0, -10] });

      marker.on('click', () => {
        onSelectCarpark(cp);
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-popup-${cp.id}`);
        if (btn) {
          btn.addEventListener('click', () => {
            onSelectCarpark(cp);
          });
        }
      });

      marker.addTo(markersLayerRef.current!);
    });
  }, [carparks, selectedCarpark, vehicleType, onSelectCarpark]);

  // Center on selected carpark when changed
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedCarpark) return;
    mapInstanceRef.current.flyTo(
      [selectedCarpark.coordinates.lat, selectedCarpark.coordinates.lng],
      15,
      { duration: 0.8 }
    );
  }, [selectedCarpark]);

  // Handle user location marker
  useEffect(() => {
    if (!mapInstanceRef.current || !userLocation) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
    } else {
      const userIcon = L.divIcon({
        className: 'user-location-pin',
        html: `
          <div class="relative flex items-center justify-center">
            <span class="absolute w-5 h-5 rounded-full bg-blue-500/30 animate-ping"></span>
            <span class="w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white shadow-md"></span>
          </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
        icon: userIcon,
        zIndexOffset: 1000
      }).addTo(mapInstanceRef.current);
      
      userMarkerRef.current.bindTooltip("You are here", { direction: 'top', offset: [0, -10] });
    }
  }, [userLocation]);

  // Handle Locate Me
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          onUpdateUserLocation(loc);
          if (mapInstanceRef.current) {
            mapInstanceRef.current.flyTo([loc.lat, loc.lng], 14, { duration: 1 });
          }
        },
        () => {
          // If denied, fallback to Central Singapore
          const fallback = { lat: 1.2847, lng: 103.8502 };
          onUpdateUserLocation(fallback);
          if (mapInstanceRef.current) {
            mapInstanceRef.current.flyTo([fallback.lat, fallback.lng], 14, { duration: 1 });
          }
        }
      );
    }
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([1.3200, 103.8400], 12, { duration: 0.8 });
    }
  };

  return (
    <div className="relative w-full h-full min-h-[420px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs">
      <div ref={mapContainerRef} className="w-full h-full min-h-[420px]" />

      {/* Floating Map Controls */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
        <button
          onClick={handleLocateMe}
          title="Detect Current Location"
          className="p-2.5 bg-white/95 hover:bg-white text-slate-700 hover:text-slate-900 rounded-lg shadow-sm border border-slate-200 backdrop-blur-xs transition-colors"
        >
          <Crosshair className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetView}
          title="Fit Singapore View"
          className="p-2.5 bg-white/95 hover:bg-white text-slate-700 hover:text-slate-900 rounded-lg shadow-sm border border-slate-200 backdrop-blur-xs transition-colors"
        >
          <Navigation className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Status Indicator Legend + OneMap Badge */}
      <div className="absolute bottom-3 left-3 z-20 bg-white/95 backdrop-blur-xs px-3 py-2 rounded-lg border border-slate-200 text-xs shadow-sm flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-700 pr-2 border-r border-slate-200">
          <span className="w-2 h-2 rounded-full bg-red-600"></span>
          <span className="font-bold">OneMap SG</span>
        </div>
        <span className="font-medium text-slate-700 text-[11px]">Availability:</span>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
          <span>Ample (&gt;25%)</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span>Limited (&lt;25%)</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
          <span>Full / &lt;10</span>
        </div>
      </div>
    </div>
  );
};
