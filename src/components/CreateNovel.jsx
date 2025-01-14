import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

function CreateNovel() {
  const [title, setTitle] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
      const [coverUrl, setCoverUrl] = useState('');
        const [story, setStory] = useState('');
          const [authorName, setAuthorName] = useState('');
            const navigate = useNavigate();

              const genres = [
                  'Fantasy', 'Horror', 'Mystery', 'Adventure', 'Romance', 'Sci-Fi',
                      'Urban', 'Action', 'War', 'Realistic', 'History', 'ACG',
                          'Games', 'LGBT+', 'Teen', 'Devotional', 'Poetry', 'General',
                              'Chereads'
                                ];

                                  const handleGenreChange = (genre) => {
                                      if (selectedGenres.includes(genre)) {
                                            setSelectedGenres(selectedGenres.filter(g => g !== genre));
                                                } else if (selectedGenres.length < 3) {
                                                      setSelectedGenres([...selectedGenres, genre]);
                                                          }
                                                            };

                                                              const handleSubmit = async (e) => {
                                                                  e.preventDefault();

                                                                      try {
                                                                            const novelData = {
                                                                                    title,
                                                                                            genres: selectedGenres,
                                                                                                    coverUrl,
                                                                                                            story,
                                                                                                                    authorName: authorName || auth.currentUser.displayName || 'Anonymous',
                                                                                                                            uploadBy: auth.currentUser.uid,
                                                                                                                                    views: 0,
                                                                                                                                            createdAt: new Date().toISOString(),
                                                                                                                                                    updatedAt: new Date().toISOString()
                                                                                                                                                          };

                                                                                                                                                                const docRef = await addDoc(collection(db, 'Novels'), novelData);
                                                                                                                                                                      navigate(`/novel/${docRef.id}`);
                                                                                                                                                                          } catch (error) {
                                                                                                                                                                                console.error('Error creating novel:', error);
                                                                                                                                                                                    }
                                                                                                                                                                                      };

                                                                                                                                                                                        return (
                                                                                                                                                                                            <div className="form-container">
                                                                                                                                                                                                  <h2 className="form-title">Create New Novel</h2>
                                                                                                                                                                                                        <form onSubmit={handleSubmit} className="novel-form">
                                                                                                                                                                                                                <label htmlFor="title">Title:</label>
                                                                                                                                                                                                                        <input
                                                                                                                                                                                                                                  type="text"
                                                                                                                                                                                                                                            value={title}
                                                                                                                                                                                                                                                      onChange={(e) => setTitle(e.target.value)}
                                                                                                                                                                                                                                                                required
                                                                                                                                                                                                                                                                        />

                                                                                                                                                                                                                                                                                <label htmlFor="authorName">Author Name:</label>
                                                                                                                                                                                                                                                                                        <input
                                                                                                                                                                                                                                                                                                  type="text"
                                                                                                                                                                                                                                                                                                            value={authorName}
                                                                                                                                                                                                                                                                                                                      onChange={(e) => setAuthorName(e.target.value)}
                                                                                                                                                                                                                                                                                                                                placeholder="Leave blank to use display name"
                                                                                                                                                                                                                                                                                                                                        />

                                                                                                                                                                                                                                                                                                                                                <label htmlFor="genres">Genres (select up to 3):</label>
                                                                                                                                                                                                                                                                                                                                                        <div className="genre-selector">
                                                                                                                                                                                                                                                                                                                                                                  {genres.map((genre) => (
                                                                                                                                                                                                                                                                                                                                                                              <label key={genre}>
                                                                                                                                                                                                                                                                                                                                                                                            <input
                                                                                                                                                                                                                                                                                                                                                                                                            type="checkbox"
                                                                                                                                                                                                                                                                                                                                                                                                                            checked={selectedGenres.includes(genre)}
                                                                                                                                                                                                                                                                                                                                                                                                                                            onChange={() => handleGenreChange(genre)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                            disabled={selectedGenres.length >= 3 && !selectedGenres.includes(genre)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        {genre}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </label>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ))}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              <label htmlFor="coverUrl">Cover Image URL:</label>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <input
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                type="url"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          value={coverUrl}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    onChange={(e) => setCoverUrl(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            />

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <label htmlFor="story">Story Description:</label>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <textarea
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      value={story}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                onChange={(e) => setStory(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          required
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  />

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <button type="submit">Create Novel</button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </form>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      export default CreateNovel;