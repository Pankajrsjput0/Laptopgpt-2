import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';
import Navbar from './components/Navbar';
import GenreCarousel from './components/GenreCarousel';
import NovelCard from './components/NovelCard';
import AuthForm from './AuthForm';
import UploadChapter from './UploadChapter';
import CreateNovel from './components/CreateNovel';
import Rankings from './components/Rankings';
import Library from './components/Library';
import UserProfile from './components/UserProfile';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="app">
        <Navbar user={user} setSearchTerm={setSearchTerm} />
        <Routes>
          <Route path="/" element={
            <>
              <GenreCarousel />
              <Rankings />
            </>
          } />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<UserProfile />} />
          {user && (
            <>
              <Route path="/create-novel" element={<CreateNovel />} />
              <Route path="/upload-chapter/:novelId" element={<UploadChapter />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;