import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { Bus, Car, Footprints, Utensils, Sunrise, Home, Info } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const typeIcons = {
  transport: Bus,
  taxi: Car,
  hiking: Footprints,
  meal: Utensils,
  event: Sunrise,
  stay: Home,
};

const typeColors = {
  transport: 'bg-transport-bus',
  taxi: 'bg-transport-taxi',
  hiking: 'bg-transport-hiking',
  meal: 'bg-transport-meal',
  event: 'bg-transport-event',
  stay: 'bg-transport-stay',
};

export default function Schedule() {
  const { courseData } = useCourse();
  const [activeDay, setActiveDay] = useState(1);

  if (!courseData) return null;

  const dayData = courseData.days.find(d => d.day === activeDay);

  return (
    <div className="space-y-6">
      {/* Day Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {courseData.days.map((day) => (
          <button
            key={day.day}
            onClick={() => setActiveDay(day.day)}
            className={cn(
              "px-4 py-2 rounded-2xl text-sm font-bold whitespace-nowrap transition-all",
              activeDay === day.day 
                ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105" 
                : "glass text-white/40"
            )}
          >
            {day.day}일차
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-0 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
        {dayData.sections.map((section, idx) => {
          const Icon = section.transport === '택시' ? Car : typeIcons[section.type] || Info;
          const bgColor = section.transport === '택시' ? 'bg-transport-taxi' : typeColors[section.type] || 'bg-white/10';
          
          return (
            <div key={section.id} className="relative pl-12 pb-8 last:pb-0 group">
              {/* Dot/Icon */}
              <div className={cn(
                "absolute left-0 w-9 h-9 rounded-xl flex items-center justify-center z-10 transition-transform group-hover:scale-110",
                bgColor
              )}>
                <Icon size={18} className="text-white" />
              </div>

              {/* Content */}
              <div className="glass-dark rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-sm leading-tight flex-1">{section.title}</h4>
                  <span className="text-[10px] font-medium text-white/40 bg-white/5 px-2 py-1 rounded-lg ml-2">
                    {section.time}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-white/60">
                  {section.duration && (
                    <div className="flex items-center gap-1">
                      <span className="w-1 h-1 bg-white/20 rounded-full" />
                      <span>{section.duration} 소요</span>
                    </div>
                  )}
                  {section.distance && (
                    <div className="flex items-center gap-1">
                      <span className="w-1 h-1 bg-white/20 rounded-full" />
                      <span>{section.distance}km</span>
                    </div>
                  )}
                  {section.cost && (
                    <div className="flex items-center gap-1 text-amber-400/80">
                      <span className="w-1 h-1 bg-amber-400/20 rounded-full" />
                      <span>{section.cost.toLocaleString()}원</span>
                    </div>
                  )}
                </div>

                {section.note && (
                  <p className="text-[10px] text-white/30 italic pt-1">
                    * {section.note}
                  </p>
                )}

                {section.checkpoints && (
                  <div className="flex flex-wrap gap-1 pt-2">
                    {section.checkpoints.map(cp => (
                      <span key={cp} className="text-[9px] bg-white/5 text-white/40 px-2 py-0.5 rounded-full border border-white/5">
                        {cp}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
