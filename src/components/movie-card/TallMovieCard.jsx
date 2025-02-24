import { FaCartPlus, FaRegHeart } from "react-icons/fa6";

export const TallMovieCard = ({ movie, addToCart }) => {
  const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  const shortenTitle =
    movie.title.length > 25 ? movie.title.slice(0, 25) + "..." : movie.title;

  return (
    <div className="group flex max-h-[30rem] w-full flex-grow overflow-hidden text-white">
      <div className="flex w-full flex-col gap-3">
        <button className="overflow-hidden">
          <img
            src={`${IMAGE_BASE_URL}/w500${movie.poster_path}`}
            alt={movie.title}
            className="aspect-[2/3] h-full w-full rounded-2xl object-cover"
          />
        </button>

        <div className="flex w-full flex-grow flex-col justify-between text-left">
          <p className="text-left text-xl font-semibold">{shortenTitle}</p>

          <div className="flex flex-col">
            <p className="text-2xl">${movie.price}</p>

            <div className="flex items-center gap-3">
              <button className="transition-colors duration-300 hover:text-gray-200">
                <FaRegHeart className="h-5 w-5" />
              </button>

              <button
                className="flex w-full items-center justify-center gap-3 rounded-md bg-violet-600 px-2 py-2 text-xs font-medium transition-colors duration-300 hover:bg-violet-700"
                onClick={() => addToCart(movie)}
              >
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
