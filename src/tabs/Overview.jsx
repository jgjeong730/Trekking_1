import React from 'react';
import { useCourse } from '../context/CourseContext';
import { Mountain, MapPin, Clock, Ruler, CreditCard, TrendingUp } from 'lucide-react';
import MapView from '../components/ui/MapView';

export default function Overview() {

  const { courseData, availableCourses, selectedCourseId, setSelectedCourseId } = useCourse();

  if (!courseData) return <div className="text-center py-20 text-white/40">데이터를 불러오는 중...</div>;

  const { summary, days } = courseData;

  return (
    <div className="space-y-6">
      {/* Course Selector */}
      <section className="flex gap-2 overflow-x-auto pb-2">
        {availableCourses.map((course) => (
          <button
            key={course.id}
            onClick={() => setSelectedCourseId(course.id)}
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border",
              selectedCourseId === course.id
                ? "bg-primary/20 border-primary text-primary"
                : "border-white/5 text-white/40 hover:border-white/10"
            )}
          >
            {course.name}
          </button>
        ))}
      </section>

      {/* Interactive Map */}
      <MapView coordinates={summary.coordinates} />


      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <SummaryCard icon={Clock} label="기간" value={summary.duration} />
        <SummaryCard icon={Ruler} label="총 거리" value={`${summary.distance.total}km`} />
        {summary.cumulativeAscent && (
          <SummaryCard icon={TrendingUp} label="누적 상승" value={`${summary.cumulativeAscent.toLocaleString()}m`} color="text-emerald-400" />
        )}
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
