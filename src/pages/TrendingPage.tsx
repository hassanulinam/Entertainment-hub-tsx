import axios from "axios";
import { useEffect, useState } from "react";
import { trendingApi } from "../config/apiUrls";
import "../components/styles.css";
import SingleTrendCard from "../components/SingleTrendCard";
import { TrendingContent } from "../config/apiContentTypes";
import "./pageStyles.css";

const TrendingPage = () => {
  const [content, setcontent] = useState<TrendingContent[]>([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(trendingApi);
    setcontent(data.results);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <div className="trending-page--bgcontainer">
      <span className="page-title">Trending</span>
      <ul className="trending-page--cards-list">
        {content?.map((t: TrendingContent) => (
          <SingleTrendCard key={t.id} data={t} />
        ))}
      </ul>
    </div>
  );
};

export default TrendingPage;
