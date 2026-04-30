import React from 'react';
import { useCourse } from '../context/CourseContext';
import { Check, Info, Footprints, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Checklist() {
  const { courseData, progress, toggleSection } = useCourse();

  if (!courseData) return null;

  const allSections = courseData.days.flatMap(day => 
    day.sections.map(s => ({ ...s, day: day.day }))
  );
  
  const completedCount = allSections.filter(s => progress[s.id]).length;
  const totalCount = allSections.length;
  const progressPercent = (completedCount / totalCount) * 100;

  const totalDistance = courseData.summary.distance.total;
  const completedDistance = allSections
    .filter(s => progress[s.id] && s.distance)
    .reduce((acc, s) => acc + s.distance, 0);

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <section className="glass rounded-3xl p-6 space-y-4 sticky top-0 z-20">
        <div className="flex justify-between items-end mb-2">
          <div>
            <h2 className="text-xl font-bold">트레킹 진행률</h2>
            <p className="text-xs text-white/40">총 {totalCount}개 구간 중 {completedCount}개 완료</p>
          </div>
          <div className="text-2xl font-black text-primary">{Math.round(progressPercent)}%</div>
        </div>
        
        <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[2px]">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-emerald-300 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Footprints size={16} />
            </div>
            <div>
              <p className="text-[10px] text-white/40 uppercase">이동 거리</p>
              <p className="text-sm font-bold">{completedDistance.toFixed(1)}km</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Navigation size={16} />
            </div>
            <div>
              <p className="text-[10px] text-white/40 uppercase">남은 거리</p>
              <p className="text-sm font-bold">{(totalDistance - completedDistance).toFixed(1)}km</p>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist Sections */}
      <div className="space-y-6">
        {courseData.days.map((day) => (
          <div key={day.day} className="space-y-3">
            <h3 className="text-xs font-bold text-white/40 px-2 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-white/10" />
              DAY {day.day} - {day.title}
            </h3>
            <div className="space-y-2">
              {day.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => toggleSection(section.id)}
                  className={`w-full text-left glass-dark rounded-2xl p-4 transition-all flex items-center gap-4 ${
                    progress[section.id] ? 'opacity-50 scale-[0.98]' : 'hover:bg-white/5'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                    progress[section.id] 
                      ? 'bg-primary border-primary text-white' 
                      : 'border-white/10 text-transparent'
                  }`}>
                    <Check size={14} strokeWidth={4} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-sm font-bold ${progress[section.id] ? 'line-through' : ''}`}>
                        {section.title}
                      </span>
                      {section.type === 'event' && <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full font-bold">인증</span>}
                    </div>
                    <div className="flex gap-3 text-[10px] text-white/40">
                      <span>{section.time}</span>
                      {section.distance && <span>{section.distance}km</span>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
