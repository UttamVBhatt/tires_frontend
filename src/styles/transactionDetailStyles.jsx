export const headingStyle = {
  fontSize: "1.2rem",
  fontWeight: "500",
  marginTop: "0.6rem",
};

export const oneBoxStyle = (theme) => {
  return {
    width: "48%",
    borderRadius: "0.8rem",
    padding: "0.5rem 1rem",
    border: theme.palette.mode === "dark" ? "1px solid lightgray" : "",
    backgroundColor:
      theme.palette.mode === "light"
        ? "rgb(0,0,0,0.1)"
        : theme.palette.background.default,
  };
};

export const boxContentStyle = (gap, marginTop) => {
  return {
    display: "flex",
    gap: gap,
    marginTop: marginTop,
  };
};
