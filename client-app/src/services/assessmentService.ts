import api from '../api/api';
import { AssessmentData } from '../components/AssessmentForm';

export const createAssessment = async (assessmentData: AssessmentData) => {
    try {
        const response = await api.post('/assessments', assessmentData);
        return response.data;
    } catch (error) {
        console.error('Error creating assessment:', error);
        throw error;
    }
};