import { createTheme, ThemeProvider } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

type PropType = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages?: number;
};

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#fff",
    },
  },
});

export default function CustomPagination({ setPage, totalPages }: PropType) {
  const handlePageChange = (page: number) => {
    setPage(Number(page));
    window.scroll(0, 0);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Pagination
          onChange={(e: any) => handlePageChange(e.target.textContent)}
          count={totalPages || 10}
          shape="rounded"
          variant="outlined"
          color="primary"
          hidePrevButton
          hideNextButton
        />
      </div>
    </ThemeProvider>
  );
}
