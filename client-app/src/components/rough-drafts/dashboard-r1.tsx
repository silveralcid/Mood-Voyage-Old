import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import AssessmentTable from './AssessmentTable';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";

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

const Dashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [refresh, setRefresh] = useState(false);
  const [averages, setAverages] = useState<{ [key: string]: number }>({});
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleAveragesUpdate = (newAverages: { [key: string]: number }, newAssessments: Assessment[]) => {
    setAverages(newAverages);
    setAssessments(newAssessments);
  };

  const chartData = assessments.map(assessment => ({
    date: assessment.date,
    Livelihood: assessment.livelihoodAvgRating,
    Connection: assessment.connectionAvgRating,
    Esteem: assessment.esteemAvgRating,
    Autonomy: assessment.autonomyAvgRating,
    Purpose: assessment.purposeAvgRating,
    Actualization: assessment.actualizationAvgRating,
  }));

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={handleRefresh} className="flex items-center">
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Date Range</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Assessment Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Livelihood" stroke="#8884d8" />
                <Line type="monotone" dataKey="Connection" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Esteem" stroke="#ffc658" />
                <Line type="monotone" dataKey="Autonomy" stroke="#ff7300" />
                <Line type="monotone" dataKey="Purpose" stroke="#00C49F" />
                <Line type="monotone" dataKey="Actualization" stroke="#FFBB28" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assessment Table</CardTitle>
        </CardHeader>
        <CardContent>
          <AssessmentTable
            refresh={refresh}
            dateRange={dateRange}
            onAveragesUpdate={handleAveragesUpdate}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;