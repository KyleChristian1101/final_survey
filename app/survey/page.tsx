"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './SurveyPage.module.css';

const SurveyPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    yearLevel: '',
    course: '',
    stressFrequency: '',
    stressSource: '',
    copingMechanisms: [] as string[],
    copingEffectiveness: '',
    stressLevel: '',
    soughtProfessionalHelp: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData((prevState) => ({
        ...prevState,
        copingMechanisms: checkbox.checked
          ? [...prevState.copingMechanisms, value]
          : prevState.copingMechanisms.filter((cm) => cm !== value),
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    const { gender, yearLevel, course, stressFrequency, stressSource, stressLevel } = formData;
    if (!gender || !yearLevel || !course || !stressFrequency || !stressSource || !stressLevel) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Please answer all required questions.');
      return;
    }
    try {
      await axios.post('/api/submit-survey', formData);
      window.location.href = '/thankyou';
    } catch (error) {
      alert('Error submitting survey');
      console.error('Error submitting survey:', error);
    }
  };

  return (
    <div className={styles.surveyContainer}>
      <div className={styles.card}>
        <div className={styles.redLine}></div>
        <h2>Mental Health and Academic Stress</h2>
        <p>
          This form is designed to gather insights and experiences from students regarding the impact of academic stress on mental health. Your responses will help us understand the challenges students face and guide us in creating better support systems and resources.
        </p>
        <p><strong>Purpose:</strong></p>
        <ul>
          <li>To explore the relationship between academic demands and mental well-being.</li>
          <li>To identify common stressors in the academic environment.</li>
          <li>To gather suggestions for improving mental health support for students.</li>
        </ul>
        <p>
          Thank you for taking the time to participate in this important survey. Your feedback is invaluable in helping us promote better mental health and well-being among students.
        </p>
      </div>
      <form onSubmit={handleSubmit} className={styles.surveyForm}>
        <div className={styles.redLine}></div>
        <div className={styles.card}>
          <label>
            Name (optional):
            <input type="text" name="name" value={formData.name} onChange={handleChange} className={styles.inputField} />
          </label>
        </div>

        <div className={styles.card}>
          <label>
            Gender:
            <select name="gender" value={formData.gender} onChange={handleChange} className={styles.inputField}>
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>

        <div className={styles.card}>
          <label>
            Year Level:
            <select name="yearLevel" value={formData.yearLevel} onChange={handleChange} className={styles.inputField}>
              <option value="" disabled>Select Year Level</option>
              <option value="1st Year College">1st Year College</option>
              <option value="2nd Year College">2nd Year College</option>
              <option value="3rd Year College">3rd Year College</option>
              <option value="4th Year College">4th Year College</option>
            </select>
          </label>
        </div>

        <div className={styles.card}>
          <label>
            Course:
            <select name="course" value={formData.course} onChange={handleChange} className={styles.inputField}>
              <option value="" disabled>Select Course</option>
              <option value="Business and Management">Business and Management</option>
              <option value="Engineering and Technology">Engineering and Technology</option>
              <option value="Health Sciences">Health Sciences</option>
              <option value="Arts and Humanities">Arts and Humanities</option>
              <option value="Education">Education</option>
              <option value="Sciences">Sciences</option>
              <option value="Social Sciences">Social Sciences</option>
            </select>
          </label>
        </div>

        <div className={styles.card}>
          <label>
            How often do you feel stressed about your academic workload?
            <select name="stressFrequency" value={formData.stressFrequency} onChange={handleChange} className={styles.inputField}>
              <option value="" disabled>Select Frequency</option>
              <option value="Rarely">Rarely</option>
              <option value="Sometimes">Sometimes</option>
              <option value="Often">Often</option>
              <option value="Always">Always</option>
            </select>
          </label>
        </div>

        <div className={styles.card}>
          <label>
            What is the primary source of your academic stress?
            <select name="stressSource" value={formData.stressSource} onChange={handleChange} className={styles.inputField}>
              <option value="" disabled>Select Source</option>
              <option value="Exams">Exams</option>
              <option value="Assignments">Assignments</option>
              <option value="Presentations">Presentations</option>
              <option value="Group Projects">Group Projects</option>
              <option value="Balancing Academics with personal life">Balancing Academics with personal life</option>
            </select>
          </label>
        </div>

        <div className={styles.card}>
          <label>
            What stress coping mechanisms do you usually do? (Select all that apply)
            <div className={styles.checkboxGroup}>
              {[
                'Physical Exercise',
                'Mindfulness and meditation',
                'Healthy Lifestyle Choices',
                'Time Management',
                'Social Support',
                'Cognitive Behavioral Techniques',
                'Relaxation Techniques',
                'Hobbies and Leisure Activities',
                'Professional Help',
                'Mindful Living',
                'Environmental Changes',
                'Limit Exposure to Stressors',
              ].map((mechanism) => (
                <label key={mechanism}>
                  <input
                    type="checkbox"
                    name="copingMechanisms"
                    value={mechanism}
                    checked={formData.copingMechanisms.includes(mechanism)}
                    onChange={handleChange}
                  />
                  {mechanism}
                </label>
              ))}
            </div>
          </label>
        </div>

        <div className={styles.card}>
          <label>
            How well do you think these coping mechanisms help you with your stress?
            <select name="copingEffectiveness" value={formData.copingEffectiveness} onChange={handleChange} className={styles.inputField}>
              <option value="" disabled>Select Answer</option>
              <option value="1">1 - Slightly Helpful</option>
              <option value="2">2 - Somewhat Helpful</option>
              <option value="3">3 - Helpful</option>
              <option value="4">4 - Very Helpful</option>
              <option value="5">5 - Extremely Helpful</option>
            </select>
          </label>
        </div>

        <div className={styles.card}>
          <label>
            When you experience stress, what is usually the level of your stress?
            <select name="stressLevel" value={formData.stressLevel} onChange={handleChange} className={styles.inputField}>
              <option value="" disabled>Select Stress Level</option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
          </label>
        </div>

        <div className={styles.card}>
          <label>
            Have you tried seeking professional help?
            <select name="soughtProfessionalHelp" value={formData.soughtProfessionalHelp} onChange={handleChange} className={styles.inputField}>
              <option value="" disabled>Select Answer</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
        </div>

        <button type="submit" className={styles.buttonSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default SurveyPage;
