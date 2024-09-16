import { Typography } from "@mui/material";
import Proptypes from "prop-types";

function FormErrors({ message }) {
  return (
    <Typography component="p" sx={{ color: "red" }}>
      {message}
    </Typography>
  );
}

FormErrors.propTypes = {
  message: Proptypes.string,
};

export default FormErrors;
