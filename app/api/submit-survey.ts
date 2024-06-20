import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
let client: MongoClient | null = null;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  try {
    const client = await connectToDatabase();
    const db = client.db();

    const { name, gender, yearLevel, course, stressFrequency, stressSource, copingMechanisms, copingEffectiveness, stressLevel, soughtProfessionalHelp } = req.body;

    const surveyResponse = {
      name,
      gender,
      yearLevel,
      course,
      stressFrequency,
      stressSource,
      copingMechanisms,
      copingEffectiveness: parseInt(copingEffectiveness, 10),
      stressLevel,
      soughtProfessionalHelp: soughtProfessionalHelp === 'true',
    };

    const result = await db.collection('surveys').insertOne(surveyResponse);

    res.status(201).json(result);
  } catch (error) {
    console.error('Error submitting survey:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
