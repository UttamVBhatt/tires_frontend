import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import Proptypes from "prop-types";

const styles = {
  color: "gray",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "1.3rem",
  textDecoration: "none",
  borderRadius: "1rem",
  padding: "0.7rem 0.5rem",
  "&:hover": {
    backgroundColor: "white",
  },
};

function NavLink({ val }) {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <Typography
      sx={
        pathname === val.path
          ? {
              ...styles,
              backgroundColor: "white",
              color: "black",
            }
          : pathname?.startsWith(val.path)
          ? {
              ...styles,
              backgroundColor: "white",
              color: "black",
            }
          : { ...styles }
      }
      component={Link}
      to={val.path}
    >
      <Typography
        component="span"
        sx={{
          display: "inline-block",
          width: "0.8rem",
          height: "0.8rem",
          marginTop: "-0.7rem",
          marginLeft: "0.5rem",
        }}
      >
        {pathname === val.path ? val.activeIcon : val.icon}
      </Typography>

      <Typography
        sx={{
          display: "inline-block",
          //   marginTop: "0.5rem",
          fontWeight: "550",
        }}
        component="span"
      >
        {t(`${val?.name}`)}
      </Typography>
    </Typography>
  );
}

NavLink.propTypes = {
  val: Proptypes.object,
  i: Proptypes.number,
};

export default NavLink;
