export const searchInputStyle = {
  width: "14rem",
  height: "2.5rem",
  border: "1px solid lightgrey",
  outline: "none",
  paddingLeft: "0.8rem",
  fontSize: "0.9rem",
  marginTop: "1.4rem",
  borderRadius: "0.8rem",
};

export const activeTabStyle = (theme) => {
  return {
    color: theme.palette.mode === "light" ? "blue" : "white",
    borderBottom:
      theme.palette.mode === "light" ? "1px solid blue" : "1px solid white",
    paddingBottom: "0.5rem",
    cursor: "pointer",
    fontWeight: "500",
  };
};

export const inactiveTabStyle = {
  color: "gray",
  cursor: "pointer",
  fontWeight: "500",
};

export const tableCellStyle = (color) => {
  return {
    width: "9rem",
    display: "flex",
    height: "4rem",
    justifyContent: "center",
    color: color,
  };
};

export const tabHeaderStyles = {
  display: "flex",
  gap: "3rem",
  borderBottom: "1px solid lightgrey",
  margin: "1.5rem 0 0 0",
  padding: "0 0 0 1.2rem",
};

export const tableContainerStyle = (theme) => {
  return {
    backgroundColor:
      theme.palette.mode === "light"
        ? "white"
        : theme.palette.background.default,
    borderRadius: "6px",
    "&::-webkit-scrollbar": {
      width: 0,
    },
  };
};

export const tableStyles = (theme) => {
  return {
    backgroundColor:
      theme.palette.mode === "light"
        ? "whitesmoke"
        : "rgba(255, 255, 255, 0.2)",
    borderRadius: "1rem",
  };
};

export const tableRowStyles = (width) => {
  return {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: width,
    textAlign: "center",
  };
};

export const iconStyles = {
  borderRadius: "100%",
  border: "1px solid lightgrey",
  fontSize: "1.2rem",
  cursor: "pointer",
};
