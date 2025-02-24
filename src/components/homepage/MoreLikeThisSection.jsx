import { TallMovieCard } from "../movie-card/TallMovieCard";

function MoreLikeThisSection({ movies, addToCart }) {
  return (
    <section className="container mx-auto flex flex-col gap-4 px-8 pb-20 text-white">
      <p className="text-3xl font-semibold">More Like This</p>

      <div className="grid auto-rows-auto grid-cols-3 gap-8 lg:grid-cols-4 xl:grid-cols-5">
        {movies.slice(5, 15).map((movie) => (
          <TallMovieCard key={movie.id} movie={movie} addToCart={addToCart} />
        ))}
      </div>
    </section>
  );
}

export default MoreLikeThisSection;
