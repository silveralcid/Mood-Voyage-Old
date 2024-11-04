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
    color: "hsl(var(--chart-6, 200, 50%, 50%))",
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
        {payload.map((entry: any, index: number) => {
          const label = entry.value.charAt(0).toUpperCase() + entry.value.slice(1)
          return (
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
              {label}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <ChartContainer
      config={chartConfig}
      className={`h-full w-full p-4 ${className}`}
    >
      <RechartsLineChart
        data={chartData}
        margin={{
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          minTickGap={32}
          tickFormatter={(value: string) => {
            const date = new Date(value)
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          }}
        />
        <YAxis 
          domain={[0, 5]} 
          tickCount={6} 
          tickMargin={10}
        />
        <Legend 
          verticalAlign="top"
          height={36}
          wrapperStyle={{ top: 0, left: 0 }}
          content={<CustomizedLegend />}
        />
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
  )
}

export { LineChart }
export default LineChart