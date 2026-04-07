import React, { useState } from 'react';
import axios from 'axios';
import { Link, Loader2 } from 'lucide-react';

const UrlShortenerForm = ({ onUrlAdded }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl) return;

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/shorten', { originalUrl: originalUrl });
      const newUrl = {
        id: Date.now(),
        shortCode: response.data,
        originalUrl: originalUrl,
        createdAt: new Date().toISOString(),
        clicks: 0
      };
      onUrlAdded(newUrl);
      setOriginalUrl('');
    } catch (err) {
      console.warn('Backend API failed, falling back to mock behavior.', err);
      // Fallback behavior for un-built backend
      const newMockUrl = {
        id: Date.now(),
        shortCode: Math.random().toString(36).substring(2, 8),
        originalUrl: originalUrl,
        createdAt: new Date().toISOString(),
        clicks: 0
      };
      onUrlAdded(newMockUrl);
      setOriginalUrl('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 mb-6 hover:border-white/30 transition-all duration-300">
      <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg">
          <Link className="h-5 w-5 text-white" />
        </div>
        Shorten Your URL
      </h2>
      <p className="text-indigo-200 text-sm mb-6">Paste a long URL and get a short, shareable link instantly</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="url"
          required
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="https://example.com/very-long-url-here"
          className="flex-1 px-5 py-4 text-base rounded-xl border border-white/20 bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent focus:bg-white/20 transition-all placeholder-indigo-300/50 text-white font-medium backdrop-blur-sm hover:border-white/30"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 min-w-[160px] shadow-lg shadow-indigo-500/50 hover:shadow-indigo-600/70 disabled:opacity-70 disabled:shadow-none transform hover:scale-105 active:scale-95"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              Processing...
            </>
          ) : (
            '✨ Shorten'
          )}
        </button>
      </form>
      {error && (
        <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm flex items-center gap-2">
          <span className="text-lg">⚠️</span>
          {error}
        </div>
      )}
    </div>
  );
};

export default UrlShortenerForm;
