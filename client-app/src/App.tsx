import './App.css';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import AssessmentForm, { AssessmentData } from './components/AssessmentForm';
import { createAssessment } from './services/assessmentService';
import AssessmentTable from './components/AssessmentTable';

import DatePickerWithRange from './components/DatePickerWithRange';

import LineChart from './components/LineChart';
import RadialChart from './components/RadialChart';
import RadarChart from './components/RadarChart';




function App() {
  const [refresh, setRefresh] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [averages, setAverages] = useState<{ [key: string]: number }>({});

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

  const handleAveragesUpdate = (newAverages: { [key: string]: number }) => {
    setAverages(newAverages);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      <h1 className="text-2xl font-bold mb-4">Needfull</h1>
      {/* <AssessmentForm onSubmit={handleAssessmentSubmit} onSubmitSuccess={() => setRefresh(!refresh)} /> */}
      <DatePickerWithRange onDateRangeChange={handleDateRangeChange} />

      <div className="flex flex-row">
        <RadialChart averages={averages} />
        <LineChart />
        <RadarChart averages={averages} />
      </div>

      <AssessmentTable 
        refresh={refresh} 
        dateRange={dateRange} 
        onAveragesUpdate={handleAveragesUpdate}
      />
    </div>
  );
}

export default App;