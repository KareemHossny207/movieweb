import React from 'react';
import { FaSpinner, FaFilm } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-icon-wrapper">
          <FaSpinner className="loading-icon" />
          <FaFilm className="movie-icon" />
        </div>
        <div className="loading-text">Loading...</div>
      </div>
    </div>
  );
};

export default Loading; 