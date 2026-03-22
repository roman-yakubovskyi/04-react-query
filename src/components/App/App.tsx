import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import type { Movie } from '../../types/movie';
import fetchMovies from '../../services/movieService';
import MovieGrid from '../MovieGrid/MovieGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieModal from '../MovieModal/MovieModal';
import toast from 'react-hot-toast';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setError(false);
      setLoading(true);
      setMovies([]);
      const moviesList = await fetchMovies({ query });

      if (moviesList.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }

      setMovies(moviesList);
    } catch (error) {
      setError(true);
      toast.error('Something went wrong');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const handleClose = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {loading && <Loader />}
      {error && !loading && <ErrorMessage />}
      {!error && !loading && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleClose} />
      )}
    </div>
  );
}
