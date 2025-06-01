import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavvBar from './components/NavvBar';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import SearchResults from './components/SearchResults';
import moviesData from './data/Movies.json';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    // Load movies from the JSON file
    setMovies(moviesData.movies);
  }, []);

  useEffect(() => {
    // Update dark mode in localStorage and apply to both body and root div
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    
    // Apply dark mode to body
    document.body.classList.toggle('dark-mode', isDarkMode);
    
    // Apply dark mode to root element
    document.documentElement.classList.toggle('dark-mode', isDarkMode);
    
    // Apply dark mode to app container
    const appContainer = document.getElementById('root');
    if (appContainer) {
      appContainer.classList.toggle('dark-mode', isDarkMode);
    }
  }, [isDarkMode]);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    
    const results = movies.filter(movie => 
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
          <NavvBar 
            onSearch={handleSearch} 
            isDarkMode={isDarkMode} 
            onToggleDarkMode={toggleDarkMode} 
          />
          <Routes>
            <Route path="/" element={
              searchResults.length > 0 ? (
                <SearchResults movies={searchResults} />
              ) : (
                <Home allMovies={movies} />
              )
            } />
            <Route path="/movie/:id" element={
              <PrivateRoute>
                <MovieDetails movies={movies} />
              </PrivateRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;