import React from 'react';

export default function ElevationChart({ data }) {
  if (!data || data.length === 0) return null;

  const minVal = Math.min(...data.map(d => d.y));
  const maxVal = Math.max(...data.map(d => d.y));
  const range = maxVal - minVal;

  const points = data.map((d, i) => {
    const x = d.x;
    const y = 100 - ((d.y - minVal) / range) * 80; // Scale to 20-100 to leave space for labels
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="glass-dark rounded-2xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-white/60">고도 프로필 (m)</h3>
        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-lg font-bold">
          최대 {maxVal}m
        </span>
      </div>
      
      <div className="relative h-32 w-full pt-4">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
          {/* Fill Area */}
          <polyline
            fill="url(#elevation-grad)"
            stroke="none"
            points={`0,100 ${points} 100,100`}
            className="opacity-20"
          />
          {/* Path Line */}
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
            className="drop-shadow-lg"
          />
          
          <defs>
            <linearGradient id="elevation-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* Labels */}
          {data.map((d, i) => (
            i % 2 === 0 && (
              <text
                key={i}
                x={d.x}
                y={100 - ((d.y - minVal) / range) * 80 - 5}
                fontSize="3"
                fill="white"
                fillOpacity="0.4"
                textAnchor="middle"
                className="font-medium"
              >
                {d.label}
              </text>
            )
          ))}
        </svg>
      </div>
    </div>
  );
}
