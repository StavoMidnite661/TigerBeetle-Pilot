'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { transactionVolume } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

export default function TransactionChart() {
  const chartConfig = {
    volume: {
      label: 'Volume',
      color: 'hsl(var(--primary))',
    },
  };

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart data={transactionVolume} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey="volume" fill="var(--color-volume)" radius={4} />
        </BarChart>
    </ChartContainer>
  );
}
