import axios from 'axios';
import type { Movie } from '../types/movie';

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

interface FetchMoviesParams {
  query: string;
  page?: number;
}

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

async function fetchMovies({
  query,
  page = 1,
}: FetchMoviesParams): Promise<Movie[]> {
  const config = {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  const response = await axios.get<MoviesResponse>(BASE_URL, config);

  return response.data.results;
}

export default fetchMovies;
