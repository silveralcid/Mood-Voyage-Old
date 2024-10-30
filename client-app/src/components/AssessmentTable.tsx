import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
}

const AssessmentTable: React.FC<AssessmentTableProps> = ({ refresh }) => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    fetchAssessments();
  }, [refresh]);

  const fetchAssessments = async () => {
    try {
      const response = await axios.get<Assessment[]>('http://localhost:5000/api/assessments');
      setAssessments(response.data);
    } catch (error) {
      console.error('Error fetching assessments:', error);
    }
  };

  return (
    <div className= "flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Assessments</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Livelihood</th>
            <th>Connection</th>
            <th>Esteem</th>
            <th>Autonomy</th>
            <th>Purpose</th>
            <th>Actualization</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {assessments.map((assessment) => (
            <tr key={assessment.id}>
              <td>{assessment.id}</td>
              <td>{assessment.livelihoodAvgRating}</td>
              <td>{assessment.connectionAvgRating}</td>
              <td>{assessment.esteemAvgRating}</td>
              <td>{assessment.autonomyAvgRating}</td>
              <td>{assessment.purposeAvgRating}</td>
              <td>{assessment.actualizationAvgRating}</td>
              <td>{assessment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssessmentTable;