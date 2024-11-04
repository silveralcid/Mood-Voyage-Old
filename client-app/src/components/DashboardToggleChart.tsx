import React from 'react';
import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart as RechartsRadarChart, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface DashboardToggleChartProps {
  averages?: { [key: string]: number };
  className?: string;
}

const chartConfig: ChartConfig = {
  rating: {
    label: "Rating",
    color: "hsl(var(--chart-1))",
  },
};

export const DashboardToggleChart: React.FC<DashboardToggleChartProps> = ({ 
  averages = {},
  className 
}) => {
  const chartData = [
    {
      need: "Actualization",
      rating: Math.round(averages.actualizationAvgRating || 0),
    },
    {
      need: "Purpose",
      rating: Math.round(averages.purposeAvgRating || 0),
    },
    {
      need: "Autonomy",
      rating: Math.round(averages.autonomyAvgRating || 0),
    },
    {
      need: "Esteem",
      rating: Math.round(averages.esteemAvgRating || 0),
    },
    {
      need: "Connection",
      rating: Math.round(averages.connectionAvgRating || 0),
    },
    {
      need: "Livelihood",
      rating: Math.round(averages.livelihoodAvgRating || 0),
    },
  ];

  return (
    <div className={`h-full flex flex-col ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-semibold">Needs</h3>
          <p className="text-sm text-muted-foreground">Radar Chart</p>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsRadarChart data={chartData}>
              <ChartTooltip 
                cursor={false} 
                content={<ChartTooltipContent nameKey="need" valueKey="rating" />} 
              />
              <PolarAngleAxis dataKey="need" />
              <PolarGrid />
              <Radar
                name="Rating"
                dataKey="rating"
                fill="var(--color-chart-1)"
                fillOpacity={0.6}
                stroke="var(--color-chart-1)"
              />
            </RechartsRadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm font-medium">
        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
      </div>
    </div>
  )
};

export default DashboardToggleChart;