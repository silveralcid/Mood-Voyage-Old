import './App.css';
import AssessmentForm, { AssessmentData } from './components/AssessmentForm';
import { createAssessment } from './services/assessmentService';


function App() {

  const handleAssessmentSubmit = async (data: AssessmentData) => {
    try {
      const createdAssessment = await createAssessment(data);
      console.log('Assessment created:', createdAssessment);
      // Handle successful creation (e.g., show a success message, update UI)
    } catch (error) {
      console.error('Failed to create assessment:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div>
      <h1>Needfull</h1>
      <AssessmentForm onSubmit={handleAssessmentSubmit} />
    </div>
  );
}

export default App;