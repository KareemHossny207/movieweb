import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Latest = ({ movies }) => {
  const latestMovies = [...movies]
    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
    .slice(0, 5);

  return (
    <section className="movies-section" id='Latest'>
      <h2 className="section-title">Latest Movies</h2>
      <div className="movies-grid">
        {latestMovies.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-link">
            <div className="movie-card">
              <img src={movie.poster} alt={movie.title} className="movie-poster" />
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <div className="movie-date">{movie.release_date}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

Latest.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Latest; 