"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart as RechartsLineChart, XAxis, YAxis, Legend } from "recharts"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// ... (keep the existing interfaces)

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

const LineChart: React.FC<LineChartProps> = ({ className, assessments, averages }) => {
  const [activeLines, setActiveLines] = React.useState<Record<string, boolean>>(
    Object.keys(chartConfig).reduce((acc, key) => ({ ...acc, [key]: true }), {})
  )

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

  const handleLegendClick = (dataKey: string) => {
    setActiveLines(prev => ({ ...prev, [dataKey]: !prev[dataKey] }))
  }

  const CustomizedLegend = (props: any) => {
    const { payload } = props
    return (
      <ul className="flex flex-wrap justify-center gap-4 text-sm">
        {payload.map((entry: any, index: number) => (
          <li
            key={`item-${index}`}
            className={`cursor-pointer transition-all duration-300 ${
              activeLines[entry.dataKey] ? '' : 'opacity-50 grayscale'
            }`}
            onClick={() => handleLegendClick(entry.dataKey)}
          >
            <span
              className="inline-block w-3 h-3 mr-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            {entry.value}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <Card className={className}>
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
              top: 20,
              bottom: 20,
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
            <Legend content={<CustomizedLegend />} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
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
            {Object.keys(chartConfig).map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={chartConfig[key as keyof typeof chartConfig].color}
                strokeWidth={2}
                dot={false}
                hide={!activeLines[key]}
              />
            ))}
          </RechartsLineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export { LineChart }
export default LineChart