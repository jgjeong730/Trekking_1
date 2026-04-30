import React from 'react';
import { useCourse } from '../context/CourseContext';
import { Mountain, MapPin, Clock, Ruler, CreditCard, TrendingUp, Sun, Wind, CloudRain, ShieldCheck } from 'lucide-react';
import MapView from '../components/ui/MapView';
import ElevationChart from '../components/ui/ElevationChart';

export default function Overview() {
  const { courseData, availableCourses, selectedCourseId, setSelectedCourseId, equipmentChecks } = useCourse();

  if (!courseData) return <div className="text-center py-20 text-white/40">데이터를 불러오는 중...</div>;

  const { summary, days, equipment } = courseData;

  // Equipment Prep Progress
  const totalItems = equipment.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedItems = Object.values(equipmentChecks).filter(v => v).length;
  const prepPercent = Math.round((checkedItems / totalItems) * 100);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Course Selector */}
      <section className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {availableCourses.map((course) => (
          <button
            key={course.id}
            onClick={() => setSelectedCourseId(course.id)}
            className={cn(
              "px-4 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all border-2",
              selectedCourseId === course.id
                ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                : "glass border-transparent text-white/40 hover:text-white/60"
            )}
          >
            {course.name}
          </button>
        ))}
      </section>

      {/* Hero Section with Map */}
      <section className="space-y-4">
        <div className="flex justify-between items-end px-1">
          <h2 className="text-xl font-black flex items-center gap-2">
            <MapPin size={20} className="text-primary" />
            트레킹 경로
          </h2>
          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Interactive Map</span>
        </div>
        <MapView coordinates={summary.coordinates} segments={summary.segments} waypoints={summary.waypoints} />
      </section>


      {/* Summary Grid */}
      <div className="grid grid-cols-2 gap-4">
        <SummaryCard icon={Clock} label="소요 기간" value={summary.duration} />
        <SummaryCard icon={Ruler} label="총 거리" value={`${summary.distance.total}km`} />
        {summary.cumulativeAscent && (
          <SummaryCard icon={TrendingUp} label="누적 상승" value={`${summary.cumulativeAscent.toLocaleString()}m`} color="text-emerald-400" />
        )}
        <SummaryCard icon={CreditCard} label="예상 비용" value={`${summary.cost.toLocaleString()}원`} color="text-amber-400" />
      </div>

      {/* Weather & Prep Widgets */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-dark rounded-2xl p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center text-white/40">
            <Sun size={14} />
            <span className="text-[9px] font-black uppercase">천왕봉 날씨</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black">12°</span>
            <div className="text-[10px] text-white/60 font-medium">
              <p>맑음</p>
              <div className="flex items-center gap-1">
                <Wind size={8} /> 4m/s
              </div>
            </div>
          </div>
        </div>

        <div className="glass-dark rounded-2xl p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center text-white/40">
            <ShieldCheck size={14} />
            <span className="text-[9px] font-black uppercase">준비 현황</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black">{prepPercent}%</span>
            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${prepPercent}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Elevation Chart */}
      <ElevationChart data={summary.elevationProfile} />

      {/* Day Summaries */}
      <section className="space-y-4">
        <h2 className="text-xl font-black px-1">일정 요약</h2>
        <div className="space-y-4">
          {days.map((day) => (
            <div key={day.day} className="group relative overflow-hidden glass-dark rounded-3xl p-5 border border-white/5 hover:border-primary/20 transition-all">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Mountain size={80} />
              </div>
              <div className="relative z-10 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <div className="bg-primary/20 text-primary px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-tighter">
                    Day {day.day}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 leading-tight">{day.title}</h3>
                  <p className="text-[11px] text-white/40 line-clamp-1">
                    {day.sections.filter(s => s.type === 'hiking').map(s => s.title).join(' → ')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, color = "text-primary" }) {
  return (
    <div className="group glass-dark rounded-3xl p-5 flex flex-col gap-3 border border-white/5 hover:bg-white/5 transition-all">
      <div className="flex items-center gap-2 text-white/30 group-hover:text-white/50 transition-colors">
        <Icon size={16} />
        <span className="text-[9px] uppercase tracking-widest font-black">{label}</span>
      </div>
      <div className={cn("text-xl font-black", color)}>{value}</div>
    </div>
  );
}

function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}
