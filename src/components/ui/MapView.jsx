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

export default function MapView({ coordinates }) {
  if (!coordinates || coordinates.length === 0) return null;

  const center = coordinates[Math.floor(coordinates.length / 2)];

  return (
    <div className="h-64 w-full rounded-2xl overflow-hidden glass border-white/10 relative z-0">
      <MapContainer 
        center={center} 
        zoom={11} 
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles"
        />
        <Polyline 
          positions={coordinates} 
          pathOptions={{ color: '#10b981', weight: 4, opacity: 0.8 }} 
        />
        <Marker position={coordinates[0]} />
        <Marker position={coordinates[coordinates.length - 1]} />
        <ChangeView center={center} zoom={11} />
      </MapContainer>
      <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl z-10" />
    </div>
  );
}
