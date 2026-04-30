import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import coursesIndex from '../data/courses/index.json';

const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [selectedCourseId, setSelectedCourseId] = useLocalStorage('selectedCourseId', 'jirisan-hwadae');
  const [courseData, setCourseData] = useState(null);
  const [progress, setProgress] = useLocalStorage(`progress-${selectedCourseId}`, {});
  const [equipmentChecks, setEquipmentChecks] = useLocalStorage(`equipment-${selectedCourseId}`, {});
  const [startDate, setStartDate] = useLocalStorage(`startDate-${selectedCourseId}`, '');

  useEffect(() => {
    // Dynamically load course data
    import(`../data/courses/${selectedCourseId}.json`).then((data) => {
      setCourseData(data.default);
    });
  }, [selectedCourseId]);

  const toggleSection = (sectionId) => {
    setProgress(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const toggleEquipment = (itemName) => {
    setEquipmentChecks(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const value = {
    selectedCourseId,
    setSelectedCourseId,
    courseData,
    progress,
    toggleSection,
    equipmentChecks,
    toggleEquipment,
    startDate,
    setStartDate,
    availableCourses: coursesIndex
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
}

export const useCourse = () => useContext(CourseContext);
