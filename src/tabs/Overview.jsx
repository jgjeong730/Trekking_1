import React from 'react';
import { useCourse } from '../context/CourseContext';
import { Mountain, MapPin, Clock, Ruler, CreditCard } from 'lucide-react';

export default function Overview() {
  const { courseData } = useCourse();

  if (!courseData) return <div className="text-center py-20 text-white/40">데이터를 불러오는 중...</div>;

  const { summary, days } = courseData;

  return (
    <div className="space-y-6">
      {/* Route SVG Map Placeholder */}
      <section className="glass rounded-3xl p-6 aspect-video flex flex-col items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
        <svg viewBox="0 0 400 200" className="w-full h-full relative z-10 drop-shadow-2xl">
          <path
            d="M 50 150 Q 100 50 150 100 T 250 80 T 350 120"
            fill="none"
            stroke="url(#grad)"
            strokeWidth="4"
            strokeLinecap="round"
            className="animate-draw"
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="150" r="4" fill="#10b981" />
          <circle cx="350" cy="120" r="4" fill="#3b82f6" />
          <text x="40" y="170" fill="white" fontSize="10" className="font-bold">화엄사</text>
          <text x="340" y="140" fill="white" fontSize="10" className="font-bold">대원사</text>
        </svg>
        <div className="absolute bottom-4 right-4 flex items-center gap-2 text-xs text-white/40">
          <MapPin size={12} />
          <span>지리산 화대종주 루트</span>
        </div>
      </section>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <SummaryCard icon={Clock} label="기간" value={summary.duration} />
        <SummaryCard icon={Ruler} label="총 거리" value={`${summary.distance.total}km`} />
        <SummaryCard icon={Mountain} label="등반 거리" value={`${summary.distance.hiking}km`} />
        <SummaryCard icon={CreditCard} label="예상 비용" value={`${summary.cost.toLocaleString()}원`} color="text-amber-400" />
      </div>

      {/* Day Summaries */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold px-1">일정 요약</h2>
        <div className="space-y-3">
          {days.map((day) => (
            <div key={day.day} className="glass-dark rounded-2xl p-4 flex items-start gap-4">
              <div className="bg-primary/20 text-primary px-3 py-1 rounded-xl text-xs font-bold">
                Day {day.day}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm mb-1">{day.title}</h3>
                <p className="text-xs text-white/40">
                  {day.sections.filter(s => s.type === 'hiking').length}개 구간 등반
                </p>
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
    <div className="glass-dark rounded-2xl p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-white/40">
        <Icon size={14} />
        <span className="text-[10px] uppercase tracking-wider font-semibold">{label}</span>
      </div>
      <div className={cn("text-lg font-bold", color)}>{value}</div>
    </div>
  );
}

function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}
