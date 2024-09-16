import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  tableCellStyle,
  tableRowStyle,
  tableStyle,
} from "../../styles/TableStyle";
import Proptypes, { object } from "prop-types";

// Hooks
import { useTranslation } from "react-i18next";

// Our own Components
import Actions from "../products/Actions";

// User's Default Image
import UserDefault from "/user_default.png";

AdminTable.propTypes = {
  admins: Proptypes.arrayOf(object),
  page: Proptypes.number,
  rowsPerPage: Proptypes.number,
  setDeleteOpen: Proptypes.func,
  setAdmin: Proptypes.func,
  setAddEditOpen: Proptypes.func,
  setId: Proptypes.func,
};

const userRoleStyle = {
  borderRadius: "1rem",
  padding: "0.6rem 0.8rem",
  fontSize: "0.8rem",
  color: "black",
  fontWeight: "500",
};

function AdminTable({
  admins,
  page,
  rowsPerPage,
  setDeleteOpen,
  setAdmin,
  setAddEditOpen,
  setId,
}) {
  const { t } = useTranslation();

  const tableHeads = [
    t("Image"),
    t("Name"),
    t("Role"),
    t("Status"),
    t("Action"),
  ];

  return (
    <TableContainer sx={{ marginTop: "1.2rem" }}>
      <Table sx={tableStyle}>
        <TableHead>
          <TableRow
            sx={{
              ...tableRowStyle,
              justifyContent: "space-between",
              padding: "0 1rem",
            }}
          >
            {tableHeads?.map((tableHead) => (
              <TableCell
                sx={{ ...tableCellStyle, width: "8.2rem" }}
                key={tableHead}
              >
                {tableHead}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {admins
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            ?.map((adminObj, i) => {
              const { _id, name, image, is_logged_in, role } = adminObj;

              return (
                <TableRow
                  key={i}
                  sx={{
                    ...tableRowStyle,
                    justifyContent: "space-around",
                    padding: "0 0rem",
                    gap: "2.1rem",
                  }}
                >
                  <TableCell sx={{ ...tableCellStyle, width: "8.2rem" }}>
                    <img
                      width={50}
                      height={50}
                      style={{ borderRadius: "100%" }}
                      src={image ? image : UserDefault}
                      alt="Admin Image"
                    />
                  </TableCell>
                  <TableCell sx={{ ...tableCellStyle, width: "8.2rem" }}>
                    {name}
                  </TableCell>
                  <TableCell sx={{ ...tableCellStyle, width: "8.2rem" }}>
                    <Typography
                      sx={
                        role === "super_admin"
                          ? {
                              backgroundColor: "lightyellow",
                              ...userRoleStyle,
                            }
                          : {
                              backgroundColor: "lightblue",
                              ...userRoleStyle,
                            }
                      }
                    >
                      {t(`${role}`)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ ...tableCellStyle, width: "8.2rem" }}>
                    <Typography
                      sx={
                        is_logged_in === true
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    >
                      {t(`${is_logged_in ? "Active" : "Inactive"}`)}
                    </Typography>
                  </TableCell>

                  <Actions
                    onClickEdit={() => {
                      setAdmin(() => adminObj);
                      setAddEditOpen(true);
                    }}
                    onClickDelete={() => {
                      setDeleteOpen(true);
                      setId(_id);
                    }}
                    styleOptions={{ width: "8.2rem" }}
                  />
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdminTable;
