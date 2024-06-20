"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
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
        setSurveyData(response.data);
      } catch (error) {
        console.error('Error fetching survey data:', error);
      }
    };
    fetchData();
  }, []);

  const processData = (data: SurveyData[]) => {
    const courses = ["Business and Management", "Engineering and Technology", "Health Sciences", "Arts and Humanities", "Education", "Sciences", "Social Sciences"];
    const years = ["1st Year College", "2nd Year College", "3rd Year College", "4th Year College"];

    const courseData = courses.map(course => {
      const courseSurveyData = data.filter(d => d.course === course);
      const averageStressLevel = courseSurveyData.reduce((acc, cur) => acc + parseInt(cur.stressLevel), 0) / courseSurveyData.length;
      return averageStressLevel || 0;
    });

    const yearData = years.map(year => {
      const yearSurveyData = data.filter(d => d.yearLevel === year);
      const averageStressLevel = yearSurveyData.reduce((acc, cur) => acc + parseInt(cur.stressLevel), 0) / yearSurveyData.length;
      return averageStressLevel || 0;
    });

    return { courseData, yearData };
  };

  const { courseData, yearData } = processData(surveyData);

  const courseChartData = {
    labels: ["Business and Management", "Engineering and Technology", "Health Sciences", "Arts and Humanities", "Education", "Sciences", "Social Sciences"],
    datasets: [{
      label: 'Average Stress Level by Course',
      data: courseData,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  const yearChartData = {
    labels: ["1st Year College", "2nd Year College", "3rd Year College", "4th Year College"],
    datasets: [{
      label: 'Average Stress Level by Year Level',
      data: yearData,
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1
    }]
  };

  return (
    <div>
      <h1>Stress Level Analysis</h1>
      <div>
        <h2>Average Stress Level by Course</h2>
        <Bar data={courseChartData} />
      </div>
      <div>
        <h2>Average Stress Level by Year Level</h2>
        <Bar data={yearChartData} />
      </div>
    </div>
  );
};

export default GraphPage;
