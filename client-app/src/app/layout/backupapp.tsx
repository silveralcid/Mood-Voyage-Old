import './index.css';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import AssessmentForm, { AssessmentData } from '../../components/AssessmentForm';
import { createAssessment } from '../../services/assessmentService';
import AssessmentTable from '../../components/AssessmentTable';
import DatePickerWithRange from '../../components/DatePickerWithRange';
import LineChart from '../../components/charts/LineChart';
import RadialChart from '../../components/charts/RadialChart';
import RadarChart from '../../components/charts/RadarChart';
import { ResponsiveContainer } from 'recharts';

interface Assessment {
  date: string;
  id: string;
  livelihoodAvgRating: number;
  connectionAvgRating: number;
  esteemAvgRating: number;
  autonomyAvgRating: number;
  purposeAvgRating: number;
  actualizationAvgRating: number;
}

function App() {
  const [refresh, setRefresh] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [averages, setAverages] = useState<{ [key: string]: number }>({});
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  const handleAssessmentSubmit = async (data: AssessmentData) => {
    try {
      const createdAssessment = await createAssessment(data);
      console.log('Assessment created:', createdAssessment);
      setRefresh(!refresh);
    } catch (error) {
      console.error('Failed to create assessment:', error);
    }
  };

  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);
    setRefresh(!refresh);
  };

  const handleAveragesUpdate = (newAverages: { [key: string]: number }, assessmentsData: Assessment[]) => {
    setAverages(newAverages);
    setAssessments(assessmentsData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      <h1 className="text-2xl font-bold mb-4">Needfull</h1>
      <DatePickerWithRange onDateRangeChange={handleDateRangeChange} />
      <LineChart assessments={assessments} averages={averages} />
          <div className='flex gap-4'>
      <div className="min-w-[300px] w-full">
        <ResponsiveContainer width="100%" minHeight={300} aspect={1}>
          <RadialChart averages={averages} />
        </ResponsiveContainer>
      </div>
      <div className="min-w-[300px] w-full">
        <ResponsiveContainer width="100%" minHeight={300} aspect={1}>
          <RadarChart averages={averages} />
        </ResponsiveContainer>
      </div>
    </div>
      <AssessmentTable 
        refresh={refresh} 
        dateRange={dateRange} 
        onAveragesUpdate={(newAverages, assessmentsData) => 
          handleAveragesUpdate(newAverages, assessmentsData)
        }
      />
    </div>
  );
}

export default App;