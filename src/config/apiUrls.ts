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

export const searchApi = (type: string, query: string, page: number) =>
  `${apiDomain}/search/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`;

export const modalContentApi = (media_type: string, id: number) =>
  `${apiDomain}/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

export const videoDataApi = (media_type: string, id: number) =>
  `${apiDomain}/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
