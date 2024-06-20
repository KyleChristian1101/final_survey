// pages/api/get-survey-data.js

import connectMongo from '../../utils/db';
import Survey from '../../models/Survey';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  await connectMongo();

  try {
    const surveyData = await Survey.find({});
    res.status(200).json(surveyData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching survey data' });
  }
};
