import { Pie, PieChart, Label } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
export const description = "A doughnut chart with a hollow center";
export interface IDoughnutChartProps {
  name: string;
  value: number;
  fill: string;
}
export function DoughnutCharts({
  chartConfig,
  chartData,
  showLabel,
  centerTextLabel,
  centerTextLabelValue,
  className,
  centerLabelClassName,
  centerLabelValueClassName,
  innerRadius = "75%",
}: {
  chartConfig: ChartConfig;
  showLabel?: boolean;
  chartData: IDoughnutChartProps[];
  centerTextLabelValue?: string;
  centerTextLabel?: string;
  className?: string;
  centerLabelClassName?: string;
  centerLabelValueClassName?: string;
  innerRadius?: string;
}) {
  return (
    <ChartContainer config={chartConfig} className={cn("mx-auto aspect-square max-h-[250px]", className)}>
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie data={chartData} dataKey="value" nameKey="name" stroke="0" innerRadius={innerRadius} outerRadius="100%">
          {(centerTextLabelValue || centerTextLabel) && (
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      {centerTextLabelValue && (
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className={cn("fill-foreground lg:text-[20px] text-[16px] font-bold", centerLabelValueClassName)}
                        >
                          {centerTextLabelValue}
                        </tspan>
                      )}
                      {centerTextLabel && (
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className={cn("fill-muted-foreground", centerLabelClassName)}
                        >
                          {centerTextLabel}
                        </tspan>
                      )}
                    </text>
                  );
                }
              }}
            />
          )}
        </Pie>
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
