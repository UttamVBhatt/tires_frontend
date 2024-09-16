// Material UI Imports
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

// Icons
import VisibilityIcon from "@mui/icons-material/Visibility";

// Hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";

// Our own components or data or functions
import Actions from "../features/products/Actions";
import CustomPagination from "../features/products/CustomPagination";
import { dummyCustomers } from "../data/customers";
import { arrayOfPerPage } from "../utils/handler";
import { tableContainerStyle } from "../styles/TableStyle";
import DeleteModal from "../ui/DeleteModal";

function Customers() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();

  // We'll have to add the logic of update and delete customer

  const tableHeads = [
    t("Director"),
    t("Company"),
    t("Reg Number"),
    t("Status"),
    t("Last Login"),
    t("Login Duration"),
    t("Created"),
    t("Action"),
  ];

  return (
    <>
      <TableContainer sx={() => tableContainerStyle(theme)}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeads?.map((tableHead) => (
                <TableCell key={tableHead}>{tableHead}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {dummyCustomers
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((customer) => {
                const {
                  company,
                  created,
                  director,
                  // isonline,
                  loginduration,
                  lastlogin,
                  reg_number,
                  status,
                } = customer;

                return (
                  <TableRow key={company}>
                    <TableCell>
                      <Typography>{director}</Typography>
                    </TableCell>
                    <TableCell>{company}</TableCell>
                    <TableCell>{reg_number}</TableCell>
                    <TableCell
                      sx={
                        status === "Active"
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    >
                      {t(`${status}`)}
                    </TableCell>
                    <TableCell>{lastlogin}</TableCell>
                    <TableCell>{loginduration}</TableCell>
                    <TableCell>{created}</TableCell>

                    {/* Later we'll navigate to the activities by passing some user data such as id or user object, as we'll shwo that particular user's activities and also we'll add logic to actually delete a user*/}
                    <Actions
                      onClickDelete={() => setOpen(true)}
                      styleOptions={{ height: "6rem" }}
                      EyeIcon={
                        <VisibilityIcon
                          onClick={() => navigate("/activities")}
                          sx={{ cursor: "pointer" }}
                        />
                      }
                    />
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box component={"div"} sx={{ marginTop: "-1rem" }}>
        <CustomPagination
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          count={dummyCustomers?.length}
          rowsPerPageOptions={arrayOfPerPage(dummyCustomers)}
        />
      </Box>

      <DeleteModal open={open} onOpen={setOpen} />
    </>
  );
}

export default Customers;
