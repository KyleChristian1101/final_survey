import mongoose from 'mongoose';

const SurveySchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    educationLevel: String,
    location: String,
    environmentalKnowledge: String,
    environmentalConcerns: [String],
    informationSources: [String],
    recyclingFrequency: String,
    recyclingPractice: String,
    waterUsagePractice: String,
    energyEfficientAppliancesPractice: String,
    publicTransportationPractice: String,
    reducingPlasticsPractice: String,
    compostingPractice: String,
    supportingEcoFriendlyBrandsPractice: String,
});

export default mongoose.models.Survey || mongoose.model('Survey', SurveySchema);
