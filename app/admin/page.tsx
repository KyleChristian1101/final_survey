// app/admin/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

interface SurveyData {
  name: string;
  gender: string;
  yearLevel: string;
  course: string;
  stressFrequency: string;
  stressSource: string;
  copingMechanisms: string[];
  copingEffectiveness: number;
  stressLevel: string;
  soughtProfessionalHelp: boolean;
}

const GraphPage: React.FC = () => {
  const [surveyData, setSurveyData] = useState<SurveyData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/get-survey-data');
        console.log("Survey data received:", response.data);
        setSurveyData(response.data);
      } catch (error) {
        console.error('Error fetching survey data:', error);
      }
    };
    fetchData();
  }, []);

  const processData = (data: SurveyData[]) => {
    const courses = ["Business and Management", "Engineering and Technology", "Health Sciences", "Arts and Humanities", "Education", "Sciences", "Social Sciences"];
    const courseData = courses.map(course => {
      const courseSurveyData = data.filter(d => d.course === course && d.stressLevel !== ''); // Filter out entries with empty stressLevel
      const totalStressLevels = courseSurveyData.reduce((acc, cur) => acc + parseInt(cur.stressLevel || '0', 10), 0);
      const averageStressLevel = courseSurveyData.length > 0 ? totalStressLevels / courseSurveyData.length : 0;
      return isNaN(averageStressLevel) ? 0 : averageStressLevel;
    });

    const years = ["1st Year College", "2nd Year College", "3rd Year College", "4th Year College"];
    const yearData = years.map(year => {
      const yearSurveyData = data.filter(d => d.yearLevel === year && d.stressLevel !== ''); // Filter out entries with empty stressLevel
      const totalStressLevels = yearSurveyData.reduce((acc, cur) => acc + parseInt(cur.stressLevel || '0', 10), 0);
      const averageStressLevel = yearSurveyData.length > 0 ? totalStressLevels / yearSurveyData.length : 0;
      return isNaN(averageStressLevel) ? 0 : averageStressLevel;
    });

    return { courseData, yearData };
  };

  const { courseData, yearData } = processData(surveyData);

  // Log chart data to console
  console.log("Course Chart Data:", courseData);
  console.log("Year Chart Data:", yearData);

  const courseChartData = {
    labels: ["Business and Management", "Engineering and Technology", "Health Sciences", "Arts and Humanities", "Education", "Sciences", "Social Sciences"],
    datasets: [{
      label: 'Average Stress Level by Course',
      data: courseData,
      fill: false,
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1
    }]
  };

  const yearChartData = {
    labels: ["1st Year College", "2nd Year College", "3rd Year College", "4th Year College"],
    datasets: [{
      label: 'Average Stress Level by Year Level',
      data: yearData,
      fill: false,
      borderColor: 'rgba(153, 102, 255, 1)',
      tension: 0.1
    }]
  };

  return (
    <div>
      <h1>Stress Level Analysis</h1>
      <div>
        <h2>Average Stress Level by Course</h2>
        <Line data={courseChartData} />
      </div>
      <div>
        <h2>Average Stress Level by Year Level</h2>
        <Line data={yearChartData} />
      </div>
    </div>
  );
};

export default GraphPage;
