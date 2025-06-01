import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TopRated from './TopRated';
import Latest from './Latest';
import AllMovies from './AllMovies';
import LoadingSpinner from './LoadingSpinner';

const Home = ({ allMovies }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (you can remove this in production)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <TopRated movies={allMovies} />
      <Latest movies={allMovies} />
      <AllMovies movies={allMovies} />
    </div>
  );
};

Home.propTypes = {
  allMovies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
      rating: PropTypes.number,
      release_date: PropTypes.string,
      overview: PropTypes.string,
    })
  ).isRequired,
};

export default Home;