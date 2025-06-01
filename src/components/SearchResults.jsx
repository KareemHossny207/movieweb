import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SearchResults = ({ movies }) => {
  return (
    <div className="top">
      <h2 className="section-title">Search Results</h2>
      {movies.length === 0 ? (
        <div className="no-results">
          <p>No movies found matching your search.</p>
        </div>
      ) : (
        <div className="movies-grid">
          {movies.map(movie => (
            <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-link">
              <div className="movie-card">
                <img src={movie.poster} alt={movie.title} className="movie-poster" />
                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  {movie.rating && (
                    <div className="movie-rating">⭐ {movie.rating}</div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

SearchResults.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
      rating: PropTypes.number,
    })
  ).isRequired,
};

export default SearchResults; 