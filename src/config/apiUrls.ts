import { GenreType } from "./apiContentTypes";

export const apiDomain = "https://api.themoviedb.org/3";

export const trendingApi = (page?: number) =>
  `${apiDomain}/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}${
    page ? "&page=" + page : ""
  }`;

export const moviesApi = (page?: number, genreForUrl?: string) =>
  `${apiDomain}/discover/movie?api_key=${
    process.env.REACT_APP_API_KEY
  }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false${
    page ? "&page=" + page : ""
  }${genreForUrl ? "&with_genres=" + genreForUrl : ""}`;

export const tvSeriesApi = (page?: number, genreForUrl?: string) =>
  `${apiDomain}/discover/tv?api_key=${
    process.env.REACT_APP_API_KEY
  }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false${
    page ? "&page=" + page : ""
  }${genreForUrl ? "&with_genres=" + genreForUrl : ""}`;

export const genresApi = (type: string) =>
  `${apiDomain}/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
