import HeroSection from "../components/homepage/HeroSection";
import { Footer, NavBar } from "../components/NavBar";

import { useEffect, useState } from "react";
import axios from "axios";
import TrendingSection from "../components/homepage/TrendingSection";
import MoreLikeThisSection from "../components/homepage/MoreLikeThisSection";
import SearchMovie from "../components/SearchMovie";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

  // Generate a random price for each movie
  const generatePrice = (movieId) => {
    const basePrice = (movieId % 100) * 0.1 + 5;
    const decimal = ((movieId % 13) * 0.07).toFixed(2);
    return (basePrice + parseFloat(decimal)).toFixed(2);
  };

  // Fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      try {
        const { data } = await axios.get(
          `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
        );

        // Attach price to each movie
        const moviesWithPrices = data.results.map((movie) => ({
          ...movie,
          price: generatePrice(movie.id),
        }));

        setMovies(moviesWithPrices);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  console.log("movie:", movies);
  console.log("searchResults:", searchResults);

  return (
    <div className="flex min-h-screen flex-col bg-[#030712]">
      <NavBar onSearch={setSearchResults} />

      {searchResults.length > 0 ? (
        <div className="pt-12">
          <SearchMovie movies={searchResults} />
        </div>
      ) : (
        <>
          <HeroSection movies={movies} />
          <TrendingSection movies={movies} />
          <MoreLikeThisSection movies={movies} />
        </>
      )}

      <Footer />
    </div>
  );
}

export default HomePage;
