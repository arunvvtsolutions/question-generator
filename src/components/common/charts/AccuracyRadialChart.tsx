"use client";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import React from "react";
import { RadialBarChart, RadialBar,  PolarRadiusAxis, Label } from "recharts";

export interface IRadialChartProps {
  name: string;
  accuracy: number;
  total: number;
}

export interface RadialChartConfig {
  chartData: IRadialChartProps[];
  percentage: number;
  totalValue: number;
  fillColor: string;
}

export function RadialChart({
  chartData,
  chartConfig,
  centerLabel,
  activeToolTip,
  centerLableValue,
}: {
  centerLableValue?: string;
  centerLabel?: string;
  chartConfig: ChartConfig;
  activeToolTip?: boolean;
  chartData: IRadialChartProps[];
}) {
  return (
    <div className="flex flex-col items-center">
      <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-w-[250px]">
        <RadialBarChart data={chartData} endAngle={180} innerRadius={80} outerRadius={130}>
         {activeToolTip && <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />}
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            {centerLabel ||
              (centerLableValue && (
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          {centerLableValue && (
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) - 16}
                              className="fill-foreground text-[16px] font-medium"
                            >
                              {centerLableValue}
                            </tspan>
                          )}
                          {centerLabel && (
                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 4} className="fill-muted-foreground">
                              {centerLabel}
                            </tspan>
                          )}
                        </text>
                      );
                    }
                  }}
                />
              ))}
          </PolarRadiusAxis>
          <RadialBar
            dataKey={"total"}
            stackId="a"
            cornerRadius={5}
            fill="#f4f4f5"
            className="stroke-transparent stroke-2"
          />
          <RadialBar
            dataKey={"accuracy"}
            stackId="a"
            cornerRadius={5}
            fill="#2D64E5"
            className="stroke-transparent stroke-2"
          />
        </RadialBarChart>
      </ChartContainer>
    </div>
  );
}
