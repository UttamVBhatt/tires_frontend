// Third party imports
import {
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Proptypes from "prop-types";

// Hooks
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";

// Our own component or functions
import ArrowButtonComponent from "./ArrowButtonComponent";

// Styles
import {
  tableCellStyle,
  tableStyles,
  tableRowStyles,
} from "../../styles/orderManagement";

// Default Image
import TyreDefaultImage from "/tire_default.png";

ExpandedTable.propTypes = {
  order: Proptypes.object,
};

function ExpandedTable({ order }) {
  const { _id, created_at, customer_name, product, status } = order;
  const { image, product_name, brand, profile, quantity, price } = product;

  const [isShow, setIsShow] = useState(false);

  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;

  const tableHeads = [
    t("Image"),
    t("Name"),
    t("Brand"),
    t("Profile"),
    t("Quantity"),
    t("Total"),
  ];

  const widthSetter = (status) => {
    // For English language with all status
    if (currentLanguage === "en" && status === "pending") return "58rem";
    if (currentLanguage === "en" && status === "cancelled") return "46.4rem";
    if (currentLanguage === "en" && status === "confirmed") return "56.2rem";
    if (currentLanguage === "en" && status === "shipped") return "57.7rem";
    if (currentLanguage === "en" && status === "delivered") return "52.3rem";

    // For german language with all status
    if (currentLanguage === "de" && status === "pending") return "58rem";
    if (currentLanguage === "de" && status === "confirmed") return "57rem";
    if (currentLanguage === "de" && status === "shipped") return "55.6rem";
    if (currentLanguage === "de" && status === "delivered") return "50rem";
    if (currentLanguage === "de" && status === "cancelled") return "42.5rem";

    // For chinese language with all status
    if (currentLanguage === "cn" && status === "pending") return "54.9rem";
    if (currentLanguage === "cn" && status === "confirmed") return "55rem";
    if (currentLanguage === "cn" && status === "shipped") return "55rem";
    if (currentLanguage === "cn" && status === "delivered") return "50.4rem";
    if (currentLanguage === "cn" && status === "cancelled") return "46.3rem";
  };

  return (
    <>
      <TableRow sx={tableRowStyles(widthSetter(status))}>
        <TableCell sx={tableCellStyle}>{_id?.slice(0, 5)}</TableCell>
        <TableCell sx={tableCellStyle}>{created_at?.split("T")[0]}</TableCell>
        <TableCell sx={tableCellStyle}>{customer_name}</TableCell>
        <TableCell sx={tableCellStyle}>{product.price}</TableCell>
        <TableCell
          sx={
            status === "pending"
              ? tableCellStyle("gray")
              : status === "confirmed"
              ? tableCellStyle("green")
              : status === "shipped"
              ? tableCellStyle("orange")
              : status === "delivered"
              ? tableCellStyle("blueviolet")
              : status === "cancelled"
              ? tableCellStyle("red")
              : tableCellStyle
          }
        >
          {t(`${status}`)}
        </TableCell>

        <ArrowButtonComponent
          isShow={isShow}
          setIsShow={setIsShow}
          order={order}
          status={status}
          currentOrder={order}
        />
      </TableRow>

      <TableRow
        sx={
          !isShow
            ? { display: "none" }
            : { display: "inline-block", marginLeft: "3rem", border: "none" }
        }
      >
        <TableCell>
          <Collapse in={isShow} timeout={"auto"} unmountOnExit>
            <Table sx={tableStyles(theme)}>
              <TableHead>
                <TableRow sx={tableRowStyles("54rem")}>
                  {tableHeads?.map((tableHead) => (
                    <TableCell
                      sx={{ ...tableCellStyle, width: "14rem" }}
                      key={tableHead}
                    >
                      {tableHead}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow
                  sx={{
                    ...tableRowStyles("54rem") /*paddingBottom: "1rem" */,
                  }}
                >
                  <TableCell
                    sx={{ ...tableCellStyle, width: "14rem", border: "none" }}
                  >
                    <img
                      src={image ? image : TyreDefaultImage}
                      alt="Product Image"
                      width={41}
                      height={38}
                      style={{ borderRadius: "5px" }}
                    />
                  </TableCell>
                  <TableCell sx={{ ...tableCellStyle, width: "14.8rem" }}>
                    {product_name}
                  </TableCell>
                  <TableCell
                    sx={{ ...tableCellStyle, width: "14rem", border: "none" }}
                  >
                    {brand}
                  </TableCell>
                  <TableCell
                    sx={{ ...tableCellStyle, width: "14rem", border: "none" }}
                  >
                    {profile}
                  </TableCell>
                  <TableCell
                    sx={{ ...tableCellStyle, width: "14rem", border: "none" }}
                  >
                    {quantity}
                  </TableCell>
                  <TableCell
                    sx={{ ...tableCellStyle, width: "14rem", border: "none" }}
                  >
                    {price}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default ExpandedTable;
