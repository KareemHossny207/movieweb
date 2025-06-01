import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AllMovies = ({ movies }) => {
  return (
    <section className="movies-section" id='AllMovies'>
      <h2 className="section-title">All Movies</h2>
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
    </section>
  );
};

AllMovies.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
      rating: PropTypes.number,
    })
  ).isRequired,
};

export default AllMovies; 