export const WideMovieCard = ({ movie }) => {
  const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  return (
    <button className="group relative flex h-[12.5rem] w-[20rem] overflow-hidden rounded-2xl text-white">
      <img
        src={`${IMAGE_BASE_URL}/w500${movie.backdrop_path}`}
        alt={movie.title}
        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />

      <div className="absolute bottom-0 z-20 w-full px-5 py-5">
        <p className="text-xl font-semibold">{movie.title}</p>
        <p className="text-xl">${movie.price}</p>
      </div>
    </button>
  );
};
