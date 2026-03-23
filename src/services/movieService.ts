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
  page,
}: FetchMoviesParams): Promise<MoviesResponse> {
  const { data } = await axios.get<MoviesResponse>(BASE_URL, {
    params: { query, page },
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  console.log(data.results);
  return data;
}

export default fetchMovies;
