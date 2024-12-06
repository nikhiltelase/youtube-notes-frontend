import { useState } from 'react';
import { FaYoutube } from 'react-icons/fa';
import { validateYouTubeUrl } from '../utils/videoUtils';

export default function UrlInput({ onSubmit, isLoading }) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="flex flex-col gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaYoutube className="w-5 h-5 text-red-500" />
          </div>
          <input
            type="url"
            autoFocus
            className="block w-full p-4 pl-10 text-sm border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Paste YouTube URL here..."
            required
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError('');
            }}
          />
        </div>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          {isLoading ? 'Generating...' : 'Generate Notes'}
        </button>
      </div>
    </form>
  );
}
