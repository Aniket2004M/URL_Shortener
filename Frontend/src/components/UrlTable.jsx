import React from 'react';
import { List, ExternalLink, MousePointerClick } from 'lucide-react';

const UrlTable = ({ urls }) => {
  return (
    <div className="bg-white p-0 rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col w-full">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <List className="h-5 w-5 text-indigo-600" />
          Recent URLs
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-sm border-b border-gray-100">
              <th className="px-6 py-3.5 font-semibold">Short Code</th>
              <th className="px-6 py-3.5 font-semibold hidden lg:table-cell">Original URL</th>
              <th className="px-6 py-3.5 font-semibold hidden sm:table-cell">Date Created</th>
              <th className="px-6 py-3.5 font-semibold">Clicks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {urls.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                  No URLs shortened yet. Create one above!
                </td>
              </tr>
            ) : (
              urls.map((url) => (
                <tr key={url.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md text-sm border border-indigo-100">
                        {url.shortCode}
                      </span>
                      <a href={`http://localhost:8080/${url.shortCode}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600 transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell max-w-[180px] truncate text-gray-600 text-sm">
                    {url.originalUrl}
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell text-gray-500 text-sm">
                    {new Date(url.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 font-medium text-gray-700 bg-gray-50 w-fit px-2.5 py-1 rounded-md text-sm">
                      <MousePointerClick className="h-3.5 w-3.5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
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
