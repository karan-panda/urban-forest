"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap, Circle, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Search, MapPin, AlertCircle, Compass, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Fix for default marker icons in Next.js + Leaflet
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// Haversine formula to compute distance in meters
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371e3; // Earth's radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // distance in meters
};

const PLANTING_ZONES = [
  {
    id: "virar",
    name: "Virar Region",
    center: [19.4564, 72.8003] as [number, number],
    radius: 4000,
    description: "Coastal buffer, high soil moisture ideal for Neem & Bahava."
  },
  {
    id: "ghatkopar",
    name: "Ghatkopar Mangrove Buffer",
    center: [19.0856, 72.9082] as [number, number],
    radius: 3000,
    description: "Urban green zone, critical for heavy air-purification."
  },
  {
    id: "arrey",
    name: "Aarey Forest Edge (Arrey)",
    center: [19.1485, 72.8819] as [number, number],
    radius: 3000,
    description: "Deep organic forest soil, perfect for large canopies like Banyan & Peepal."
  },
  {
    id: "borivali_kandivali",
    name: "Borivali - Kandivali Buffer",
    center: [19.2284, 72.8550] as [number, number],
    radius: 4500,
    description: "Sanjay Gandhi National Park buffer zone, perfect for biodiversity."
  }
];

function LocationMarker({ 
  position, 
  setPosition, 
  onLocationSelect, 
  setSelectedZoneId, 
  setShowWarning 
}: { 
  position: [number, number] | null, 
  setPosition: (pos: [number, number] | null) => void, 
  onLocationSelect: (lat: number, lng: number, regionName: string) => void,
  setSelectedZoneId: (id: string | null) => void,
  setShowWarning: (show: boolean) => void
}) {
  useMapEvents({
    click(e) {
      const clickLat = e.latlng.lat;
      const clickLng = e.latlng.lng;

      // Find if clicked coordinates are inside any of our allowed zones
      const matchedZone = PLANTING_ZONES.find(zone => {
        const dist = getDistance(clickLat, clickLng, zone.center[0], zone.center[1]);
        return dist <= zone.radius;
      });

      if (matchedZone) {
        setPosition([clickLat, clickLng]);
        onLocationSelect(clickLat, clickLng, matchedZone.name);
        setSelectedZoneId(matchedZone.id);
        setShowWarning(false);
      } else {
        setShowWarning(true);
      }
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={icon}></Marker>
  );
}

function MapUpdater({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function MapSelection({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number, regionName: string) => void }) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([19.1485, 72.8819]); // Aarey center default
  const [zoomLevel, setZoomLevel] = useState(11);
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setShowWarning(false);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery + ", Mumbai")}`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const searchLat = parseFloat(lat);
        const searchLng = parseFloat(lon);
        
        const matchedZone = PLANTING_ZONES.find(zone => {
          const dist = getDistance(searchLat, searchLng, zone.center[0], zone.center[1]);
          return dist <= zone.radius;
        });

        if (matchedZone) {
          setMapCenter([searchLat, searchLng]);
          setZoomLevel(13);
          setPosition([searchLat, searchLng]);
          onLocationSelect(searchLat, searchLng, matchedZone.name);
          setSelectedZoneId(matchedZone.id);
        } else {
          setMapCenter([searchLat, searchLng]);
          setZoomLevel(12);
          setShowWarning(true);
        }
      } else {
        alert("Area not found within Mumbai. Please try searching for a valid Mumbai neighborhood (e.g. Aarey, Borivali, Ghatkopar).");
      }
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="flex gap-2 relative z-10">
        <div className="relative flex-1">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search active zone (e.g. Aarey, Borivali)..."
            className="w-full pl-4 pr-10 py-3 md:py-3.5 rounded-xl md:rounded-2xl border border-border bg-white dark:bg-[#152418] focus:outline-none focus:ring-2 focus:ring-primary/50 text-xs md:text-sm font-semibold shadow-sm"
          />
        </div>
        <button 
          type="submit" 
          disabled={isSearching}
          className="px-4 md:px-6 py-3 md:py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl md:rounded-2xl font-black text-xs md:text-sm flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow-md shadow-emerald-500/10"
        >
          <Search className="w-4 h-4" />
          {isSearching ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Map Container */}
      <div className="h-[280px] md:h-[380px] w-full rounded-2xl md:rounded-[2rem] overflow-hidden border border-border/85 shadow-inner relative z-0">
        <MapContainer 
          center={mapCenter} 
          zoom={zoomLevel} 
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapUpdater center={mapCenter} zoom={zoomLevel} />
          
          {/* Allowed zones visualization */}
          {PLANTING_ZONES.map(zone => (
            <Circle
              key={zone.id}
              center={zone.center}
              radius={zone.radius}
              pathOptions={{
                color: "#10b981", // emerald-500
                fillColor: "#10b981",
                fillOpacity: 0.15,
                weight: 2.5,
                dashArray: "6, 6"
              }}
              eventHandlers={{
                click: (e) => {
                  const clickLat = e.latlng.lat;
                  const clickLng = e.latlng.lng;
                  setPosition([clickLat, clickLng]);
                  onLocationSelect(clickLat, clickLng, zone.name);
                  setSelectedZoneId(zone.id);
                  setShowWarning(false);
                }
              }}
            >
              <Tooltip permanent direction="top" className="bg-emerald-900/90 dark:bg-emerald-950/95 text-white font-extrabold text-[10px] rounded-lg px-2 py-1 border-0 shadow-lg select-none">
                {zone.name}
              </Tooltip>
            </Circle>
          ))}

          <LocationMarker 
            position={position} 
            setPosition={setPosition} 
            onLocationSelect={onLocationSelect} 
            setSelectedZoneId={setSelectedZoneId}
            setShowWarning={setShowWarning}
          />
        </MapContainer>

        {/* Floating Locked Zone Notification (iOS Push style) */}
        <AnimatePresence>
          {position && selectedZoneId && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-4 left-4 right-4 bg-white/95 dark:bg-[#112015]/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl z-[400] border-2 border-emerald-500/30 flex items-center justify-between gap-3 text-emerald-800 dark:text-emerald-300 text-xs font-black shadow-emerald-500/5"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>Active Sector Tagged: <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold">{PLANTING_ZONES.find(z => z.id === selectedZoneId)?.name}</strong></span>
              </div>
              <span className="text-[10px] text-foreground/50 font-semibold shrink-0">GPS sent post-planting 📍</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Warning Overlay Card */}
        <AnimatePresence>
          {showWarning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="absolute inset-x-4 bottom-4 bg-[#fffefe]/95 dark:bg-[#122216]/95 backdrop-blur-md p-5 rounded-[1.5rem] shadow-2xl z-[400] border-2 border-red-500/30 flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5 text-left">
                <div className="bg-red-500/10 dark:bg-red-500/20 p-2.5 rounded-xl mt-0.5 text-red-500">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm md:text-base text-red-600 dark:text-red-400">
                    Planting Zone Not Available Yet
                  </h4>
                  <p className="text-xs text-foreground/75 leading-relaxed font-semibold">
                    Tree planting is currently active <strong className="text-emerald-600 dark:text-emerald-400">ONLY</strong> in Mumbai (Virar, Ghatkopar, Aarey, or Borivali/Kandivali).
                  </p>
                  <p className="text-2xs text-foreground/60 leading-normal">
                    🌱 Coming very soon to <strong className="text-foreground">Pune (Maharashtra)</strong>, <strong className="text-foreground">Ratnagiri</strong>, and <strong className="text-foreground">Sangli</strong> regions, before expanding to other Indian states!
                  </p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setShowWarning(false)}
                className="w-full md:w-auto px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl text-xs font-black hover:opacity-90 active:scale-95 transition-all"
              >
                Choose Available Zone
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Inventive Message & Availability Div at the Bottom */}
      <div className="bg-[#fcfdfd]/60 dark:bg-[#0c1610]/40 border border-emerald-500/15 dark:border-emerald-500/5 backdrop-blur-md rounded-2xl md:rounded-[1.75rem] p-4 md:p-6 space-y-4">
        <div className="flex items-start gap-3.5 text-left">
          <div className="bg-emerald-500/10 dark:bg-emerald-500/20 p-3 rounded-2xl text-emerald-500 shrink-0">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-foreground tracking-tight">Active Mumbai Planting Sector</h4>
            <p className="text-xs text-foreground/70 leading-relaxed font-medium">
              We are actively developing forests and planting native trees in these premium Mumbai sectors:
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {PLANTING_ZONES.map(z => (
                <span 
                  key={z.id} 
                  className="text-[10px] tracking-wide font-black bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-xl cursor-default"
                >
                  📍 {z.name.replace(" Region", "").replace(" Buffer", "").replace(" Edge", "")}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary/10 pt-4 flex flex-col md:flex-row justify-between gap-4 text-left">
          <div className="space-y-1 md:max-w-[60%]">
            <h5 className="text-2xs font-black text-foreground/40 uppercase tracking-widest">Future Expansion Roadmap</h5>
            <p className="text-xs text-foreground/60 leading-relaxed font-medium">
              🌱 Planting will soon be launched in <strong className="text-foreground">Pune (Maharashtra)</strong>, <strong className="text-foreground">Ratnagiri</strong>, and <strong className="text-foreground">Sangli</strong> regions, and after it we will expand to other states.
            </p>
          </div>
          <div className="md:border-l border-primary/10 md:pl-5 space-y-1 shrink-0 md:max-w-[40%] flex flex-col justify-center">
            <h5 className="text-2xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">GPS Coordinates Policy</h5>
            <p className="text-[11px] text-foreground/60 leading-normal font-semibold italic">
              Exact GPS latitude & longitude coordinates will be sent to your WhatsApp and Email along with your tree photos only after planting is completed by local foresters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
