import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import { useAuth } from '../context/AuthContext';
import { HashLink } from 'react-router-hash-link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilm, faSignInAlt, faUserPlus, faSignOutAlt, faUser, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const NavvBar = ({ onSearch, isDarkMode, onToggleDarkMode }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.nav-right')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      closeMenu();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleDarkModeToggle = (e) => {
    e.preventDefault(); // Prevent default button behavior
    onToggleDarkMode(); // Call the toggle function from props
  };

  return (
    <nav className="nav">
      <div className="navContainer">
        <div className="nav-left">
          <Link 
            to="/" 
            style={{ textDecoration: 'none' }} 
            onClick={(e) => {
              e.preventDefault();
              closeMenu();
              window.location.href = '/';
            }}
          >
            <h1>MovieWeb</h1>
          </Link>
          <SearchBar onSearch={onSearch} />
        </div>
        <div className="nav-right">
          <button 
            className="dark-mode-toggle" 
            onClick={handleDarkModeToggle}
            type="button"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          </button>
          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
            type="button"
            aria-label="Toggle menu"
          >
            <span className="hamburger"></span>
          </button>
          <ul className={`navLinks ${isMenuOpen ? 'show' : ''}`}>
            <li><HashLink smooth to="/#" onClick={closeMenu}><FontAwesomeIcon icon={faHome} /> Home</HashLink></li>
            <li><HashLink smooth to="/#AllMovies" onClick={closeMenu}><FontAwesomeIcon icon={faFilm} /> Movies</HashLink></li>
            {user ? (
              <>
                <li>
                  <Link to="/" onClick={closeMenu}>
                    <FontAwesomeIcon icon={faUser} /> {user.displayName || user.email.split('@')[0]}
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="nav-button logout"
                    type="button"
                    style={{ background: 'none', border: 'none', color: 'var(--white)', cursor: 'pointer', width: '100%', textAlign: 'left', padding: '1rem' }}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" onClick={closeMenu}><FontAwesomeIcon icon={faSignInAlt} /> Login</Link></li>
                <li><Link to="/register" onClick={closeMenu}><FontAwesomeIcon icon={faUserPlus} /> Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

NavvBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  onToggleDarkMode: PropTypes.func.isRequired,
};

export default NavvBar; 