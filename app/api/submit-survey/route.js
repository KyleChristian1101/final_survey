import { NextResponse } from 'next/server';
import connectMongo from '../../../utils/db';
import Survey from '../../../models/Survey';

export async function POST(request) {
  try {
    await connectMongo();
    const data = await request.json();
    const survey = new Survey(data);
    await survey.save();
    return NextResponse.json({ message: 'Survey data saved successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error saving survey data' }, { status: 500 });
  }
}
