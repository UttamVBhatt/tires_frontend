// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableCell } from "@mui/material";
import Proptypes from "prop-types";
import { tableCellStyle } from "../../styles/TableStyle";

Actions.propTypes = {
  onClickEdit: Proptypes.func,
  onClickDelete: Proptypes.func,
  styleOptions: Proptypes.object,
  EyeIcon: Proptypes.object,
};

function Actions({ onClickEdit, onClickDelete, styleOptions, EyeIcon }) {
  return (
    <TableCell sx={{ ...tableCellStyle, gap: "0.2rem", ...styleOptions }}>
      {EyeIcon && EyeIcon}
      <EditIcon onClick={onClickEdit} sx={{ cursor: "pointer" }} />
      <DeleteIcon onClick={onClickDelete} sx={{ cursor: "pointer" }} />
    </TableCell>
  );
}

export default Actions;
