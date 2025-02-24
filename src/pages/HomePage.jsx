import HeroSection from "../components/homepage/HeroSection";
import { Footer, NavBar } from "../components/NavBar";

import { useEffect, useState } from "react";
import axios from "axios";
import TrendingSection from "../components/homepage/TrendingSection";
import MoreLikeThisSection from "../components/homepage/MoreLikeThisSection";
import SearchMovie from "../components/SearchMovie";

function HomePage() {
  // Movie data
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // Cart
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

  // Toggle cart
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  // Add item to cart
  const addToCart = (movie) => {
    setCartItems((prevCart) => {
      const updatedCart = [...prevCart, movie];
      return updatedCart;
    });

    setIsCartOpen(true);
  };

  // Remove item from cart
  const removeFromCart = (movieId) => {
    setCartItems((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== movieId);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

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

  console.log("searchResults:", searchResults);
  console.log("cartItems", cartItems);

  return (
    <div className="flex min-h-screen flex-col bg-[#030712]">
      <NavBar
        onSearch={setSearchResults}
        toggleCart={toggleCart}
        isCartOpen={isCartOpen}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />

      {searchResults.length > 0 ? (
        <div className="pt-12">
          <SearchMovie movies={searchResults} addToCart={addToCart} />
        </div>
      ) : (
        <>
          <HeroSection movies={movies} />
          <TrendingSection movies={movies} />
          <MoreLikeThisSection movies={movies} addToCart={addToCart} />
        </>
      )}

      <Footer />
    </div>
  );
}

export default HomePage;
