import axios from "axios";
import { useEffect, useState } from "react";
import { trendingApi } from "../config/apiUrls";
import "../components/styles.css";
import SingleTrendCard from "../components/SingleTrendCard";
import { TMDBContent } from "../config/apiContentTypes";
import CustomPagination from "../components/CustomPagination";
import "./pageStyles.css";

const TrendingPage = () => {
  const [page, setPage] = useState(1);
  const [content, setcontent] = useState<TMDBContent[]>([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(trendingApi(page));
    setcontent(data.results);
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <div className="trending-page--bgcontainer">
      <span className="page-title">Trending</span>
      <ul className="trending-page--cards-list">
        {content?.map((t: TMDBContent) => (
          <SingleTrendCard key={t.id} data={t} />
        ))}
      </ul>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default TrendingPage;
