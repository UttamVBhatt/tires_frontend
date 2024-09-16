// Third party imports
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";
import Proptypes from "prop-types";

// Hooks
import { useTranslation } from "react-i18next";

// Icons
import FileUploadIcon from "@mui/icons-material/FileUpload";

// Our own components
import ImageComponent from "../ui/ImageComponent";

function ImageDropzone({
  images,
  setImages,
  image,
  setImage,
  multiple,
  width,
}) {
  const { t } = useTranslation();

  const onDrop = useCallback(
    (acceptedFiles) => {
      setImages?.(acceptedFiles);
      setImage?.(acceptedFiles);
    },
    [setImage, setImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
  });

  const handleImages = (i) => {
    setImages?.((images) => images?.filter((_, index) => index !== i));
    setImage?.([]);
  };

  return (
    <Box>
      <div
        style={{
          border: "1px dashed lightGray",
          width: width,
          height: "10rem",
          display: "grid",
          placeItems: "center",
          marginTop: "1.2rem",
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.3rem",
            cursor: "pointer",
          }}
        >
          <FileUploadIcon />

          {isDragActive ? (
            <Typography>{t("ReadyToCatch")}</Typography>
          ) : (
            <Typography>{t("DragAndDrop")}</Typography>
          )}
        </div>
      </div>

      <Box sx={{ marginTop: "1.6rem", display: "flex", gap: "1.9rem" }}>
        {multiple
          ? images?.map((img, i) => (
              <ImageComponent onImages={handleImages} img={img} i={i} key={i} />
            ))
          : image?.map((img, i) => (
              <ImageComponent onImages={handleImages} img={img} i={i} key={i} />
            ))}
      </Box>
    </Box>
  );
}

ImageDropzone.propTypes = {
  images: Proptypes.array,
  setImages: Proptypes.func,
  image: Proptypes.array,
  setImage: Proptypes.func,
  multiple: Proptypes.bool,
  width: Proptypes.string,
};

export default ImageDropzone;
