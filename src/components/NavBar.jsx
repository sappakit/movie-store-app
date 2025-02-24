import axios from "axios";
import { useState } from "react";
import { AiFillInstagram } from "react-icons/ai";
import {
  FaCartShopping,
  FaFacebook,
  FaHeart,
  FaTwitter,
} from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { RiMovie2AiFill } from "react-icons/ri";

import { useNavigate } from "react-router-dom";
import MyCart from "./MyCart";

export function NavBar({
  onSearch,
  toggleCart,
  isCartOpen,
  cartItems,
  removeFromCart,
  clearCart
}) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  console.log("cartItems:", cartItems);

  // Handle search input change
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    // Generate a random price for each movie
    const generatePrice = (movieId) => {
      const basePrice = (movieId % 100) * 0.1 + 5;
      const decimal = ((movieId % 13) * 0.07).toFixed(2);
      return (basePrice + parseFloat(decimal)).toFixed(2);
    };

    if (query.length > 2) {
      // Fetch search results
      try {
        const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
        const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
        const { data } = await axios.get(`${BASE_URL}/search/movie`, {
          params: { api_key: API_KEY, query },
        });

        // Attach price to each movie
        const moviesWithPrices = data.results.map((movie) => ({
          ...movie,
          price: generatePrice(movie.id),
        }));

        onSearch(moviesWithPrices);
      } catch (error) {
        console.error(error);
      }
    } else {
      onSearch([]);
    }
  };

  return (
    <>
      <nav className="relative z-30 flex h-16 w-full items-center justify-between bg-[#030712] px-8 text-white shadow-md">
        {/* Left side */}
        <div className="flex items-center gap-12">
          {/* Website logo */}
          <button
            className="flex items-center gap-2"
            onClick={(event) => {
              event.preventDefault();
              navigate("/");
            }}
          >
            <RiMovie2AiFill className="h-7 w-7 text-violet-500" />
            <p className="text-xl font-semibold">MovieMart</p>
          </button>

          {/* Tabs */}
          <div className="flex items-center gap-6 text-sm text-white">
            <button
              className="transition-colors duration-300 hover:text-violet-500"
              onClick={(event) => {
                event.preventDefault();
                navigate("/");
              }}
            >
              Home
            </button>
            <button className="transition-colors duration-300 hover:text-violet-500">
              New Releases
            </button>
            <button className="transition-colors duration-300 hover:text-violet-500">
              Categories
            </button>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Search box */}
          <div className="flex w-[15rem] items-center gap-2 rounded-full bg-gray-800 px-4 py-2">
            <input
              type="text"
              placeholder="Search ..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-transparent text-sm text-white placeholder:text-gray-400 focus:outline-none"
            />

            <IoSearch className="text-gray-400" />
          </div>

          <button>
            <FaHeart className="h-5 w-5 text-white transition-colors duration-300 hover:text-gray-300" />
          </button>
          <button onClick={toggleCart}>
            <FaCartShopping className="h-5 w-5 text-white transition-colors duration-300 hover:text-gray-300" />
          </button>

          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800">
            <LuUserRound className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </nav>

      {/* My cart */}
      {isCartOpen && (
        <MyCart
          toggleCart={toggleCart}
          isCartOpen={isCartOpen}
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
        />
      )}
    </>
  );
}

export function Footer() {
  return (
    <div className="flex h-48 w-full flex-col items-center justify-center gap-4 bg-[#030712] text-sm text-gray-400">
      {/* Contract icon */}
      <div className="flex gap-6">
        <button className="text-white transition-colors duration-300 hover:text-gray-300">
          <FaFacebook />
        </button>
        <button className="text-white transition-colors duration-300 hover:text-gray-300">
          <AiFillInstagram className="h-[1.1rem] w-[1.1rem]" />
        </button>
        <button className="text-white transition-colors duration-300 hover:text-gray-300">
          <FaTwitter />
        </button>
      </div>

      <p>© MovieMart, LLC. All rights reserved.</p>

      <div className="flex items-center gap-3 text-xs text-gray-500">
        <button>Privacy</button>
        <button>Terms</button>
        <button>Help</button>
        <button>Devices</button>
      </div>
    </div>
  );
}
