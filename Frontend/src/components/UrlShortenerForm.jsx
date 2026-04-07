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
      const response = await axios.post('http://localhost:8080/api/url/shorten', { url: originalUrl });
      onUrlAdded(response.data);
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
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Link className="h-5 w-5 text-indigo-600" />
        Shorten a URL
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="url"
          required
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Paste your long URL here (e.g. https://example.com/long-url)"
          className="flex-1 px-4 py-3 text-base rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-gray-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 min-w-[140px] shadow-sm disabled:opacity-70"
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Shorten'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default UrlShortenerForm;
