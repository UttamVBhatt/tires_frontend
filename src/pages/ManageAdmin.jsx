// Third party imports
import { Box, Button } from "@mui/material";

// Hooks
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// We'll replace that dummy admin data
// import { dummyAdminData } from "../data/admin";

// Our own component or functionss
import CustomPagination from "../features/products/CustomPagination";
import { arrayOfPerPage } from "../utils/handler";
import AddAdminModal from "../features/manageAdmin/AddAdminModal";
import AdminTable from "../features/manageAdmin/AdminTable";
import DeleteModal from "../ui/DeleteModal";

// Services
import { deleteOne, getAll } from "../services/services";

function ManageAdmin() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [addEditOpen, setAddEditOpen] = useState(false);
  const [admin, setAdmin] = useState({});
  const [id, setId] = useState(0);
  const route = "admins";

  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["admins"],
    queryFn: () => getAll("admins"),
  });

  const { mutate: deleteAdmin } = useMutation({
    mutationFn: () => deleteOne(route, id),
    onSuccess: queryClient.invalidateQueries(["admins"]),
    onError: (err) => console.log(err),
  });

  // We've to add the delete admin logic remember

  return (
    <Box component={"div"}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "1.2rem",
        }}
      >
        <Button
          onClick={() => {
            setAddEditOpen(true);
            setAdmin(() => {});
          }}
          variant="contained"
          sx={{ marginRight: "0.5rem" }}
        >
          {t("AddAdmin")}
        </Button>
      </div>

      <AdminTable
        admins={data?.docs}
        page={page}
        rowsPerPage={rowsPerPage}
        setDeleteOpen={setDeleteOpen}
        setAdmin={setAdmin}
        setAddEditOpen={setAddEditOpen}
        setId={setId}
      />

      <CustomPagination
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        count={data?.docs?.length || 1}
        rowsPerPageOptions={arrayOfPerPage(data?.docs)}
      />

      <DeleteModal
        open={deleteOpen}
        onOpen={setDeleteOpen}
        onDelete={deleteAdmin}
      />

      <AddAdminModal
        admin={admin}
        open={addEditOpen}
        onOpen={setAddEditOpen}
        setAdmin={setAdmin}
      />
    </Box>
  );
}

export default ManageAdmin;
