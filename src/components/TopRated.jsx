import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const TopRated = ({ movies }) => {
  const topRatedMovies = [...movies].sort((a, b) => (b.rating || 0) - (a.rating || 0));

  return (
    <section className="top-rated-section" id='TopRated'>
      <h2 className="section-title">Top Rated Movies</h2>
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={{
          enabled: true,
          hideOnClick: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        loop={true}
        className="top-rated-swiper"
        breakpoints={{
          320: {
            spaceBetween: 10,
          },
          480: {
            spaceBetween: 15,
          },
          768: {
            spaceBetween: 20,
          },
          1024: {
            spaceBetween: 30,
          },
        }}
      >
        {topRatedMovies.slice(0, 5).map(movie => (
          <SwiperSlide key={movie.id}>
            <Link to={`/movie/${movie.id}`} className="movie-link">
              <div className="featured-movie-card">
                <div className="card-image">
                  <img src={movie.poster} alt={movie.title} loading="lazy" />
                </div>
                <div className="card-content">
                  <h3>{movie.title}</h3>
                  <p className="movie-overview">{movie.overview}</p>
                  <div className="card-meta">
                    <div className="movie-rating">
                      <span className="rating-star">★</span>
                      <span className="rating-number">{movie.rating.toFixed(1)}</span>
                    </div>
                    <div className="movie-date">
                      {new Date(movie.release_date).getFullYear()}
                    </div>
                  </div>
                  <button className="watch-now-btn">Watch Now</button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

TopRated.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
      overview: PropTypes.string,
      rating: PropTypes.number,
      release_date: PropTypes.string,
    })
  ).isRequired,
};

export default TopRated; 