import { Chip } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import { GenreType } from "../config/apiContentTypes";
import { genresApi } from "../config/apiUrls";

type PropType = {
  type: string;
  genresList: GenreType[];
  setGenresList: React.Dispatch<React.SetStateAction<GenreType[]>>;
  selectedGenres: GenreType[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<GenreType[]>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Genres = ({
  type,
  setGenresList,
  setSelectedGenres,
  genresList,
  selectedGenres,
  setPage,
}: PropType) => {
  const handleAdd = (currGenre: GenreType) => {
    setGenresList(genresList.filter((g) => g.id !== currGenre.id));
    setSelectedGenres([...selectedGenres, currGenre]);
    setPage(1);
  };

  const handleRemove = (currGenre: GenreType) => {
    setSelectedGenres(selectedGenres.filter((g) => g.id !== currGenre.id));
    setGenresList([...genresList, currGenre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    console.log("Fetching Genres...");
    const { data } = await axios.get(genresApi(type));
    setGenresList(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenresList([]);
    };
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres.map((g) => (
        <Chip
          key={g.id}
          label={g.name}
          size="small"
          style={{ margin: 2 }}
          clickable
          onDelete={() => handleRemove(g)}
          color="primary"
        />
      ))}
      {genresList?.map((g) => (
        <Chip
          key={g.id}
          label={g.name}
          size="small"
          style={{ margin: 2 }}
          clickable
          onClick={() => handleAdd(g)}
        />
      ))}
    </div>
  );
};

export default Genres;
