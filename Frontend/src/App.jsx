import React, { useState, useEffect } from 'react';
import UrlShortenerForm from './components/UrlShortenerForm';
import AnalyticsChart from './components/AnalyticsChart';
import UrlTable from './components/UrlTable';
import { mockUrls, mockChartData } from './services/mockData';
import { Activity } from 'lucide-react';

function App() {
  const [urls, setUrls] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Initial fetch for mock data
    setUrls(mockUrls);
    setChartData(mockChartData);
  }, []);

  const handleUrlAdded = (newUrl) => {
    setUrls([newUrl, ...urls]);
    // Simulate real-time data change for demo
    setChartData((prev) => {
      const newData = [...prev];
      if (newData.length > 0) {
        newData[newData.length - 1] = { 
          ...newData[newData.length - 1], 
          clicks: newData[newData.length - 1].clicks + 1 
        };
      }
      return newData;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl shadow-inner shadow-indigo-400/20">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">
                URL Analytics
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 font-medium hidden sm:block bg-gray-100 px-3 py-1.5 rounded-lg">
                Overview Dashboard
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col gap-6">
        {/* Form Section */}
        <section className="w-full">
          <UrlShortenerForm onUrlAdded={handleUrlAdded} />
        </section>

        {/* Dashboard Grid */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full items-start">
          <div className="h-full flex w-full">
            <AnalyticsChart data={chartData} />
          </div>
          <div className="h-full flex w-full overflow-hidden">
            <UrlTable urls={urls} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
