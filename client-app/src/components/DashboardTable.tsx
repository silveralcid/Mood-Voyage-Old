import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Assessment {
  date: string;
  livelihoodAvgRating: number;
  connectionAvgRating: number;
  esteemAvgRating: number;
  autonomyAvgRating: number;
  purposeAvgRating: number;
  actualizationAvgRating: number;
}

interface DashboardTableProps {
  refresh: boolean;
  dateRange: DateRange | undefined;
  onAveragesUpdate: (averages: { [key: string]: number }, assessments: Assessment[]) => void;
}

const DashboardTable: React.FC<DashboardTableProps> = ({ refresh, dateRange, onAveragesUpdate }) => {
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
      onAveragesUpdate(newAverages, response.data);
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

  const recentAssessments = assessments.slice(0, 5);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Livelihood</TableHead>
              <TableHead>Connection</TableHead>
              <TableHead>Esteem</TableHead>
              <TableHead>Autonomy</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Actualization</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentAssessments.map((assessment) => (
              <TableRow key={assessment.date}>
                <TableCell>{format(parseISO(assessment.date), 'MMM dd, yyyy')}</TableCell>
                <TableCell>{assessment.livelihoodAvgRating}</TableCell>
                <TableCell>{assessment.connectionAvgRating}</TableCell>
                <TableCell>{assessment.esteemAvgRating}</TableCell>
                <TableCell>{assessment.autonomyAvgRating}</TableCell>
                <TableCell>{assessment.purposeAvgRating}</TableCell>
                <TableCell>{assessment.actualizationAvgRating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Button className="mt-4" onClick={() => console.log("More button clicked")}>
        More
      </Button>
    </div>
  );
};

export default DashboardTable;