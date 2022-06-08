import Pagination from "@material-ui/lab/Pagination";

type PropType = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function CustomPagination({ setPage }: PropType) {
  const handlePageChange = (page: number) => {
    setPage(Number(page));
    window.scroll(0, 0);
  };

  return (
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
        count={10}
        shape="rounded"
        color="primary"
      />
    </div>
  );
}
