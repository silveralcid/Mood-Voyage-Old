import './App.css';
import { useState } from 'react';

import AssessmentForm, { AssessmentData } from './components/AssessmentForm';
import { createAssessment } from './services/assessmentService';
import AssessmentTable from './components/AssessmentTable';

import RadialChart from './components/RadialChart';

function App() {

  const [refresh, setRefresh] = useState(false);

  const handleAssessmentSubmit = async (data: AssessmentData) => {
    try {
      const createdAssessment = await createAssessment(data);
      console.log('Assessment created:', createdAssessment);
      setRefresh(!refresh);
      // Handle successful creation (e.g., show a success message, update UI)
    } catch (error) {
      console.error('Failed to create assessment:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className= "flex flex-col items-center justify-center min-h-screen py-8">
      <h1 className="text-2xl font-bold mb-4">Needfull</h1>
      {/* <AssessmentForm onSubmit={handleAssessmentSubmit} onSubmitSuccess={() => setRefresh(!refresh)} /> */}
      <RadialChart />
      <AssessmentTable refresh={refresh} />
    </div>
  );
}

export default App;