import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { DateRange } from 'react-day-picker';

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

interface AssessmentTableProps {
  refresh: boolean;
  dateRange: DateRange | undefined;
}

const AssessmentTable: React.FC<AssessmentTableProps> = ({ refresh, dateRange }) => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(false);
  const [averages, setAverages] = useState<{ [key: string]: number }>({});    
  

  useEffect(() => {
    fetchAssessments();
  }, [refresh, dateRange]);

  const fetchAssessments = async () => {
    setLoading(true);
    try {
      let url = 'http://localhost:5000/api/assessments';
      if (dateRange?.from && dateRange?.to) {
        const fromDate = format(dateRange.from, 'yyyy-MM-dd');
        const toDate = format(dateRange.to, 'yyyy-MM-dd');
        url += `?from=${fromDate}&to=${toDate}`;
      }
      const response = await axios.get<Assessment[]>(url);
      setAssessments(response.data);
      // Calculate averages
      const newAverages: { [key: string]: number } = {};
      const fields = [
        'livelihoodAvgRating',
        'connectionAvgRating',
        'esteemAvgRating',
        'autonomyAvgRating',
        'purposeAvgRating',
        'actualizationAvgRating',
      ];

      fields.forEach((field) => {
        const sum = response.data.reduce((acc, assessment) => acc + assessment[field], 0); //why
        newAverages[field] = sum / response.data.length;
      });

      setAverages(newAverages);
      } catch (error) {
      console.error('Error fetching assessments:', error);
      } finally {
      setLoading(false);
      }
      };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (assessments.length === 0) {
    return <div className="text-center">No assessments found for the selected date range.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Assessments</h2>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Livelihood</th>
              <th className="px-4 py-2">Connection</th>
              <th className="px-4 py-2">Esteem</th>
              <th className="px-4 py-2">Autonomy</th>
              <th className="px-4 py-2">Purpose</th>
              <th className="px-4 py-2">Actualization</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {assessments.map((assessment) => (
              <tr key={assessment.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{assessment.id}</td>
                <td className="px-4 py-2">{assessment.livelihoodAvgRating.toFixed(2)}</td>
                <td className="px-4 py-2">{assessment.connectionAvgRating.toFixed(2)}</td>
                <td className="px-4 py-2">{assessment.esteemAvgRating.toFixed(2)}</td>
                <td className="px-4 py-2">{assessment.autonomyAvgRating.toFixed(2)}</td>
                <td className="px-4 py-2">{assessment.purposeAvgRating.toFixed(2)}</td>
                <td className="px-4 py-2">{assessment.actualizationAvgRating.toFixed(2)}</td>
                <td className="px-4 py-2">{format(parseISO(assessment.date), 'MMM dd, yyyy')}</td>
              </tr>
            ))}
            <tr className="bg-gray-100 font-bold">
              <td className="px-4 py-2">Averages</td>
              <td className="px-4 py-2">{averages.livelihoodAvgRating?.toFixed(2)}</td>
              <td className="px-4 py-2">{averages.connectionAvgRating?.toFixed(2)}</td>
              <td className="px-4 py-2">{averages.esteemAvgRating?.toFixed(2)}</td>
              <td className="px-4 py-2">{averages.autonomyAvgRating?.toFixed(2)}</td>
              <td className="px-4 py-2">{averages.purposeAvgRating?.toFixed(2)}</td>
              <td className="px-4 py-2">{averages.actualizationAvgRating?.toFixed(2)}</td>
              <td className="px-4 py-2">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssessmentTable;