import { TallMovieCard } from "./movie-card/TallMovieCard";

function SearchMovie({ movies }) {
  // Filter out movie that has no poster image
  const filteredMovies = movies.filter((movie) => movie.poster_path);

  return (
    <section className="container mx-auto flex flex-col gap-4 px-8 pb-20 text-white">
      <p className="text-3xl font-semibold">Search Results</p>

      <div className="grid auto-rows-auto grid-cols-3 gap-8 lg:grid-cols-4 xl:grid-cols-5">
        {filteredMovies.map((movie) => (
          <TallMovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default SearchMovie;
