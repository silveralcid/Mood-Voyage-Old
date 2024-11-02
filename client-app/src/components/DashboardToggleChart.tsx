import React from 'react';
import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart as RechartsRadarChart } from "recharts";
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
    <div className={className}>
      <Card className="h-full">
        <CardHeader className="items-center pb-4">
          <CardTitle>Needs </CardTitle>
          <CardDescription>
            Radar Chart
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[calc(100%-theme(spacing.24))] pb-0">
          <ChartContainer
            config={chartConfig}
            className="h-full w-full"
          >
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
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DashboardToggleChart;