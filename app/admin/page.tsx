// app/admin/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import styles from './Graph.module.css'; // Import the CSS module

interface SurveyData {
  name: string;
  gender: string;
  yearLevel: string;
  course: string;
  stressFrequency: string;
  stressSource: string;
  copingMechanisms: string[];
  copingEffectiveness: string;
  stressLevel: string;
  soughtProfessionalHelp: string;
}

const GraphCard: React.FC<{ title: string, chartData: any }> = ({ title, chartData }) => (
  <div className={styles.card}>
    <h2>{title}</h2>
    <div className={styles.chartWrapper}>
      <Line data={chartData} options={{ maintainAspectRatio: false }} />
    </div>
  </div>
);

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

  const stressLevelMap: { [key: string]: number } = {
    'Low': 1,
    'Moderate': 2,
    'High': 3,
  };

  const processData = (data: SurveyData[]) => {
    const courses = ["Business and Management", "Engineering and Technology", "Health Sciences", "Arts and Humanities", "Education", "Sciences", "Social Sciences"];
    const courseData = courses.map(course => {
      const courseSurveyData = data.filter(d => d.course === course && d.stressLevel in stressLevelMap);
      const totalStressLevels = courseSurveyData.reduce((acc, cur) => acc + stressLevelMap[cur.stressLevel], 0);
      const averageStressLevel = courseSurveyData.length > 0 ? totalStressLevels / courseSurveyData.length : 0;
      return averageStressLevel;
    });

    const years = ["1st Year College", "2nd Year College", "3rd Year College", "4th Year College"];
    const yearData = years.map(year => {
      const yearSurveyData = data.filter(d => d.yearLevel === year && d.stressLevel in stressLevelMap);
      const totalStressLevels = yearSurveyData.reduce((acc, cur) => acc + stressLevelMap[cur.stressLevel], 0);
      const averageStressLevel = yearSurveyData.length > 0 ? totalStressLevels / yearSurveyData.length : 0;
      return averageStressLevel;
    });

    const genders = ["Male", "Female", "Other"];
    const genderData = genders.map(gender => {
      const genderSurveyData = data.filter(d => d.gender === gender && d.stressLevel in stressLevelMap);
      const totalStressLevels = genderSurveyData.reduce((acc, cur) => acc + stressLevelMap[cur.stressLevel], 0);
      const averageStressLevel = genderSurveyData.length > 0 ? totalStressLevels / genderSurveyData.length : 0;
      return averageStressLevel;
    });

    const stressSources = ["Coursework Load", "Performance Pressure", "Time Management", "Teacher/Professor", "Financial Concerns", "Balancing Academics with personal life"];
    const stressSourceData = stressSources.map(source => {
      const sourceSurveyData = data.filter(d => d.stressSource === source && d.stressLevel in stressLevelMap);
      const totalStressLevels = sourceSurveyData.reduce((acc, cur) => acc + stressLevelMap[cur.stressLevel], 0);
      const averageStressLevel = sourceSurveyData.length > 0 ? totalStressLevels / sourceSurveyData.length : 0;
      return averageStressLevel;
    });

    return { courseData, yearData, genderData, stressSourceData };
  };

  const { courseData, yearData, genderData, stressSourceData } = processData(surveyData);

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

  const genderChartData = {
    labels: ["Male", "Female", "Other"],
    datasets: [{
      label: 'Average Stress Level by Gender',
      data: genderData,
      fill: false,
      borderColor: 'rgba(255, 159, 64, 1)',
      tension: 0.1
    }]
  };

  const stressSourceChartData = {
    labels: ["Coursework Load", "Performance Pressure", "Time Management", "Teacher/Professor", "Financial Concerns", "Balancing Academics with personal life"],
    datasets: [{
      label: 'Average Stress Level by Stress Source',
      data: stressSourceData,
      fill: false,
      borderColor: 'rgba(54, 162, 235, 1)',
      tension: 0.1
    }]
  };

  return (
    <div>
      <h1>Stress Level Analysis</h1>
      <div className={styles.cardContainer}>
        <GraphCard title="Average Stress Level by Course" chartData={courseChartData} />
        <GraphCard title="Average Stress Level by Year Level" chartData={yearChartData} />
        <GraphCard title="Average Stress Level by Gender" chartData={genderChartData} />
        <GraphCard title="Average Stress Level by Stress Source" chartData={stressSourceChartData} />
      </div>
    </div>
  );
};

export default GraphPage;
