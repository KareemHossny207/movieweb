import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilm, faStar, faCode } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="foot">
      <div className="footContainer">
        <h1>MovieWeb</h1>
        {/* <ul>
          <li><HashLink smooth to="/#"><FontAwesomeIcon icon={faHome} /> Home</HashLink></li>
          <li><HashLink smooth to="/#Latest"><FontAwesomeIcon icon={faFilm} /> Latest Movies</HashLink></li>
          <li><HashLink smooth to="/#TopRated"><FontAwesomeIcon icon={faStar} /> Top Movies</HashLink></li>
          <li><a href="https://github.com/KareemHossny" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faCode} /> GitHub
          </a></li>
        </ul> */}
        <div className="social-links">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://github.com/KareemHossny" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
        <p className="copyright">© {new Date().getFullYear()} MovieWeb. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 