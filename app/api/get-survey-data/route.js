// app/api/get-survey-data/route.js
import { NextResponse } from 'next/server';
import connectMongo from '../../../utils/db';
import Survey from '../../../models/Survey';

export async function GET() {
  try {
    await connectMongo(); // Ensure the database is connected
    const surveyData = await Survey.find({});
    console.log("Fetched survey data:", surveyData);
    return NextResponse.json(surveyData, { status: 200 });
  } catch (error) {
    console.error('Error fetching survey data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
