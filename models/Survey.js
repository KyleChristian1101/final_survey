import mongoose from 'mongoose';

const SurveySchema = new mongoose.Schema({
  name: String,
  gender: String,
  yearLevel: String,
  course: String,
  stressFrequency: String,
  stressSource: String,
  copingMechanisms: [String],
  copingEffectiveness: Number,
  stressLevel: String,
  soughtProfessionalHelp: Boolean,
});

export default mongoose.models.Survey || mongoose.model('Survey', SurveySchema);
