import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart2 } from 'lucide-react';

const AnalyticsChart = ({ data }) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 flex-1 min-h-[400px] flex flex-col w-full hover:border-white/30 transition-all duration-300">
      <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg">
          <BarChart2 className="h-5 w-5 text-white" />
        </div>
        Clicks Over Time
      </h2>
      <p className="text-indigo-200 text-sm mb-6">Real-time analytics of your link performance</p>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'rgba(165, 180, 252, 0.7)', fontSize: 13, fontWeight: 500}} dy={15} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(165, 180, 252, 0.7)', fontSize: 13, fontWeight: 500}} dx={-10} />
            <Tooltip
              contentStyle={{ 
                borderRadius: '12px', 
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(30, 27, 75, 0.8)',
                boxShadow: '0 8px 32px rgba(79, 70, 229, 0.3)',
                fontWeight: '600',
                color: '#fff',
                backdropFilter: 'blur(10px)'
              }}
              formatter={(value) => [value, 'Clicks']}
            />
            <Line 
              type="monotone" 
              dataKey="clicks" 
              stroke="#a5b4fc" 
              strokeWidth={3}
              dot={{ r: 5, strokeWidth: 2, fill: '#1e1b4b', stroke: '#a5b4fc' }}
              activeDot={{ r: 7, strokeWidth: 0, fill: '#a5b4fc' }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;
