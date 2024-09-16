// Put this into useMemo letter
export const tableRowStyle = {
  display: "flex",
  gap: "0.6rem",
  paddingLeft: "1rem",
};
export const tableCellStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "6rem",
  textAlign: "center",
};
export const tableContainerStyle = (theme) => {
  return {
    width: "100%",
    overflowX: "scroll",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
      cursor: "grab",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.mode === "light" ? "#888" : "white",
      borderRadius: "1rem",
      cursor: "grab",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#555",
      cursor: "grab",
    },
  };
};

export const tableStyle = (theme) => {
  return {
    backgroundColor:
      theme.palette.mode === "light"
        ? "#d3d3d32e"
        : theme.palette.background.default,
    borderRadius: "0.5rem",
    padding: "0.3rem 0 0 0",
  };
};
