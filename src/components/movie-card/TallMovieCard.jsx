import { FaCartPlus, FaHeart } from "react-icons/fa6";

export const TallMovieCard = ({ movie }) => {
  const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  return (
    <div className="group flex w-full flex-grow overflow-hidden text-white">
      <div className="flex w-full flex-col gap-3">
        <div className="overflow-hidden">
          <img
            src={`${IMAGE_BASE_URL}/w500${movie.poster_path}`}
            alt={movie.title}
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>

        <div className="flex w-full flex-grow flex-col justify-between text-left">
          <p className="text-xl font-semibold">{movie.title}</p>

          <div className="flex flex-col">
            <p className="text-2xl">${movie.price}</p>

            <div className="flex items-center gap-3">
              <button className="transition-colors duration-300 hover:text-gray-200">
                <FaHeart className="h-5 w-5" />
              </button>

              <button className="flex w-full items-center justify-center gap-3 rounded-md bg-violet-600 px-2 py-2 text-xs font-medium transition-colors duration-300 hover:bg-violet-700">
                <FaCartPlus className="h-4 w-4" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
