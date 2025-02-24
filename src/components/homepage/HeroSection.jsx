import { FaCartPlus } from "react-icons/fa6";

function HeroSection({ movies }) {
  const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
  const randomIndex = Math.floor(Math.random() * Math.min(movies.length, 20));

  return (
    <section className="relative">
      {/* Fade */}
      <div className="absolute top-0 z-10 h-full w-full bg-gradient-to-t from-[#030712]"></div>

      <img
        src={`${IMAGE_BASE_URL}/original${movies[randomIndex]?.backdrop_path}`}
        alt={movies[randomIndex]?.title}
        className="h-[40rem] w-full object-cover"
      />

      <div className="container relative mx-auto">
        <div className="absolute bottom-0 left-0 z-20 flex w-full flex-col gap-5 px-8 py-20 text-white">
          <div>
            <p className="text-lg font-semibold">Featured Movie</p>
            <p className="max-w-[50rem] text-6xl font-bold">
              {movies[randomIndex]?.title}
            </p>
          </div>

          <p className="max-w-[35rem] text-sm text-gray-200">
            {movies[randomIndex]?.overview}
          </p>

          <div className="flex items-center gap-7">
            <button className="flex items-center justify-center gap-3 rounded-lg bg-violet-600 px-5 py-3 font-medium transition-colors duration-300 hover:bg-violet-700">
              <FaCartPlus className="h-4 w-4" />
              <span>Buy Now</span>
            </button>

            <button className="text-gray-200 transition-colors duration-300 hover:text-gray-300">
              + Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
