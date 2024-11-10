import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import NovelCard from './NovelCard';

function NovelList() {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const genres = [
    'all', 'urban', 'action', 'war', 'realistic', 'history',
    'fantasy', 'horror', 'mystery', 'adventure', 'romance', 'sci-fi',
    'acg', 'games', 'lgbt+', 'teen', 'devotional', 'poetry', 'general', 'chereads'
  ];

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        const q = query(collection(db, 'Novels'), orderBy('Views', 'desc'));
        const querySnapshot = await getDocs(q);
        const novelsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNovels(novelsData);
      } catch (error) {
        console.error('Error fetching novels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNovels();
  }, []);

  const filteredNovels = filter === 'all' 
    ? novels 
    : novels.filter(novel => novel.genres?.includes(filter));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Popular Novels</h2>
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          {genres.map(genre => (
            <option key={genre} value={genre}>
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNovels.map(novel => (
            <NovelCard key={novel.id} novel={novel} />
          ))}
        </div>
      )}
    </div>
  );
}

export default NovelList;