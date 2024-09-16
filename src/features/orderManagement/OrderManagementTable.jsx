// Third library imports
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Proptypes from "prop-types";

// Hooks
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";

// Our own components or functions
import ExpandedTable from "./ExpandedTable";
import CustomPagination from "../products/CustomPagination";
import { arrayOfPerPage } from "../../utils/handler";

// Styles
import {
  tableContainerStyle,
  tableRowStyles,
} from "../../styles/orderManagement";

OrderManagementTable.propTypes = {
  orders: Proptypes.array,
};

function OrderManagementTable({ orders }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const currentLanguage = i18n.language;

  const tableHeads = [
    t("OrderID"),
    t("Created"),
    t("Customer"),
    t("Total"),
    t("Status"),
  ];

  const widthSetter = () => {
    if (currentLanguage === "en" || currentLanguage === "cn") return "41rem";
    if (currentLanguage === "de") return "37rem";
  };

  return (
    <>
      <TableContainer sx={tableContainerStyle(theme)}>
        <Table>
          <TableHead>
            <TableRow sx={tableRowStyles(widthSetter())}>
              {tableHeads?.map((tableHead) => (
                <TableCell
                  sx={{
                    width: "9rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  key={tableHead}
                >
                  {tableHead}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {orders?.map((order) => {
              return <ExpandedTable order={order} key={order?._id} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <div>
        <CustomPagination
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          count={orders?.length}
          rowsPerPageOptions={arrayOfPerPage(orders)}
        />
      </div>
    </>
  );
}

export default OrderManagementTable;
