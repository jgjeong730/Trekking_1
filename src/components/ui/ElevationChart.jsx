import React from 'react';

export default function ElevationChart({ data }) {
  if (!data || data.length === 0) return null;

  const minVal = Math.min(...data.map(d => d.y));
  const maxVal = Math.max(...data.map(d => d.y));
  const range  = maxVal - minVal || 1;

  const toSVG = (d) => ({
    x: d.x,
    y: 88 - ((d.y - minVal) / range) * 70,
  });

  const pts = data.map(toSVG);
  const polyline  = pts.map(p => `${p.x},${p.y}`).join(' ');
  const fillPoly  = `0,100 ${polyline} 100,100`;

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-black text-white/40 uppercase tracking-widest">고도 프로필</h3>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-bold text-white/30">최저 {minVal}m</span>
          <span className="text-[9px] text-white/15">·</span>
          <span className="text-[9px] font-black text-primary">최고 {maxVal}m</span>
        </div>
      </div>

      <div className="relative h-28">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="elev-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Fill */}
          <polygon fill="url(#elev-fill)" points={fillPoly} />

          {/* Line */}
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={polyline}
          />

          {/* Waypoint dots + labels */}
          {data.map((d, i) => {
            const p = toSVG(d);
            const showLabel = i === 0 || i === data.length - 1 || d.y === maxVal;
            return (
              <g key={i}>
                <circle
                  cx={p.x} cy={p.y} r="1.5"
                  fill={d.y === maxVal ? '#ef4444' : '#10b981'}
                  stroke="#0a0a0f" strokeWidth="0.8"
                />
                {showLabel && (
                  <text
                    x={p.x}
                    y={p.y - 4}
                    fontSize="3.5"
                    fill={d.y === maxVal ? '#ef4444' : 'rgba(255,255,255,0.5)'}
                    textAnchor="middle"
                    fontWeight="700"
                  >
                    {d.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Foot labels */}
      <div className="flex justify-between text-[8px] font-bold text-white/20">
        {data.filter((_, i) => i % 2 === 0).map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}
