import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';
import 'swiper/css';
import 'swiper/css/pagination';

const MovieSlider = ({ 
  movies, 
  isLoading, 
  slidesPerView = 5,
  autoplayDelay = 1000,
  reverseDirection = true,
  className = ''
}) => {
  const breakpoints = {
    320: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 15
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: slidesPerView,
      spaceBetween: 25
    }
  };

  return (
    <Swiper
      breakpoints={breakpoints}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: autoplayDelay,
        disableOnInteraction: true,
        reverseDirection: reverseDirection,
        stopOnLastSlide: false,
        pauseOnMouseEnter: true,
      }}
      modules={[Autoplay]}
      className={`mySwiper ${className}`}
    >
      {isLoading ? (
        // Loading skeletons
        [...Array(5)].map((_, index) => (
          <SwiperSlide key={`skeleton-${index}`}>
            <div className='swipeS'>
              <div className='swipeSec'>
                <div className="movie-card-skeleton skeleton"></div>
              </div>
            </div>
          </SwiperSlide>
        ))
      ) : (
        // Actual movie data
        movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
};

MovieSlider.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
      video: PropTypes.string.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  slidesPerView: PropTypes.number,
  autoplayDelay: PropTypes.number,
  reverseDirection: PropTypes.bool,
  className: PropTypes.string,
};

export default MovieSlider; 