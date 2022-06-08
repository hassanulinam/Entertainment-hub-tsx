import {
  Button,
  createTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import CustomPagination from "../components/CustomPagination";
import SingleTrendCard from "../components/SingleTrendCard";
import { TMDBContent } from "../config/apiContentTypes";
import { searchApi } from "../config/apiUrls";
import "./pageStyles.css";

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#fff",
    },
  },
});

const SearchPage = () => {
  const [tabId, setTabId] = useState(0);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState<TMDBContent[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState(" ");

  const fetchSearchResults = async () => {
    const URL = searchApi(tabId ? "tv" : "movie", searchText, page);
    console.log("Fetching search results: " + URL);
    const { data } = await axios.get(URL);
    console.log(data);
    setContent(data.results);
    setTotalPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearchResults();
  }, [tabId, page]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="search-box-container">
          <TextField
            label="Search"
            style={{ flex: 1 }}
            variant="filled"
            onChange={(event: any) => setSearchText(event.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginLeft: 10 }}
            onClick={fetchSearchResults}
          >
            <Search style={{ padding: "0 16px" }} fontSize="large" />
          </Button>
        </div>
        <Tabs
          value={tabId}
          onChange={(e: any, newValue: number) => {
            setTabId(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5, width: "100" }}
          indicatorColor="primary"
          textColor="primary"
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>
      <ul className="trending-page--cards-list">
        {content?.map((t: TMDBContent) => (
          <SingleTrendCard key={t.id} data={t} />
        ))}
      </ul>
      {searchText &&
        content.length == 0 &&
        (tabId ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      {totalPages > 1 && (
        <CustomPagination setPage={setPage} totalPages={totalPages} />
      )}
    </div>
  );
};

export default SearchPage;
