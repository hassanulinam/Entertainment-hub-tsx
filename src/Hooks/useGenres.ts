import { GenreType } from "../config/apiContentTypes";

const useGenres = (selectedGenres: GenreType[]) => {
  const genreIds = selectedGenres.map((g) => g.id);
  return genreIds.join(",");
};

export default useGenres;
