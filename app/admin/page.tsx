// components/SurveyForm.js

import { useState } from 'react';
import axios from 'axios';
import styles from './SurveyForm.module.css'; // Import CSS module for styling

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    yearLevel: '',
    course: '',
    stressLevel: '',
    primarySourceOfStress: '',
    copingMechanisms: [],
    copingMechanismsEffectiveness: '',
    stressLevelWhenStressed: '',
    professionalHelpSeeking: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const updatedCopingMechanisms = checked
        ? [...formData.copingMechanisms, value]
        : formData.copingMechanisms.filter((item) => item !== value);
      setFormData((prevData) => ({
        ...prevData,
        copingMechanisms: updatedCopingMechanisms,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/survey', formData); // Assuming you have an API endpoint to handle form submission
      console.log('Survey submitted successfully!', response.data);
      // Reset form data if needed
      setFormData({
        name: '',
        gender: '',
        yearLevel: '',
        course: '',
        stressLevel: '',
        primarySourceOfStress: '',
        copingMechanisms: [],
        copingMechanismsEffectiveness: '',
        stressLevelWhenStressed: '',
        professionalHelpSeeking: false,
      });
    } catch (error) {
      console.error('Error submitting survey:', error);
    }
  };

  return (
    <div className={styles.surveyForm}>
      <h1 className={styles.formTitle}>Survey Form</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Name */}
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className={styles.inputField}
          />
        </div>

        {/* Gender */}
        <div className={styles.formGroup}>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
            className={styles.inputField}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Year Level */}
        <div className={styles.formGroup}>
          <label htmlFor="yearLevel">Year Level:</label>
          <select
            id="yearLevel"
            name="yearLevel"
            value={formData.yearLevel}
            onChange={handleInputChange}
            required
            className={styles.inputField}
          >
            <option value="">Select year level</option>
            <option value="1st_year_college">1st Year College</option>
            <option value="2nd_year_college">2nd Year College</option>
            <option value="3rd_year_college">3rd Year College</option>
            <option value="4th_year_college">4th Year College</option>
          </select>
        </div>

        {/* Course */}
        <div className={styles.formGroup}>
          <label htmlFor="course">Course:</label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            required
            className={styles.inputField}
          >
            <option value="">Select course</option>
            <option value="business_management">Business and Management</option>
            <option value="engineering_technology">Engineering and Technology</option>
            <option value="health_sciences">Health Sciences</option>
            <option value="arts_humanities">Arts and Humanities</option>
            <option value="education">Education</option>
            <option value="sciences">Sciences</option>
            <option value="social_sciences">Social Sciences</option>
          </select>
        </div>

        {/* Stress Level */}
        <div className={styles.formGroup}>
          <label htmlFor="stressLevel">How often do you feel stressed about your academic workload?</label>
          <select
            id="stressLevel"
            name="stressLevel"
            value={formData.stressLevel}
            onChange={handleInputChange}
            required
            className={styles.inputField}
          >
            <option value="">Select stress level</option>
            <option value="never">Never</option>
            <option value="rarely">Rarely</option>
            <option value="sometimes">Sometimes</option>
            <option value="often">Often</option>
            <option value="always">Always</option>
          </select>
        </div>

        {/* Primary Source of Stress */}
        <div className={styles.formGroup}>
          <label htmlFor="primarySourceOfStress">What is the primary source of your academic stress?</label>
          <textarea
            id="primarySourceOfStress"
            name="primarySourceOfStress"
            value={formData.primarySourceOfStress}
            onChange={handleInputChange}
            required
            className={styles.inputField}
          />
        </div>

        {/* Coping Mechanisms */}
        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>Coping Mechanisms (Check all that apply):</label>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="physicalExercise"
              name="copingMechanisms"
              value="physicalExercise"
              onChange={handleInputChange}
              className={styles.checkboxInput}
            />
            <label htmlFor="physicalExercise" className={styles.checkboxText}>Physical Exercise</label>
          </div>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="mindfulnessMeditation"
              name="copingMechanisms"
              value="mindfulnessMeditation"
              onChange={handleInputChange}
              className={styles.checkboxInput}
            />
            <label htmlFor="mindfulnessMeditation" className={styles.checkboxText}>Mindfulness and Meditation</label>
          </div>
          {/* Add more coping mechanisms as needed */}
        </div>

        {/* Coping Mechanisms Effectiveness */}
        <div className={styles.formGroup}>
          <label htmlFor="copingMechanismsEffectiveness">How well do these coping mechanisms help you with your stress?</label>
          <select
            id="copingMechanismsEffectiveness"
            name="copingMechanismsEffectiveness"
            value={formData.copingMechanismsEffectiveness}
            onChange={handleInputChange}
            required
            className={styles.inputField}
          >
            <option value="">Select effectiveness</option>
            <option value="1">Slightly Helpful</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">Very Helpful</option>
          </select>
        </div>

        {/* Stress Level When Stressed */}
        <div className={styles.formGroup}>
          <label htmlFor="stressLevelWhenStressed">When you experience stress, what is usually the level of your stress?</label>
          <select
            id="stressLevelWhenStressed"
            name="stressLevelWhenStressed"
            value={formData.stressLevelWhenStressed}
            onChange={handleInputChange}
            required
            className={styles.inputField}
          >
            <option value="">Select stress level</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Professional Help Seeking */}
        <div className={styles.formGroup}>
          <input
            type="checkbox"
            id="professionalHelpSeeking"
            name="professionalHelpSeeking"
            checked={formData.professionalHelpSeeking}
            onChange={handleInputChange}
            className={styles.checkboxInput}
          />
          <label htmlFor="professionalHelpSeeking" className={styles.checkboxText}>Have you tried seeking for professional help?</label>
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default SurveyForm;
