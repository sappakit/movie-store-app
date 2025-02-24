import { TallMovieCard } from "../movie-card/TallMovieCard";

function MoreLikeThisSection({ movies }) {
  return (
    <section className="container mx-auto flex flex-col gap-4 px-8 pb-20 text-white">
      <p className="text-3xl font-semibold">More Like This</p>

      <div className="grid grid-cols-5 gap-4">
        {movies.slice(5, 10).map((movie) => (
          <TallMovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default MoreLikeThisSection;
