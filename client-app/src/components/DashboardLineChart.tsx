"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart as RechartsLineChart, XAxis, YAxis, Legend } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// ... (keep the existing interfaces)

const chartConfig = {
  all: {
    label: "All Categories",
    color: "hsl(var(--chart-0))",
  },
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

const LineChart: React.FC<LineChartProps> = ({ className, assessments, averages }) => {
  const [activeChart, setActiveChart] = 
    React.useState<keyof typeof chartConfig>("all")

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

    return (
        <Card className={className}>
          <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0">
            <div className="grid grid-flow-col auto-cols-fr">
              {Object.keys(chartConfig).map((key) => {
                const chart = key as keyof typeof chartConfig
                return (
                  <button
                    key={chart}
                    data-active={activeChart === chart}
                    className="flex flex-col justify-center gap-1 border-r px-4 py-3 text-center last:border-r-0 data-[active=true]:bg-muted/50"
                    onClick={() => setActiveChart(chart)}
                  >
                    <span className="text-xs text-muted-foreground">
                      {chartConfig[chart].label}
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
                <YAxis domain={[0, 5]} />
                {activeChart === "all" && <Legend />}
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      nameKey={activeChart === "all" ? undefined : activeChart}
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
                {activeChart === "all" ? (
                  Object.keys(chartConfig).filter(key => key !== "all").map((key) => (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={chartConfig[key as keyof typeof chartConfig].color}
                      strokeWidth={2}
                      dot={false}
                    />
                  ))
                ) : (
                  <Line
                    dataKey={activeChart}
                    type="monotone"
                    stroke={chartConfig[activeChart].color}
                    strokeWidth={2}
                    dot={false}
                  />
                )}
              </RechartsLineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )
    }
    
    export { LineChart }
    export default LineChart
    
    