import axios from "axios";
import { useEffect, useState } from "react";
import CustomPagination from "../components/CustomPagination";
import Genres from "../components/Genres";
import SingleTrendCard from "../components/SingleTrendCard";
import { GenreType, TMDBContent } from "../config/apiContentTypes";
import { moviesApi } from "../config/apiUrls";
import useGenres from "../Hooks/useGenres";

const MoviesPage = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState<TMDBContent[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [genresList, setGenresList] = useState<GenreType[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<GenreType[]>([]);
  const genresForUrl = useGenres(selectedGenres);

  const fetchMoviesData = async () => {
    const URL = moviesApi(page, genresForUrl);
    console.log("Fetching Movies data...");
    const { data } = await axios.get(URL);
    setContent(data.results);
    setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
  };

  useEffect(() => {
    fetchMoviesData();
  }, [page, genresForUrl]);

  return (
    <div className="trending-page--bgcontainer">
      <span className="page-title">Movies</span>
      <Genres
        type="movie"
        genresList={genresList}
        setGenresList={setGenresList}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
      />
      <ul className="trending-page--cards-list">
        {content?.map((t: TMDBContent) => (
          <SingleTrendCard key={t.id} data={t} />
        ))}
      </ul>
      {totalPages > 1 && (
        <CustomPagination setPage={setPage} totalPages={totalPages} />
      )}
    </div>
  );
};

export default MoviesPage;
