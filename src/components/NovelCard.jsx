import React from 'react';
import { Link } from 'react-router-dom';

function NovelCard({ novel, progress }) {
  const generateCoverStyle = () => {
    const colors = [
      'bg-gradient-to-br from-blue-500 to-purple-600',
      'bg-gradient-to-br from-green-500 to-teal-600',
      'bg-gradient-to-br from-red-500 to-pink-600',
      'bg-gradient-to-br from-yellow-500 to-orange-600',
      'bg-gradient-to-br from-indigo-500 to-blue-600'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const DefaultCover = () => (
    <div className={`relative w-full h-[480px] rounded-lg ${generateCoverStyle()} p-6 flex flex-col justify-between`}>
      <div className="border-2 border-white/20 absolute inset-3 rounded-lg"></div>
      <div className="text-white text-center z-10">
        <h3 className="text-2xl font-bold mb-2">{novel.title}</h3>
        <p className="text-lg">By {novel.authorName}</p>
      </div>
      <div className="text-white/70 text-center italic z-10">
        Mantra Novels
      </div>
    </div>
  );

  return (
    <div className="novel-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/novel/${novel.id}`} className="block">
        {novel.coverUrl ? (
          <img 
            src={novel.coverUrl} 
            alt={novel.title} 
            className="w-full h-[480px] object-cover"
          />
        ) : (
          <DefaultCover />
        )}
      </Link>
      
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{novel.title}</h3>
        <p className="text-gray-600 mb-2">By {novel.authorName}</p>
        {novel.genres && (
          <div className="flex flex-wrap gap-2 mb-2">
            {novel.genres.map((genre, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-100 text-sm rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
        {progress && (
          <div className="mt-2 text-sm text-gray-500">
            Last read: Chapter {progress.lastReadChapter}
            <br />
            Last read: {new Date(progress.lastReadAt).toLocaleDateString()}
          </div>
        )}
        {novel.Views && (
          <div className="mt-2 text-sm text-gray-500">
            {novel.Views.toLocaleString()} views
          </div>
        )}
      </div>
    </div>
  );
}

export default NovelCard;