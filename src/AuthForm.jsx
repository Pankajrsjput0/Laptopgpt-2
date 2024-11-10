import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [genres, setGenres] = useState([]);
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const db = getFirestore();

  const handleGenreChange = (genre) => {
    if (genres.includes(genre)) {
      setGenres(genres.filter(g => g !== genre));
    } else if (genres.length < 3) {
      setGenres([...genres, genre]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          username,
          email,
          age: parseInt(age),
          interestedGenres: genres
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/');
    } catch (error) {
      setError(error.message);
      console.error("Error during authentication:", error);
    }
  };

  return (
    <div className="auth-form">
      <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <div className="genre-selection">
              <p>Select up to 3 favorite genres:</p>
              {['Fantasy', 'Horror', 'Mystery', 'Adventure', 'Romance', 'Sci-Fi'].map((genre) => (
                <label key={genre}>
                  <input
                    type="checkbox"
                    checked={genres.includes(genre)}
                    onChange={() => handleGenreChange(genre)}
                    disabled={!genres.includes(genre) && genres.length >= 3}
                  />
                  {genre}
                </label>
              ))}
            </div>
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</button>
      </form>
      <button 
        className="toggle-auth"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
}

export default AuthForm;