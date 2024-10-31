import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { DateRange } from 'react-day-picker';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


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
  onAveragesUpdate: (averages: { [key: string]: number }, assessments: Assessment[]) => void;
}

const AssessmentTable: React.FC<AssessmentTableProps> = ({ refresh, dateRange, onAveragesUpdate }) => {
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
        const sum = response.data.reduce((acc, assessment) => acc + assessment[field], 0);
        newAverages[field] = sum / response.data.length;
      });

      setAverages(newAverages);
      onAveragesUpdate(newAverages, response.data); // Pass both averages and assessments
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
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Livelihood</TableHead>
              <TableHead>Connection</TableHead>
              <TableHead>Esteem</TableHead>
              <TableHead>Autonomy</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Actualization</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessments.map((assessment) => (
              <TableRow key={assessment.id}>
                <TableCell>{assessment.id}</TableCell>
                <TableCell>{Math.round(assessment.livelihoodAvgRating)}</TableCell>
                <TableCell>{Math.round(assessment.connectionAvgRating)}</TableCell>
                <TableCell>{Math.round(assessment.esteemAvgRating)}</TableCell>
                <TableCell>{Math.round(assessment.autonomyAvgRating)}</TableCell>
                <TableCell>{Math.round(assessment.purposeAvgRating)}</TableCell>
                <TableCell>{Math.round(assessment.actualizationAvgRating)}</TableCell>
                <TableCell>
                  {format(parseISO(assessment.date), 'MMM dd, yyyy')}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="font-bold">
              <TableCell>Averages</TableCell>
              <TableCell>
                {averages.livelihoodAvgRating ? Math.round(averages.livelihoodAvgRating) : '-'}
              </TableCell>
              <TableCell>
                {averages.connectionAvgRating ? Math.round(averages.connectionAvgRating) : '-'}
              </TableCell>
              <TableCell>
                {averages.esteemAvgRating ? Math.round(averages.esteemAvgRating) : '-'}
              </TableCell>
              <TableCell>
                {averages.autonomyAvgRating ? Math.round(averages.autonomyAvgRating) : '-'}
              </TableCell>
              <TableCell>
                {averages.purposeAvgRating ? Math.round(averages.purposeAvgRating) : '-'}
              </TableCell>
              <TableCell>
                {averages.actualizationAvgRating ? Math.round(averages.actualizationAvgRating) : '-'}
              </TableCell>
              <TableCell>-</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AssessmentTable;