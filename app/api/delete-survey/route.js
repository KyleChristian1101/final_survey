// app/api/delete-survey-data/route.js
import { NextResponse } from 'next/server';
import connectMongo from '../../../utils/db';
import Survey from '../../../models/Survey';

export const revalidate = 0;
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await connectMongo(); // Ensure the database is connected
    const deletedSurvey = await Survey.findByIdAndDelete(id);

    if (!deletedSurvey) {
      return NextResponse.json({ error: 'Survey not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Survey deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting survey data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
