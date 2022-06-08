import axios from "axios";
import { useEffect, useState } from "react";
import CustomPagination from "../components/CustomPagination";
import SingleTrendCard from "../components/SingleTrendCard";
import { TMDBContent } from "../config/apiContentTypes";
import { moviesApi } from "../config/apiUrls";

const MoviesPage = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState<TMDBContent[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchMoviesData = async () => {
    const { data } = await axios.get(moviesApi(page));
    console.log(data);
    setContent(data.results);
    setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
  };

  useEffect(() => {
    fetchMoviesData();
  }, [page]);

  return (
    <div className="trending-page--bgcontainer">
      <span className="page-title">Movies</span>
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
