import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Tooltip, useMap, CircleMarker } from 'react-leaflet';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [20, 33],
    iconAnchor: [10, 33]
});
L.Marker.prototype.options.icon = DefaultIcon;

function ChangeView({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [bounds, map]);
  return null;
}

const waypointColors = {
  start:      '#10b981',
  end:        '#3b82f6',
  peak:       '#ef4444',
  shelter:    '#f59e0b',
  checkpoint: '#a855f7',
};

export default function MapView({ coordinates, segments, waypoints }) {
  if (!coordinates || coordinates.length === 0) return null;

  // Build bounds from all segment positions
  const allPositions = segments
    ? segments.flatMap(s => s.positions)
    : coordinates;
  const bounds = allPositions;

  const defaultPath = [{ positions: coordinates, color: '#10b981' }];
  const displaySegments = segments || defaultPath;

  return (
    <div className="relative">
      <div className="h-72 w-full rounded-2xl overflow-hidden relative z-0 border border-white/10">
        <MapContainer
          center={coordinates[Math.floor(coordinates.length / 2)]}
          zoom={11}
          scrollWheelZoom={false}
          zoomControl={true}
          className="h-full w-full"
          style={{ background: '#1a1a2e' }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Trail segments with difficulty colors */}
          {displaySegments.map((seg, i) => (
            <Polyline
              key={i}
              positions={seg.positions}
              pathOptions={{
                color: seg.color,
                weight: 5,
                opacity: 0.95,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            >
              {seg.name && (
                <Tooltip sticky className="text-xs font-bold">
                  {seg.name}
                </Tooltip>
              )}
            </Polyline>
          ))}

          {/* Waypoint markers */}
          {waypoints && waypoints.map((wp, i) => (
            <CircleMarker
              key={i}
              center={wp.pos}
              radius={wp.type === 'peak' ? 7 : wp.type === 'start' || wp.type === 'end' ? 9 : 5}
              pathOptions={{
                color: '#000',
                weight: 1.5,
                fillColor: waypointColors[wp.type] || '#fff',
                fillOpacity: 1,
              }}
            >
              <Tooltip
                permanent={wp.type === 'start' || wp.type === 'end' || wp.type === 'peak'}
                direction="top"
                offset={[0, -8]}
                className="leaflet-custom-tooltip"
              >
                <span className="text-[10px] font-black">{wp.name}</span>
              </Tooltip>
            </CircleMarker>
          ))}

          <ChangeView bounds={bounds} />
        </MapContainer>

        {/* Difficulty Legend */}
        <div className="absolute bottom-4 left-4 z-10 p-2 rounded-xl border border-white/10"
          style={{ background: 'rgba(10,10,20,0.75)', backdropFilter: 'blur(8px)' }}>
          <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">난이도</p>
          {[
            { label: '매우 높음', color: '#ef4444' },
            { label: '높음',     color: '#f59e0b' },
            { label: '보통',     color: '#10b981' },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-2 text-[9px] font-bold text-white/70">
              <span className="w-4 h-1.5 rounded-full" style={{ background: color }} />
              {label}
            </div>
          ))}
        </div>

        {/* Waypoint Legend */}
        <div className="absolute bottom-4 right-4 z-10 p-2 rounded-xl border border-white/10"
          style={{ background: 'rgba(10,10,20,0.75)', backdropFilter: 'blur(8px)' }}>
          <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">마커</p>
          {[
            { label: '출/도착',  color: waypointColors.start },
            { label: '봉우리',  color: waypointColors.peak },
            { label: '대피소',  color: waypointColors.shelter },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-2 text-[9px] font-bold text-white/70">
              <span className="w-2.5 h-2.5 rounded-full border border-black/40" style={{ background: color }} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
