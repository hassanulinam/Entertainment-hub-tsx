export const apiDomain = "https://api.themoviedb.org/3/";

export const trendingApi = (page?: number) =>
  `${apiDomain}/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}${
    page ? "&page=" + page : ""
  }`;
