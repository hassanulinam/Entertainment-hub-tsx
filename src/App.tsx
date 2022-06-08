import { Container, createTheme, ThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routeConstants } from "./config/AppConstants";
import BottomNavbar from "./components/BottomNavbar";
import Header from "./components/Header";
import MoviesPage from "./pages/MoviesPage";
import SearchPage from "./pages/SearchPage";
import TrendingPage from "./pages/TrendingPage";
import TvseriesPage from "./pages/TvseriesPage";
import "./App.css";

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Header />
        <div className="app-body">
          <Container>
            <Routes>
              <Route
                path={routeConstants.trending}
                element={<TrendingPage />}
              />
              <Route path={routeConstants.movies} element={<MoviesPage />} />
              <Route
                path={routeConstants.tvseries}
                element={<TvseriesPage />}
              />
              <Route path={routeConstants.search} element={<SearchPage />} />
            </Routes>
          </Container>
        </div>
        <BottomNavbar />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
