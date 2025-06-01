import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <FontAwesomeIcon icon={faFilm} className="loading-icon" />
        <span className="loading-text">Loading Movies...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner; 