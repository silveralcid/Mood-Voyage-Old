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

const IndividualAssessment: React.FC = () => {
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
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex justify-center items-center">
        <DatePickerWithRange onDateRangeChange={setDateRange} />
      </div>
    
      <div className="flex-1 flex flex-col overflow-hidden p-4">
        <div className="h-1/2 flex mb-4">
          <Card className="w-2/3 mr-4">
            <CardContent className="h-full p-4">
              <DashboardLineChart assessments={assessments} averages={averages} className="h-full" />
            </CardContent>
          </Card>
          <Card className="w-1/3">
            <CardContent className="h-full p-4">
              <DashboardToggleChart className="h-full" averages={averages} />
            </CardContent>
          </Card>
        </div>
    
        <div className="h-1/2 flex">
          <div className="w-1/3 mr-4 flex flex-col">
            <Card className="flex-1 mb-4">
              <CardContent className="h-full flex items-center justify-center text-gray-500">
                Individual Assessment
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardContent className="h-full flex items-center justify-center text-gray-500">
              Individual Assessment
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
  )
};

export default IndividualAssessment;