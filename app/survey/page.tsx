"use client";

import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import styles from './SurveyPage.module.css';


interface FormData {
  name: string;
  age: string;
  gender: string;
  educationLevel: string;
  location: string;
  environmentalKnowledge: string;
  environmentalConcerns: string[];
  informationSources: string[];
  recyclingFrequency: string;
  recyclingPractice: string;
  waterUsagePractice: string;
  energyEfficientAppliancesPractice: string;
  publicTransportationPractice: string;
  reducingPlasticsPractice: string;
  compostingPractice: string;
  supportingEcoFriendlyBrandsPractice: string;
}

const SurveyPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    gender: '',
    educationLevel: '',
    location: '',
    environmentalKnowledge: '',
    environmentalConcerns: [],
    informationSources: [],
    recyclingFrequency: '',
    recyclingPractice: '',
    waterUsagePractice: '',
    energyEfficientAppliancesPractice: '',
    publicTransportationPractice: '',
    reducingPlasticsPractice: '',
    compostingPractice: '',
    supportingEcoFriendlyBrandsPractice: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData((prevState) => ({
        ...prevState,
        [name]: checkbox.checked
          ? [...(prevState[name as keyof FormData] as string[]), value]
          : (prevState[name as keyof FormData] as string[]).filter((item) => item !== value),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const requiredFields: (keyof FormData)[] = [
      'age', 
      'gender', 
      'educationLevel', 
      'location', 
      'environmentalKnowledge', 
      'environmentalConcerns',
      'informationSources', 
      'recyclingFrequency', 
      'recyclingPractice', 
      'waterUsagePractice', 
      'energyEfficientAppliancesPractice', 
      'publicTransportationPractice', 
      'reducingPlasticsPractice', 
      'compostingPractice', 
      'supportingEcoFriendlyBrandsPractice'
    ];
  
    const missingFields = requiredFields.filter(field => {
      if (Array.isArray(formData[field])) {
        return (formData[field] as string[]).length === 0;
      } else {
        return !formData[field];
      }
    });
  
    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.map(field => {
        switch (field) {
          case 'age':
            return 'Age';
          case 'gender':
            return 'Gender';
          case 'educationLevel':
            return 'Education Level';
          case 'location':
            return 'Location';
          case 'environmentalKnowledge':
            return 'Knowledge about Environmental Issues';
          case 'environmentalConcerns':
            return 'Environmental Concerns';
          case 'informationSources':
            return 'Information Sources';
          case 'recyclingFrequency':
            return 'Recycling Frequency';
          case 'recyclingPractice':
            return 'Recycling Practice';
          case 'waterUsagePractice':
            return 'Water Usage Practice';
          case 'energyEfficientAppliancesPractice':
            return 'Energy-efficient Appliances Practice';
          case 'publicTransportationPractice':
            return 'Public Transportation/Carpooling Practice';
          case 'reducingPlasticsPractice':
            return 'Reducing Single-use Plastics Practice';
          case 'compostingPractice':
            return 'Composting Practice';
          case 'supportingEcoFriendlyBrandsPractice':
            return 'Supporting Eco-friendly Brands Practice';
          default:
            return '';
        }
      });
    
      alert(`Please answer all required questions:\n\n- ${missingFieldNames.join('\n- ')}`);
      return false;
    }
  
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      await axios.post('/api/submit-survey', formData);
      window.location.href = '/thankyou';
    } catch (error) {
      alert('Error submitting survey');
      console.error('Error submitting survey:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.surveyContainer}>
      {loading && (
        <div className={styles.loadingScreen}>
          <div className={styles.spinner}></div>
          <p>Submitting your survey...</p>
        </div>
      )}
      <div className={styles.card}>
        <div className={styles.redLine}></div>
        <h2>Environmental Awareness and Practices</h2>
        <p>
          We appreciate you taking the time to complete this survey. We will be able to better understand our community's environmental knowledge and behaviors thanks to your responses. 
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
            Age:
            <select name="age" value={formData.age} onChange={handleChange} className={styles.inputField}>
              <option value="" disabled>Select Age</option>
              <option value="Under 18">Under 18</option>
              <option value="18-24">18-24</option>
              <option value="25-34">25-34</option>
              <option value="35-44">35-44</option>
              <option value="45-54">45-54</option>
              <option value="55-64">55-64</option>
              <option value="65 and over">65 and over</option>
            </select>
          </label>
        </div>

        <div className={styles.card}>
          <label>
            Gender:
            <select name="gender" value={formData.gender} onChange={handleChange} className={styles.inputField}>
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </label>
        </div>

        <div className={styles.card}>
          <label>
            Education Level:
            <select name="educationLevel" value={formData.educationLevel} onChange={handleChange} className={styles.inputField}>
              <option value="" disabled>Select Education Level</option>
              <option value="Less than high school">Less than high school</option>
              <option value="High school diploma or equivalent">High school diploma or equivalent</option>
              <option value="Some college">Some college</option>
              <option value="Associate degree">Associate degree</option>
              <option value="Bachelor’s degree">Bachelor’s degree</option>
              <option value="Master’s degree">Master’s degree</option>
              <option value="Doctorate or higher">Doctorate or higher</option>
            </select>
          </label>
        </div>

        <div className={styles.card}>
          <label>
            Location:
            <select name="location" value={formData.location} onChange={handleChange} className={styles.inputField}>
              <option value="" disabled>Select Location</option>
              <option value="Urban">Urban</option>
              <option value="Suburban">Suburban</option>
              <option value="Rural">Rural</option>
            </select>
          </label>
        </div>

        <div className={styles.card}>
          <label>
            How would you rate your knowledge about environmental issues?
            <select name="environmentalKnowledge" value={formData.environmentalKnowledge} onChange={handleChange} className={styles.inputField}>
              <option value="" disabled>Select Knowledge Level</option>
              <option value="Very knowledgeable">Very knowledgeable</option>
              <option value="Somewhat knowledgeable">Somewhat knowledgeable</option>
              <option value="Neutral">Neutral</option>
              <option value="Somewhat unknowledgeable">Somewhat unknowledgeable</option>
              <option value="Not knowledgeable at all">Not knowledgeable at all</option>
            </select>
          </label>
        </div>

        <div className={styles.card}>
          <label>
            Which of the following environmental issues are you most concerned about? (Select all that apply)
            <div className={styles.checkboxGroup}>
              {[
                'Climate change',
                'Air pollution',
                'Water pollution',
                'Deforestation',
                'Loss of biodiversity',
                'Waste management',
              ].map((concern) => (
                <label key={concern} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="environmentalConcerns"
                    value={concern}
                    checked={formData.environmentalConcerns.includes(concern)}
                    onChange={handleChange}
                  />
                  {concern}
                </label>
              ))}
            </div>
          </label>
        </div>

        <div className={styles.card}>
          <label>
            Where do you get most of your information about environmental issues? (Select all that apply)
            <div className={styles.checkboxGroup}>
              {[
                'Social media',
                'News websites',
                'Television',
                'Friends/Family',
                'Community events',
                'Educational institutions',
              ].map((source) => (
                <label key={source} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="informationSources"
                    value={source}
                    checked={formData.informationSources.includes(source)}
                    onChange={handleChange}
                  />
                  {source}
                </label>
              ))}
            </div>
          </label>
        </div>

        <div className={styles.card}>
          <label>
            How often do you recycle?
            <select name="recyclingFrequency" value={formData.recyclingFrequency} onChange={handleChange} className={styles.inputField}>
              <option value="" disabled>Select Frequency</option>
              <option value="Always">Always</option>
              <option value="Often">Often</option>
              <option value="Sometimes">Sometimes</option>
              <option value="Rarely">Rarely</option>
              <option value="Never">Never</option>
            </select>
          </label>
        </div>

        <div className={styles.card}>
          <label>
            How often do you practice the following eco-friendly habits? (Select an option for each)
          </label>
          <div className={styles.ecoFriendlyHabits}>
            <div className={styles.habit}>
              <label>Recycling:</label>
              <select name="recyclingPractice" value={formData.recyclingPractice} onChange={handleChange} className={styles.inputField}>
                <option value="" disabled>Select Frequency</option>
                <option value="Always">Always</option>
                <option value="Often">Often</option>
                <option value="Sometimes">Sometimes</option>
                <option value="Rarely">Rarely</option>
                <option value="Never">Never</option>
              </select>
            </div>
            <div className={styles.habit}>
              <label>Water usage:</label>
              <select name="waterUsagePractice" value={formData.waterUsagePractice} onChange={handleChange} className={styles.inputField}>
                <option value="" disabled>Select Frequency</option>
                <option value="Always">Always</option>
                <option value="Often">Often</option>
                <option value="Sometimes">Sometimes</option>
                <option value="Rarely">Rarely</option>
                <option value="Never">Never</option>
              </select>
            </div>
            <div className={styles.habit}>
              <label>Using energy-efficient appliances:</label>
              <select name="energyEfficientAppliancesPractice" value={formData.energyEfficientAppliancesPractice} onChange={handleChange} className={styles.inputField}>
                <option value="" disabled>Select Frequency</option>
                <option value="Always">Always</option>
                <option value="Often">Often</option>
                <option value="Sometimes">Sometimes</option>
                <option value="Rarely">Rarely</option>
                <option value="Never">Never</option>
              </select>
            </div>
            <div className={styles.habit}>
              <label>Using public transportation or carpooling:</label>
              <select name="publicTransportationPractice" value={formData.publicTransportationPractice} onChange={handleChange} className={styles.inputField}>
                <option value="" disabled>Select Frequency</option>
                <option value="Always">Always</option>
                <option value="Often">Often</option>
                <option value="Sometimes">Sometimes</option>
                <option value="Rarely">Rarely</option>
                <option value="Never">Never</option>
              </select>
            </div>
            <div className={styles.habit}>
              <label>Reducing single-use plastics:</label>
              <select name="reducingPlasticsPractice" value={formData.reducingPlasticsPractice} onChange={handleChange} className={styles.inputField}>
                <option value="" disabled>Select Frequency</option>
                <option value="Always">Always</option>
                <option value="Often">Often</option>
                <option value="Sometimes">Sometimes</option>
                <option value="Rarely">Rarely</option>
                <option value="Never">Never</option>
              </select>
            </div>
            <div className={styles.habit}>
              <label>Composting:</label>
              <select name="compostingPractice" value={formData.compostingPractice} onChange={handleChange} className={styles.inputField}>
                <option value="" disabled>Select Frequency</option>
                <option value="Always">Always</option>
                <option value="Often">Often</option>
                <option value="Sometimes">Sometimes</option>
                <option value="Rarely">Rarely</option>
                <option value="Never">Never</option>
              </select>
            </div>
            <div className={styles.habit}>
              <label>Supporting eco-friendly brands:</label>
              <select name="supportingEcoFriendlyBrandsPractice" value={formData.supportingEcoFriendlyBrandsPractice} onChange={handleChange} className={styles.inputField}>
                <option value="" disabled>Select Frequency</option>
                <option value="Always">Always</option>
                <option value="Often">Often</option>
                <option value="Sometimes">Sometimes</option>
                <option value="Rarely">Rarely</option>
                <option value="Never">Never</option>
              </select>
            </div>
          </div>
        </div>
        <div className={styles.submitButtonContainer}>
          <button type="submit" className={styles.submitButton}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SurveyPage;
