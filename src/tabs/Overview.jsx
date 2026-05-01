import React from 'react';
import { useCourse } from '../context/CourseContext';
import {
  MapPin, Clock, Ruler, CreditCard, TrendingUp,
  Sun, Wind, ShieldCheck, Mountain, ChevronRight,
} from 'lucide-react';
import MapView from '../components/ui/MapView';
import ElevationChart from '../components/ui/ElevationChart';

/* ── helper ── */
function cn(...cls) { return cls.filter(Boolean).join(' '); }

/* ── Stat card ── */
function StatCard({ icon: Icon, label, value, accent = 'text-primary' }) {
  return (
    <div className="card flex flex-col gap-3 group cursor-default">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center
                        group-hover:bg-primary/10 transition-colors duration-200">
          <Icon size={14} className="text-white/40 group-hover:text-primary transition-colors duration-200" />
        </div>
        <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">{label}</span>
      </div>
      <div className={cn('text-xl font-black', accent)}>{value}</div>
    </div>
  );
}

export default function Overview() {
  const { courseData, availableCourses, selectedCourseId, setSelectedCourseId, equipmentChecks } = useCourse();

  if (!courseData) return (
    <div className="flex items-center justify-center py-20 text-white/20 text-sm font-medium">
      데이터 로딩 중…
    </div>
  );

  const { summary, days, equipment } = courseData;
  const totalItems   = equipment.reduce((acc, c) => acc + c.items.length, 0);
  const checkedItems = Object.values(equipmentChecks).filter(Boolean).length;
  const prepPct      = totalItems ? Math.round((checkedItems / totalItems) * 100) : 0;

  return (
    <div className="space-y-6 pb-2">

      {/* ── Course Selector ── */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1">
        {availableCourses.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCourseId(c.id)}
            className={cn(
              'flex-shrink-0 px-4 py-1.5 rounded-xl text-[11px] font-black tracking-tight',
              'border transition-all duration-200',
              selectedCourseId === c.id
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                : 'glass text-white/40 border-transparent hover:text-white/60 hover:border-white/10',
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* ── Map ── */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="flex items-center gap-2 text-sm font-black text-white/80">
            <MapPin size={14} className="text-primary" strokeWidth={2.5} />
            트레킹 경로
          </h2>
          <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
            OpenStreetMap
          </span>
        </div>
        <MapView
          coordinates={summary.coordinates}
          segments={summary.segments}
          waypoints={summary.waypoints}
        />
      </section>

      {/* ── Stats grid ── */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={Clock}     label="소요 기간"  value={summary.duration} />
        <StatCard icon={Ruler}     label="총 거리"    value={`${summary.distance.total} km`} />
        {summary.cumulativeAscent && (
          <StatCard icon={TrendingUp} label="누적 상승" accent="text-emerald-400"
                    value={`${summary.cumulativeAscent.toLocaleString()} m`} />
        )}
        <StatCard icon={CreditCard} label="예상 비용" accent="text-amber-400"
                  value={`${(summary.cost / 10000).toFixed(0)}만원`} />
      </div>

      {/* ── Mini widgets ── */}
      <div className="grid grid-cols-2 gap-3">
        {/* Weather widget */}
        <div className="card flex flex-col gap-3">
          <div className="flex items-center justify-between text-white/30">
            <Sun size={13} />
            <span className="text-[8px] font-black uppercase tracking-widest">천왕봉 날씨</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-black leading-none">12°</span>
            <div className="text-[10px] text-white/50 mb-0.5 space-y-0.5">
              <p className="font-bold">맑음</p>
              <div className="flex items-center gap-1">
                <Wind size={8} /> <span>4 m/s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Prep status */}
        <div className="card flex flex-col gap-3">
          <div className="flex items-center justify-between text-white/30">
            <ShieldCheck size={13} />
            <span className="text-[8px] font-black uppercase tracking-widest">장비 준비</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-black leading-none">{prepPct}%</span>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${prepPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Elevation chart ── */}
      <ElevationChart data={summary.elevationProfile} />

      {/* ── Day cards ── */}
      <section className="space-y-3">
        <h2 className="text-sm font-black text-white/60 uppercase tracking-widest px-0.5">일정 요약</h2>
        <div className="space-y-3">
          {days.map((day) => (
            <div key={day.day}
              className="card group relative overflow-hidden border-transparent
                         hover:border-white/10 transition-all duration-200 cursor-default">
              {/* subtle bg icon */}
              <div className="absolute top-3 right-3 opacity-[0.04] group-hover:opacity-[0.07]
                              transition-opacity duration-200 pointer-events-none">
                <Mountain size={72} />
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 border border-primary/20
                                flex items-center justify-center text-[10px] font-black text-primary">
                  D{day.day}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-white leading-snug">{day.title}</p>
                  <p className="text-[11px] text-white/35 mt-1 line-clamp-1 font-medium">
                    {day.sections.filter(s => s.type === 'hiking').map(s => s.title).join(' · ')}
                  </p>
                </div>
                <ChevronRight size={14} className="text-white/15 shrink-0 mt-0.5
                                                   group-hover:text-white/30 transition-colors duration-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
