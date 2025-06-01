import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css';

const MovieDetails = ({ movies }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === parseInt(id));

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!movie) {
    return (
      <div className="movie-details-error">
        <h2>Movie not found</h2>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Home
        </button>
      </div>
    );
  }

  // Function to handle both relative and absolute poster paths
  const getPosterUrl = (posterPath) => {
    if (posterPath.startsWith('http')) {
      return posterPath;
    }
    // If it's a relative path, make it relative to the public folder
    return process.env.PUBLIC_URL + posterPath;
  };

  return (
    <div className="movie-details">
      <div 
        className="movie-details-backdrop" 
        style={{ 
          backgroundImage: `url(${getPosterUrl(movie.poster)})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }}
      >
        <div className="backdrop-overlay"></div>
      </div>
      
      <div className="movie-details-content">
        <div className="movie-poster-container">
          <img src={getPosterUrl(movie.poster)} alt={movie.title} className="movie-poster" />
        </div>
        
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <div className="movie-meta">
            <span className="release-date">{movie.release_date}</span>
            {movie.rating && (
              <span className="rating">
                ⭐ {movie.rating}
              </span>
            )}
          </div>
          
          <p className="overview">{movie.overview || 'No overview available.'}</p>
          
          <div className="movie-actions">
            <button onClick={() => window.open(movie.video, '_blank')} className="watch-button">
              Watch Now
            </button>
            <button onClick={() => navigate('/')} className="back-button">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

MovieDetails.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
      video: PropTypes.string.isRequired,
      release_date: PropTypes.string,
      rating: PropTypes.number,
      overview: PropTypes.string,
    })
  ).isRequired,
};

export default MovieDetails; 