export interface Movie {
  page: number;
  // id: string;
  // title: string;
  // overview: string;
  // vote_average: string;
  // poster_path: string;
  results: Results[];
}

export interface Results {
  id: string;
  title: string;
  overview: string;
  vote_average: string;
  poster_path: string;
}
