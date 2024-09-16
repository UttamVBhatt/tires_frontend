import { TablePagination } from "@mui/material";
import Proptypes from "prop-types";

CustomPagination.propTypes = {
  count: Proptypes.number,
  page: Proptypes.number,
  rowsPerPage: Proptypes.number,
  rowsPerPageOptions: Proptypes.number,
  setPage: Proptypes.func,
  setRowsPerPage: Proptypes.func,
};

function CustomPagination({
  count,
  page,
  rowsPerPage,
  rowsPerPageOptions,
  setPage,
  setRowsPerPage,
}) {
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
    />
  );
}

export default CustomPagination;
