'use client';
import { Pie, PieChart } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
export const description = 'A pie chart with no separator';

export interface IPieChartProps {
  name: string;
  value: number;
  fill: string;
}

export function PieCharts({
  chartConfig,
  chartData,
  showLabel,
}: {
  chartConfig: ChartConfig;
  chartData: IPieChartProps[];
  showLabel?: boolean;
}) {
  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie data={chartData} dataKey="value" nameKey="name" stroke="0" />
        {showLabel && (
          <ChartLegend
            content={<ChartLegendContent nameKey="name" />}
            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
          />
        )}
      </PieChart>
    </ChartContainer>
  );
}
