"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart as RechartsLineChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface Assessment {
  date: string
  id: string
  livelihoodAvgRating: number
  connectionAvgRating: number
  esteemAvgRating: number
  autonomyAvgRating: number
  purposeAvgRating: number
  actualizationAvgRating: number
}

interface ChartDataPoint {
  date: string
  livelihood: number
  connection: number
  esteem: number
  autonomy: number
  purpose: number
  actualization: number
}

interface Averages {
  livelihoodAvgRating: number
  connectionAvgRating: number
  esteemAvgRating: number
  autonomyAvgRating: number
  purposeAvgRating: number
  actualizationAvgRating: number
}

const chartConfig = {
  livelihood: {
    label: "Livelihood",
    color: "hsl(var(--chart-1))",
  },
  connection: {
    label: "Connection",
    color: "hsl(var(--chart-2))",
  },
  esteem: {
    label: "Esteem",
    color: "hsl(var(--chart-3))",
  },
  autonomy: {
    label: "Autonomy",
    color: "hsl(var(--chart-4))",
  },
  purpose: {
    label: "Purpose",
    color: "hsl(var(--chart-5))",
  },
  actualization: {
    label: "Actualization",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig

interface LineChartProps {
  className?: string
  assessments: Assessment[]
  averages: Averages
}

const LineChart: React.FC<LineChartProps> = ({ className, assessments, averages }) => {
  const [activeChart, setActiveChart] = 
    React.useState<keyof typeof chartConfig>("livelihood")

 // Transform and sort assessments data
 const chartData: ChartDataPoint[] = assessments
 .map(assessment => ({
   date: assessment.date,
   livelihood: Math.round(assessment.livelihoodAvgRating),
   connection: Math.round(assessment.connectionAvgRating),
   esteem: Math.round(assessment.esteemAvgRating),
   autonomy: Math.round(assessment.autonomyAvgRating),
   purpose: Math.round(assessment.purposeAvgRating),
   actualization: Math.round(assessment.actualizationAvgRating),
 }))
 .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Round the averages for display
  const roundedAverages = Object.keys(averages).reduce((acc, key) => {
    acc[key as keyof typeof averages] = Math.round(averages[key as keyof typeof averages]);
    return acc;
  }, {} as Averages)[1];

  return (
    <Card className={className}>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-wrap">
          {Object.keys(chartConfig).map((key) => {
            const chart = key as keyof typeof chartConfig
            const avgKey = `${key}AvgRating` as keyof typeof averages
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {averages[avgKey] ? Math.round(averages[avgKey]) : '-'}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <RechartsLineChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value: string) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey={activeChart}
                  labelFormatter={(value: string) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={chartConfig[activeChart].color}
              strokeWidth={2}
              dot={false}
            />
          </RechartsLineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export { LineChart }
export default LineChart