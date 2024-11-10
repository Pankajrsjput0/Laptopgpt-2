 import React, { useState } from 'react';
import { getFirestore, doc, updateDoc, arrayUnion } from 'firebase/firestore';

function UploadChapter({ novelId }) {
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterContent, setChapterContent] = useState('');
  const [chapterNumber, setChapterNumber] = useState(1);

  const db = getFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novelRef = doc(db, 'Novels', novelId);

    // Update the "Chapters" subcollection
    await updateDoc(novelRef, {
      Chapters: arrayUnion({
        chapterTitle,
        chapterContent,
        chapterNumber,
        uploadDate: new Date().toISOString(),
      }),
    });

    // Clear inputs and increment chapter number for the next entry
    setChapterTitle('');
    setChapterContent('');
    setChapterNumber((prev) => prev + 1);
  };

  return (
    <div>
      <h3>Upload New Chapter</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Chapter Title"
          value={chapterTitle}
          onChange={(e) => setChapterTitle(e.target.value)}
        />
        <textarea
          placeholder="Chapter Content"
          value={chapterContent}
          onChange={(e) => setChapterContent(e.target.value)}
        />
        <button type="submit">Upload Chapter</button>
      </form>
    </div>
  );
}

export default UploadChapter;