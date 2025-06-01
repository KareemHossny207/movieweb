import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MovieCard = ({ movie, className = '' }) => {
  return (
    <div className={`swipeS ${className}`}>
      <Link to={movie.video}>
        <div className='swipeSec'>
          <img src={movie.poster} alt={movie.title} />
        </div>
      </Link>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    video: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default MovieCard; 