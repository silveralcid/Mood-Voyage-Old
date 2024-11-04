import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardTable from './DashboardTable';
import DashboardLineChart from './DashboardLineChart';
import DashboardToggleChart from './DashboardToggleChart';
import DatePickerWithRange from './DatePickerWithRange';
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

interface Averages {
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
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [averages, setAverages] = useState<Averages>({
    livelihoodAvgRating: 0,
    connectionAvgRating: 0,
    esteemAvgRating: 0,
    autonomyAvgRating: 0,
    purposeAvgRating: 0,
    actualizationAvgRating: 0,
  });

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleAveragesUpdate = (newAverages: Averages, newAssessments: Assessment[]) => {
    setAverages(newAverages);
    setAssessments(newAssessments);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-center items-center mb-4">
        <DatePickerWithRange onDateRangeChange={setDateRange} />
      </div>
  
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex mb-4 flex-1">
          <Card className="w-2/3 mr-4">
            <CardContent className="h-full">
              <DashboardLineChart assessments={assessments} averages={averages} />
            </CardContent>
          </Card>
          <Card className="w-1/3 h-full">
            <CardContent className="h-full flex flex-col">
              <DashboardToggleChart className="flex-1" averages={averages} />
            </CardContent>
          </Card>
        </div>
  
        <div className="flex flex-1">
          <div className="w-1/3 mr-4 flex flex-col">
            <Card className="flex-1 mb-2">
              <CardContent className="h-full flex items-center justify-center text-gray-500">
                Placeholder Card 1A
              </CardContent>
            </Card>
            <Card className="flex-1 mt-2">
              <CardContent className="h-full flex items-center justify-center text-gray-500">
                Placeholder Card 1B
              </CardContent>
            </Card>
          </div>
          <Card className="w-2/3">
            <CardContent className="h-full">
              <DashboardTable 
                refresh={refresh} 
                dateRange={dateRange} 
                onAveragesUpdate={handleAveragesUpdate} 
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;