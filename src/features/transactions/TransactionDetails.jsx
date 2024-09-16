// Third party imports
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

// Hooks
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";

// Our own Styles
import {
  oneBoxStyle,
  headingStyle,
  boxContentStyle,
} from "../../styles/transactionDetailStyles";

// Default Image for tyres
import TyreDefault from "/tire_default.png";

function TransactionDetails() {
  const { state } = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const tableHeads = [
    t("Image"),
    t("Name"),
    t("Price"),
    t("Quantity"),
    t("Total"),
  ];

  return (
    <>
      <Typography
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "end",
          marginTop: "1rem",
          marginRight: "0.6rem",
        }}
      >
        <Button variant="contained" onClick={() => navigate("/transactions")}>
          {t("Transactions")}
        </Button>
      </Typography>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1.4rem",
          marginTop: "0.1rem",
          flexWrap: "wrap",
        }}
      >
        {/* /////////////////////////////////////////////////////
        ////////////// Customer-Details///////////////////
        /////////////////////////////////////////////////////*/}
        <Box component={"div"} sx={() => oneBoxStyle(theme)}>
          <Typography sx={headingStyle}>{t("CustomerDetails")}</Typography>

          <Typography
            component={"div"}
            style={boxContentStyle("2.1rem", "1rem")}
          >
            <Typography>{t("CustomerName")}</Typography>
            <Typography>:-</Typography>
            <Typography>{state?.customer?.manager_name}</Typography>
          </Typography>

          <Typography
            component={"div"}
            sx={boxContentStyle("6.7rem", "0.5rem")}
          >
            <Typography>{t("Email")}</Typography>
            <Typography>:-</Typography>
            <Typography sx={{ marginLeft: "-4.6rem" }}>
              {state?.customer?.company_email}
            </Typography>
          </Typography>

          <Typography
            component={"div"}
            sx={boxContentStyle("5.6rem", "0.5rem")}
          >
            <Typography>{t("Number")}</Typography>
            <Typography>:-</Typography>
            <Typography sx={{ marginLeft: "-3.5rem" }}>
              {state?.customer?.phone_number}
            </Typography>
          </Typography>
          <Typography
            component={"div"}
            sx={{
              marginTop: "0.5rem",
              display: "flex",
              gap: "1.6rem",
              marginBottom: "0.6rem",
            }}
          >
            <Typography>{t("ShippingAddress")}</Typography>
            <Typography>:-</Typography>
            <Typography sx={{ marginLeft: "0.4rem" }}>
              {state?.customer?.company_address}
            </Typography>
          </Typography>
        </Box>

        {/* /////////////////////////////////////////////////////
        ////////////// Transaction-Details///////////////////
        ///////////////////////////////////////////////////// */}
        <Box component={"div"} sx={() => oneBoxStyle(theme)}>
          <Typography sx={headingStyle}>{t("Transaction Details")}</Typography>

          <Typography component={"div"} sx={boxContentStyle("1.5rem", "1rem")}>
            <Typography>{t("TransactionID")}</Typography>
            <Typography>:-</Typography>
            <Typography>{state?._id}</Typography>
          </Typography>

          <Typography
            component={"div"}
            sx={boxContentStyle("1.5rem", "0.5rem")}
          >
            <Typography>{t("Date")}</Typography>
            <Typography sx={{ marginLeft: "4.2rem" }}>:-</Typography>
            <Typography>{state?.created_at?.split("T")[0]}</Typography>
          </Typography>
        </Box>

        {/* /////////////////////////////////////////////////////
        ////////////// Orderr-Details///////////////////
        /////////////////////////////////////////////////////*/}
        <Box
          component="div"
          sx={{
            width: "100%",
            marginTop: "0.8rem",
            padding: "0.5rem 1rem 2.3rem 1rem",
            borderRadius: "0.8rem",
          }}
        >
          <Typography sx={headingStyle}>{t("OrderDetails")}</Typography>

          <TableContainer sx={{ marginTop: "1rem" }}>
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeads?.map((tableHead) => (
                    <TableCell
                      sx={{ textAlign: "center", fontSize: "1rem" }}
                      key={tableHead}
                    >
                      {tableHead}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell sx={{ textAlign: "center", fontSize: "1rem" }}>
                    <img
                      width="48"
                      height="41"
                      src={
                        state?.product?.images?.length
                          ? state?.product?.images[0]
                          : TyreDefault
                      }
                      alt={t("Image")}
                    />
                    {/* {state?.product?.images} */}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: "1rem" }}>
                    {state?.product?.product_name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: "1rem" }}>
                    {state?.product?.price}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: "1rem" }}>
                    {state?.product?.quantity}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: "1rem" }}>
                    {state?.product?.price}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}

export default TransactionDetails;
