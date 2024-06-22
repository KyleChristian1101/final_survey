// SurveyPage.tsx
"use client"
import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import styles from './SurveyPage.module.css';

interface SurveyResponse {
  _id: string;
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
  __v: number;
}

const SurveyPage: React.FC = () => {
  const [formData, setFormData] = useState<SurveyResponse>({
    _id: '',
    name: '',
    gender: '',
    yearLevel: '',
    course: '',
    stressFrequency: '',
    stressSource: '',
    copingMechanisms: [],
    copingEffectiveness: 0,
    stressLevel: '',
    soughtProfessionalHelp: false,
    __v: 0,
  });

  const [responses, setResponses] = useState<SurveyResponse[]>([]);

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const response = await axios.get<SurveyResponse[]>('/api/get-survey-data');
      setResponses(response.data);
    } catch (error) {
      console.error('Error fetching responses:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<SurveyResponse>('/api/submit-survey', formData);
      setResponses((prevResponses) => [...prevResponses, response.data]);
      setFormData({
        _id: '',
        name: '',
        gender: '',
        yearLevel: '',
        course: '',
        stressFrequency: '',
        stressSource: '',
        copingMechanisms: [],
        copingEffectiveness: 0,
        stressLevel: '',
        soughtProfessionalHelp: false,
        __v: 0,
      });
    } catch (error) {
      alert('Error submitting survey');
      console.error('Error submitting survey:', error);
    }
  };

  const handleEdit = (_id: string) => {
  };

  const handleDelete = async (_id: string) => {
    try {
      const response = await axios.delete(`/api/delete-survey?id=${_id}`);
      if (response.status === 200) {
        setResponses((prevResponses) => prevResponses.filter((response) => response._id !== _id));
      } else {
        console.error('Failed to delete the survey');
      }
    } catch (error) {
      console.error('Error deleting survey:', error);
    }
  };
  

  return (
    <div className={styles.responseContainer}>
      {responses.map((response) => (
        <div key={response._id} className={styles.responseCard}>
          <h3>{response.name ? `${response.name}'s Response` : "Unknown's Response"}</h3>
          <p><strong>Gender:</strong> {response.gender}</p>
          <p><strong>Year Level:</strong> {response.yearLevel}</p>
          <p><strong>Course:</strong> {response.course}</p>
          <p><strong>Stress Frequency:</strong> {response.stressFrequency}</p>
          <p><strong>Stress Source:</strong> {response.stressSource}</p>
          <p><strong>Coping Mechanisms:</strong> {response.copingMechanisms.join(', ')}</p>
          <p><strong>Coping Effectiveness:</strong> {response.copingEffectiveness}</p>
          <p><strong>Stress Level:</strong> {response.stressLevel}</p>
          <p><strong>Sought Professional Help:</strong> {response.soughtProfessionalHelp ? 'Yes' : 'No'}</p>
          <div className={styles.buttonGroup}>
            <button className={styles.editButton} onClick={() => handleEdit(response._id)}>Edit</button>
            <button className={styles.deleteButton} onClick={() => handleDelete(response._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SurveyPage;
