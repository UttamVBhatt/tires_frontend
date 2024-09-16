// Third library imports
import { Box } from "@mui/material";

// Hooks
import { useState } from "react";

// Our own Components
import ImageDropzone from "../ui/ImageDropzone";
import AddProductForm from "../features/addProduct/AddProductForm";

function AddProduct() {
  const [images, setImages] = useState([]);

  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "scroll",
        "&::-webkit-scrollbar": { width: "0" },
      }}
    >
      <ImageDropzone
        images={images}
        setImages={setImages}
        multiple={true}
        width={"50%"}
      />
      <AddProductForm images={images} setImages={setImages} />
    </Box>
  );
}

export default AddProduct;
