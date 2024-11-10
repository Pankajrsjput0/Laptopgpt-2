import React from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { auth } from '../firebase'; 
import { signOut } from 'firebase/auth'; 

export default function Navbar({ user, setSearchTerm }) { 
  const navigate = useNavigate(); 

  const handleLogout = async () => { 
    try { 
      await signOut(auth); 
      navigate('/'); 
    } catch (error) { 
      console.error('Error signing out:', error); 
    } 
  }; 

  return ( 
    <nav> 
      <Link to="/"> 
        <img 
          src="https://images.app.goo.gl/CP3wSZ5V3VVbC1ZYA" 
          alt="Logo" 
          className="logo" 
        /> 
      </Link> 
      <ul> 
        <li><Link to="/">Home</Link></li> 
        <li><Link to="/genres">Genres</Link></li> 
        <li><Link to="/about">About</Link></li> 
        {user ? ( 
          <> 
            <li><Link to="/profile">Profile</Link></li> 
            <li><Link to="/my-novels">My Novels</Link></li> 
            <li><Link to="/create-novel">Create Novel</Link></li> 
            <li><button onClick={handleLogout}>Logout</button></li> 
          </> 
        ) : ( 
          <li><Link to="/auth">Login</Link></li> 
        )} 
      </ul> 
      <input 
        type="text" 
        placeholder="Search novels..." 
        onChange={(e) => setSearchTerm(e.target.value)} 
      /> 
    </nav> 
  ); 
}