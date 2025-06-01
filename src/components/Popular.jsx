import React, { useState, useEffect } from 'react';
import './App.css';
import MovieSlider from './MovieSlider';
import WOW from "wow.js";

const Popular = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const wow = new WOW({ live: false, screenTop: true });
        wow.init();
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch('/Movies.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }
                const data = await response.json();
                setMovies(data.results || []);
            } catch (error) {
                console.error("Can't get data", error);
                setError('Failed to load movies. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchMovies();
    }, []);

    if (error) {
        return (
            <div className="Popular" id="New">
                <h1>What's popular</h1>
                <div className="error-message">{error}</div>
            </div>
        );
    }

    const allMovies = [...movies.slice(15, 20), ...movies.slice(5, 15)];

    return (
        <div className='Popular' id='New'>
            <h1>What's popular</h1>
            <MovieSlider 
                movies={allMovies}
                isLoading={isLoading}
                slidesPerView={5}
                autoplayDelay={1000}
                reverseDirection={false}
            />
        </div>
    );
};

export default Popular; 