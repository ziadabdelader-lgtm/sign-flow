'use client';

import { motion } from 'framer-motion';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const data = [
  { day: 'Mon', conversations: 12, translations: 45 },
  { day: 'Tue', conversations: 18, translations: 62 },
  { day: 'Wed', conversations: 15, translations: 38 },
  { day: 'Thu', conversations: 22, translations: 71 },
  { day: 'Fri', conversations: 28, translations: 89 },
  { day: 'Sat', conversations: 19, translations: 54 },
  { day: 'Sun', conversations: 14, translations: 42 },
];

export function UsageChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-2xl border border-border bg-card p-6 shadow-soft"
    >
      <h3 className="text-lg font-semibold mb-6">Weekly Activity</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
            <XAxis dataKey="day" className="text-xs" tickLine={false} axisLine={false} />
            <YAxis className="text-xs" tickLine={false} axisLine={false} />
            <Tooltip
              cursor={{ fill: 'hsl(var(--muted))' }}
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid hsl(var(--border))',
                background: 'hsl(var(--card))',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="conversations" fill="#1A8FD1" radius={[6, 6, 0, 0]} />
            <Bar dataKey="translations" fill="#29C5E6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
