// Material UI Imports
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

// Hooks
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Our own components or functions
// import { productList } from "../data/productList";
import { arrayOfPerPage } from "../utils/handler";

// Default Image for tyres
import TyreDefault from "/tire_default.png";

import {
  tableCellStyle,
  tableRowStyle,
  tableContainerStyle,
  tableStyle,
} from "../styles/TableStyle";
import CustomPagination from "../features/products/CustomPagination";
import Actions from "../features/products/Actions";
import { deleteOne, getAll } from "../services/services";
import DeleteModal from "../ui/DeleteModal";

function ProductList() {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [id, setId] = useState(0);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const queryClient = useQueryClient();

  // const [products, setProducts] = useState(productList);
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAll("products"),
  });

  const { mutate: deleteProduct } = useMutation({
    mutationFn: () => deleteOne("products", id),
    onSuccess: queryClient.invalidateQueries(["products"]),
    onError: (err) => console.log(err),
  });

  const tableHeads = [
    t("Image"),
    t("Name"),
    t("CarBrand"),
    "Price",
    t("Brand"),
    t("DesignType"),
    t("Profile"),
    t("TT_TL"),
    t("PR"),
    t("CustomsService"),
    t("EAN"),
    t("Load per tyre"),
    t("Action"),
  ];

  return (
    <>
      <TableContainer sx={() => tableContainerStyle(theme)}>
        <Table sx={() => tableStyle(theme)}>
          <TableHead>
            <TableRow sx={{ ...tableRowStyle, marginTop: "0.5rem" }}>
              {tableHeads.map((tableData) => (
                <TableCell
                  sx={{ width: "6rem", textAlign: "center" }}
                  key={tableData}
                >
                  {tableData}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {products?.docs
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => {
                const {
                  _id,
                  product_name,
                  image,
                  brand,
                  car_brand,
                  EAN,
                  PR,
                  profile,
                  price,
                  load_per_tyre,
                  design_type,
                  tt_tl,
                  customs_service,
                } = product;

                return (
                  <TableRow sx={tableRowStyle} key={product_name}>
                    <TableCell sx={tableCellStyle}>
                      <img
                        width="48"
                        height="41"
                        src={image ? image : TyreDefault}
                        alt={t("Image")}
                      />
                    </TableCell>
                    <TableCell sx={tableCellStyle}>{product_name}</TableCell>
                    <TableCell sx={tableCellStyle}>{car_brand}</TableCell>
                    <TableCell sx={tableCellStyle}>{price}</TableCell>
                    <TableCell sx={tableCellStyle}>{brand}</TableCell>
                    <TableCell sx={tableCellStyle}>{design_type}</TableCell>
                    <TableCell sx={tableCellStyle}>{profile}</TableCell>
                    <TableCell sx={tableCellStyle}>{tt_tl}</TableCell>
                    <TableCell sx={tableCellStyle}>{PR}</TableCell>
                    <TableCell sx={tableCellStyle}>{customs_service}</TableCell>
                    <TableCell sx={tableCellStyle}>{EAN}</TableCell>
                    <TableCell sx={tableCellStyle}>{load_per_tyre}</TableCell>

                    <Actions
                      onClickDelete={() => {
                        setDeleteOpen(true);
                        setId(_id);
                      }}
                      onClickEdit={() =>
                        navigate("/add-product", { state: product })
                      }
                    />
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ margin: "-1rem 0 0.3rem 0" }}>
        <CustomPagination
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          count={products?.docs?.length}
          rowsPerPageOptions={arrayOfPerPage(products?.docs)}
        />
      </div>

      <DeleteModal
        open={deleteOpen}
        onOpen={setDeleteOpen}
        onDelete={deleteProduct}
      />
    </>
  );
}

export default ProductList;
