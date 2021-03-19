export interface MovieDetails {
  genres: Genre[];
  id: string;
  title: string;
  overview: string;
  vote_average: string;
  poster_path: string;
  release_date: string;
  runtime: string;
}

export interface Genre {
  id: string;
  name: string;
}
