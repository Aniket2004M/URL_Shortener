import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart2 } from 'lucide-react';

const AnalyticsChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 min-h-[400px] flex flex-col w-full">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <BarChart2 className="h-5 w-5 text-indigo-600" />
        Clicks Over Time
      </h2>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 13}} dy={15} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 13}} dx={-10} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: '500' }}
            />
            <Line 
              type="monotone" 
              dataKey="clicks" 
              stroke="#4f46e5" 
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#4f46e5' }}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#4f46e5' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;
