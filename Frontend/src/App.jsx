import React, { useState, useEffect } from 'react';
import UrlShortenerForm from './components/UrlShortenerForm';
import AnalyticsChart from './components/AnalyticsChart';
import UrlTable from './components/UrlTable';
import { mockUrls, mockChartData } from './services/mockData';
import { Activity } from 'lucide-react';

function App() {
  const [urls, setUrls] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Load initial data
  useEffect(() => {
    const storedUrls = localStorage.getItem('shortenedUrls');

    if (storedUrls) {
      setUrls(JSON.parse(storedUrls));
    } else {
      setUrls(mockUrls);
      localStorage.setItem('shortenedUrls', JSON.stringify(mockUrls));
    }

    setChartData(mockChartData);
  }, []);

  // Handle new shortened URL
  const handleUrlAdded = (newUrl) => {
    const updatedUrls = [newUrl, ...urls];
    setUrls(updatedUrls);

    localStorage.setItem('shortenedUrls', JSON.stringify(updatedUrls));

    // Simulate analytics update
    setChartData((prev) => {
      const newData = [...prev];

      if (newData.length > 0) {
        newData[newData.length - 1] = {
          ...newData[newData.length - 1],
          clicks: newData[newData.length - 1].clicks + 1,
        };
      }

      return newData;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 font-sans text-gray-900 flex flex-col selection:bg-indigo-400 selection:text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* ===== Navbar ===== */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300 transform group-hover:scale-110">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight text-white">
                  URL Shortener
                </span>
                <p className="text-xs text-indigo-200 font-medium">Analytics Dashboard</p>
              </div>
            </div>

            {/* Right text */}
            <div className="hidden sm:flex items-center">
              <span className="text-sm text-indigo-100 font-medium bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all">
                ✨ Make links shorter
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== Main Content ===== */}
      <main className="flex-1 relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex flex-col gap-8">

        {/* Hero Section */}
        <section className="w-full text-center mb-4">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-sm font-semibold backdrop-blur-sm">
              🚀 Simplify Your Links
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 leading-tight">
            Create Short Links,<br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Track More Data</span>
          </h1>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto mb-8 font-light">
            Convert long, unwieldy URLs into short, shareable links. Track every click, analyze patterns, and boost your online presence.
          </p>
        </section>

        {/* Form Section */}
        <section className="w-full">
          <UrlShortenerForm onUrlAdded={handleUrlAdded} />
        </section>

        {/* Dashboard */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full items-start">
          
          {/* Chart */}
          <div className="h-full flex w-full">
            <AnalyticsChart data={chartData} />
          </div>

          {/* Table */}
          <div className="h-full flex w-full overflow-hidden">
            <UrlTable urls={urls} />
          </div>

        </section>

      </main>

      {/* ===== Footer ===== */}
      <footer className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-lg mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-indigo-200 text-sm font-medium">© 2026 URL Shortener. All rights reserved.</p>
            <p className="text-indigo-300 text-sm mt-4 sm:mt-0">Built with React, Tailwind & ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;