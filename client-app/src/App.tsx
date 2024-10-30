import './App.css';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import AssessmentForm, { AssessmentData } from './components/AssessmentForm';
import { createAssessment } from './services/assessmentService';
import AssessmentTable from './components/AssessmentTable';
import RadialChart from './components/RadialChart';
import DatePickerWithRange from './components/DatePickerWithRange';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

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

  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);
    setRefresh(!refresh);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      <h1 className="text-2xl font-bold mb-4">Needfull</h1>
      {/* <AssessmentForm onSubmit={handleAssessmentSubmit} onSubmitSuccess={() => setRefresh(!refresh)} /> */}
      <DatePickerWithRange onDateRangeChange={handleDateRangeChange} />

      <RadialChart />
      <AssessmentTable refresh={refresh} dateRange={dateRange} />
    </div>
  );
}

export default App;