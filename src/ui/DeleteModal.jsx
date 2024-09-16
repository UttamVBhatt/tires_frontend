import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import Proptypes from "prop-types";

import { useTranslation } from "react-i18next";

DeleteModal.propTypes = {
  open: Proptypes.bool,
  onOpen: Proptypes.func,
  onDelete: Proptypes.func,
};

function DeleteModal({ open, onOpen, onDelete }) {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={() => onOpen(!open)}
      PaperProps={{
        style: {
          width: "23rem",
          height: "10rem",
        },
      }}
    >
      <DialogContent>
        <DialogContentText sx={{ fontSize: "1.2rem" }}>
          {t("AreYouSure")}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ margin: "0 1.9rem 0.5rem 0" }}>
        <Button variant="contained" onClick={() => onOpen(false)}>
          {t("No")}
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            onOpen(false);
            onDelete;
          }}
        >
          {t("Yes")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteModal;
