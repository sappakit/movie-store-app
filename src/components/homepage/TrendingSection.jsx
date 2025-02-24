import { WideMovieCard } from "../movie-card/WideMovieCard";

function TrendingSection({ movies }) {
  return (
    <section className="container mx-auto flex flex-col gap-4 px-8 py-20 text-white">
      <p className="text-3xl font-semibold">Trending Now</p>

      <div className="grid auto-rows-auto grid-cols-5 gap-4">
        {movies.slice(0, 5).map((movie) => (
          <WideMovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default TrendingSection;
