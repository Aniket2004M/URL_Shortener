import React from 'react';
import { List, ExternalLink, MousePointerClick } from 'lucide-react';

const UrlTable = ({ urls }) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl overflow-hidden flex-1 flex flex-col w-full rounded-2xl shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
      <div className="p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-purple-500/5">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg">
            <List className="h-5 w-5 text-white" />
          </div>
          Recent URLs
        </h2>
        <p className="text-indigo-200 text-sm mt-1">Track your shortened links and performance</p>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-indigo-200 text-sm border-b border-white/10 backdrop-blur-sm">
              <th className="px-6 py-4 font-bold text-indigo-300">Short Code</th>
              <th className="px-6 py-4 font-bold text-indigo-300 hidden lg:table-cell">Original URL</th>
              <th className="px-6 py-4 font-bold text-indigo-300 hidden sm:table-cell">Date Created</th>
              <th className="px-6 py-4 font-bold text-indigo-300">Clicks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {urls.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl">🔗</span>
                    <p className="text-indigo-200 font-medium">No URLs shortened yet</p>
                    <p className="text-indigo-300/60 text-sm">Create one above to get started!</p>
                  </div>
                </td>
              </tr>
            ) : (
              urls.map((url) => (
                <tr key={url.id} className="hover:bg-white/10 transition-all duration-200 group border-b border-white/5 last:border-b-0">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-indigo-300 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-3 py-1.5 rounded-lg text-sm border border-indigo-400/30 hover:border-indigo-400/60 transition-all cursor-pointer group-hover:scale-105 transform backdrop-blur-sm">
                        {url.shortCode}
                      </span>
                      <a href={`http://localhost:3000/${url.shortCode}`} target="_blank" rel="noopener noreferrer" className="text-indigo-300/50 group-hover:text-indigo-300 transition-all duration-200 transform group-hover:scale-110">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell max-w-[200px] truncate text-indigo-100/70 text-sm font-medium hover:text-indigo-100 transition-colors">
                    {url.originalUrl}
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell text-indigo-200/60 text-sm font-medium">
                    {new Date(url.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-bold text-indigo-100 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 w-fit px-3 py-1.5 rounded-lg text-sm border border-indigo-400/30 group-hover:border-indigo-400/60 transition-all backdrop-blur-sm">
                      <MousePointerClick className="h-4 w-4 text-indigo-300/70 group-hover:text-indigo-300 transition-colors" />
                      {url.clicks}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UrlTable;
