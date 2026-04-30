import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function MapView({ coordinates, segments }) {
  if (!coordinates || coordinates.length === 0) return null;

  const center = coordinates[Math.floor(coordinates.length / 2)];

  // Default color if no segments provided
  const defaultPath = [{
    positions: coordinates,
    color: '#10b981'
  }];

  const displaySegments = segments || defaultPath;

  return (
    <div className="h-72 w-full rounded-2xl overflow-hidden glass border-white/10 relative z-0">
      <MapContainer 
        center={center} 
        zoom={12} 
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles brightness-[0.7] contrast-[1.2]"
        />
        
        {displaySegments.map((seg, i) => (
          <Polyline 
            key={i}
            positions={seg.positions} 
            pathOptions={{ 
              color: seg.color, 
              weight: 5, 
              opacity: 0.9,
              lineCap: 'round',
              lineJoin: 'round'
            }} 
          />
        ))}

        <Marker position={coordinates[0]} />
        <Marker position={coordinates[coordinates.length - 1]} />
        <ChangeView center={center} zoom={12} />
      </MapContainer>
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-1 p-2 glass rounded-xl border border-white/10">
        <div className="flex items-center gap-2 text-[9px] font-black uppercase text-white/60">
          <span className="w-2 h-2 rounded-full bg-red-500" /> 매우 높음
        </div>
        <div className="flex items-center gap-2 text-[9px] font-black uppercase text-white/60">
          <span className="w-2 h-2 rounded-full bg-orange-500" /> 높음
        </div>
        <div className="flex items-center gap-2 text-[9px] font-black uppercase text-white/60">
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> 보통
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl z-20" />
    </div>
  );
}

