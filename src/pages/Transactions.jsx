// Third part imports
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

// Hooks
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

// Our own components or functions
// import { orders } from "../data/orders";
import { tableStyle } from "../styles/TableStyle";
import CustomPagination from "../features/products/CustomPagination";
import { arrayOfPerPage } from "../utils/handler";
import { useQuery } from "@tanstack/react-query";
import { getAll } from "../services/services";

function Transactions() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const tableHeads = ["Id", t("Customer"), t("Date"), t("Total"), t("Action")];

  const { data: orders } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getAll("transactions"),
  });

  return (
    <>
      <TableContainer
        sx={{ "&::-webkit-scrollbar": { width: 0 }, marginTop: "0.5rem" }}
      >
        <Table sx={tableStyle}>
          <TableHead>
            <TableRow>
              {tableHeads?.map((tableHead) => (
                <TableCell sx={{ textAlign: "center" }} key={tableHead}>
                  {tableHead}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {orders?.docs
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((orderObj) => {
                const { _id, customer, product, created_at } = orderObj;

                return (
                  <TableRow key={_id}>
                    <TableCell sx={{ textAlign: "center" }}>{_id}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {customer?.manager_name}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {created_at?.split("T")[0]}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {product?.price}
                    </TableCell>
                    <TableCell
                      onClick={() =>
                        navigate("/transactions-details", { state: orderObj })
                      }
                      sx={{
                        color:
                          theme.palette.mode === "light"
                            ? "blue"
                            : "lightskyblue",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      {t("ViewDetails")}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ marginTop: "-1rem" }}>
        <CustomPagination
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          count={orders?.docs?.length}
          rowsPerPageOptions={arrayOfPerPage(orders?.docs)}
        />
      </div>
    </>
  );
}

export default Transactions;
