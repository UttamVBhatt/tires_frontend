import { Box, Typography } from "@mui/material";
import TyresLogo from "/tires_logo.jpg";

import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";

import NavLink from "./NavLink";
import { mainMenu, products, admin } from "../data/sidebar";

function SideBar() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "18rem",
        height: "100vh",
        padding: "1.4rem 2.1rem 0 1rem",
        borderRight: "1px solid whitesmoke",
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(0,0,0,0.1)"
            : theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          width="50"
          height="50"
          style={{ borderRadius: "100%" }}
          src={TyresLogo}
          alt="Logo Image"
        />

        <Typography variant="h6" component="h6">
          Tires Hub
        </Typography>
      </Box>

      <Typography
        sx={{
          display: "inline-block",
          marginTop: "1.5rem",
          fontSize: "0.8rem",
        }}
        component="span"
      >
        {t("Main Menu")}
      </Typography>

      <Typography
        component="div"
        sx={{
          marginTop: "0.8rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.3rem",
        }}
      >
        {mainMenu?.map((val, i) => (
          <NavLink key={i} val={val} />
        ))}
      </Typography>

      {/* ////////////////////////////////////////////
      /// Product List
      //////////////////////////////////////////// */}

      <Typography
        sx={{
          display: "inline-block",
          marginTop: "1.8rem",
          fontSize: "0.8rem",
        }}
        component="span"
      >
        {t("Products")}
      </Typography>
      <Typography
        component="div"
        sx={{
          marginTop: "0.3rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.3rem",
        }}
      >
        {products?.map((val, i) => (
          <NavLink key={i} val={val} />
        ))}
      </Typography>

      {/* ////////////////////////////////////////////
      /// Manage Admin
      //////////////////////////////////////////// */}

      <Typography
        sx={{
          display: "inline-block",
          marginTop: "1.4rem",
          fontSize: "0.8rem",
        }}
        component="span"
      >
        {t("Admin")}
      </Typography>
      <Typography component="div">
        {admin?.map((val, i) => (
          <NavLink key={i} val={val} />
        ))}
      </Typography>
    </Box>
  );
}

export default SideBar;
