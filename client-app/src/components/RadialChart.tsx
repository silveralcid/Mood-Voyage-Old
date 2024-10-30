"use client"

import React from 'react';
import { TrendingUp } from "lucide-react"
import { RadialBar, RadialBarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radial chart"

interface ChartData {
  need: string;
  rating: number;
  fill: string;
}

const chartData: ChartData[] = [
  { need: "actualization", rating: 60, fill: "var(--color-actualization)" },
  { need: "purpose", rating: 90, fill: "var(--color-purpose)" },
  { need: "autonomy", rating: 50, fill: "var(--color-autonomy)" },
  { need: "esteem", rating: 30, fill: "var(--color-esteem)" },
  { need: "connection", rating: 10, fill: "var(--color-connection)" },
  { need: "livelihood", rating: 60, fill: "var(--color-livelihood)" },
]

const chartConfig: ChartConfig = {
  rating: {
    label: "rating",
  },
  actualization: {
    label: "Actualization",
    color: "hsl(var(--chart-6))",
  },
  purpose: {
    label: "Purpose",
    color: "hsl(var(--chart-5))",
  },
  autonomy: {
    label: "Autonomy",
    color: "hsl(var(--chart-4))",
  },
  esteem: {
    label: "Esteem",
    color: "hsl(var(--chart-3))",
  },
  connection: {
    label: "Connection",
    color: "hsl(var(--chart-2))",
  },
  livelihood: {
    label: "Livelihood",
    color: "hsl(var(--chart-1))",
  },
}

const RadialChart: React.FC = () => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Needs</CardTitle>
        {/* <CardDescription>Date</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="need" />}
            />
            <RadialBar dataKey="rating" background />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        {/* <div className="leading-none text-muted-foreground">
          Showing data for today
        </div> */}
      </CardFooter>
    </Card>
  )
}

export default RadialChart;