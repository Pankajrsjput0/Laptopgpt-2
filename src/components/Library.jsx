import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import NovelCard from './NovelCard';

function Library() {
  const [savedNovels, setSavedNovels] = useState([]);
    const [readingProgress, setReadingProgress] = useState({});

      useEffect(() => {
          const fetchLibrary = async () => {
                if (auth.currentUser) {
                        const libraryQuery = query(
                                  collection(db, 'users', auth.currentUser.uid, 'library')
                                          );
                                                  const progressQuery = query(
                                                            collection(db, 'users', auth.currentUser.uid, 'readingProgress')
                                                                    );

                                                                            const [librarySnapshot, progressSnapshot] = await Promise.all([
                                                                                      getDocs(libraryQuery),
                                                                                                getDocs(progressQuery)
                                                                                                        ]);

                                                                                                                const novels = [];
                                                                                                                        const progress = {};

                                                                                                                                for (const doc of librarySnapshot.docs) {
                                                                                                                                          const novel = await getDoc(doc(db, 'Novels', doc.data().novelId));
                                                                                                                                                    if (novel.exists()) {
                                                                                                                                                                novels.push({ id: novel.id, ...novel.data() });
                                                                                                                                                                          }
                                                                                                                                                                                  }

                                                                                                                                                                                          progressSnapshot.forEach(doc => {
                                                                                                                                                                                                    progress[doc.data().novelId] = {
                                                                                                                                                                                                                lastReadChapter: doc.data().lastReadChapter,
                                                                                                                                                                                                                            lastReadAt: doc.data().lastReadAt
                                                                                                                                                                                                                                      };
                                                                                                                                                                                                                                              });

                                                                                                                                                                                                                                                      setSavedNovels(novels);
                                                                                                                                                                                                                                                              setReadingProgress(progress);
                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                        };

                                                                                                                                                                                                                                                                            fetchLibrary();
                                                                                                                                                                                                                                                                              }, []);

                                                                                                                                                                                                                                                                                return (
                                                                                                                                                                                                                                                                                    <div className="library-container">
                                                                                                                                                                                                                                                                                          <h1 className="page-title">My Library</h1>
                                                                                                                                                                                                                                                                                                <div className="novel-grid">
                                                                                                                                                                                                                                                                                                        {savedNovels.map(novel => (
                                                                                                                                                                                                                                                                                                                  <div key={novel.id} className="novel-card">
                                                                                                                                                                                                                                                                                                                              <NovelCard
                                                                                                                                                                                                                                                                                                                                            novel={novel}
                                                                                                                                                                                                                                                                                                                                                          progress={readingProgress[novel.id]}
                                                                                                                                                                                                                                                                                                                                                                      />
                                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                                        ))}
                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                                    export default Library;