import { Box, IconButton } from "@mui/material";
import Proptypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";

const styles = {
  position: "absolute",
  right: "-1.5rem",
  top: "-1rem",
  color: "black",
  backgroundColor: "white",
  borderRadius: "100%",
  cursor: "pointer",
  "&:hover": {
    color: "red",
  },
};

function ImageComponent({ img, i, onImages }) {
  return (
    <Box sx={{ position: "relative" }}>
      <img
        width={140}
        height={140}
        src={URL.createObjectURL(img)}
        alt={img?.path}
      />

      <IconButton onClick={() => onImages(i)} sx={styles}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
}

ImageComponent.propTypes = {
  img: Proptypes.object,
  i: Proptypes.number,
  onImages: Proptypes.func,
};

export default ImageComponent;
