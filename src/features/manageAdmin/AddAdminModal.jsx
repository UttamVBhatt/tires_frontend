// Third party imports
import {
  Button,
  Dialog,
  DialogContent,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Proptypes from "prop-types";
import { Controller, useForm } from "react-hook-form";

// Hooks
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Our own components or functions
import ImageDropzone from "../../ui/ImageDropzone";
import FormErrors from "../../ui/FormErrors";
import { updateOne, createOne } from "../../services/services";

AddAdminModal.propTypes = {
  open: Proptypes.bool,
  onOpen: Proptypes.func,
  admin: Proptypes.object,
  setAdmin: Proptypes.func,
};

function AddAdminModal({ open, onOpen, admin, setAdmin }) {
  const { t } = useTranslation();
  const [image, setImage] = useState([]);
  const queryClient = useQueryClient();

  const { mutate: updateAdmin } = useMutation({
    mutationFn: ({ route, data, id }) => updateOne(route, data, id),
    onSuccess: () => queryClient.invalidateQueries(["admins"]),
    onError: (err) => console.log(err),
  });

  const { mutate: createAdmin } = useMutation({
    mutationFn: ({ route, data }) => createOne(route, data),
    onSuccess: () => queryClient.invalidateQueries(["admins"]),
    onError: (err) => console.log(err),
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t("ProvideName"))
      .min(2, t("NameMustContain"))
      .max(20, t("NameShouldNotContain"))
      .typeError(t("NameMustBeOnly")),
    email: Yup.string().email().required(t("ProvideEmail")),
    password: Yup.string(),
    role: Yup.string().required(t("ProvideRole")),
  });

  const { register, handleSubmit, formState, reset, control } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", image);

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const route = "admins";

    admin?._id
      ? updateAdmin({ route, data, id: admin?._id })
      : createAdmin({ route, data });

    setImage([]);
    setAdmin(() => {});
    onOpen((open) => !open);
    reset();
  };

  useEffect(() => {
    if (admin?._id) {
      reset({
        name: admin?.name,
        role: admin?.role,
        password: admin?.password,
        email: admin?.email,
      });
    } else {
      reset();
    }
  }, [reset, admin]);

  return (
    <Dialog
      open={open}
      onClose={() => onOpen(!open)}
      PaperProps={{
        style: {
          width: "41rem",
        },
      }}
    >
      <DialogContent
        sx={{
          "&::-webkit-scrollbar": {
            background: "transparent",
          },
        }}
      >
        <ImageDropzone
          width={"100%"}
          image={image}
          setImage={setImage}
          multiple={false}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            style={{
              marginBottom: "2.3rem",
              display: "flex",
              gap: "0.4rem",
              flexDirection: "column",
            }}
          >
            <TextField
              sx={{ width: "100%", marginTop: "1rem" }}
              type="text"
              placeholder={t("AdminName")}
              {...register("name")}
            />
            <FormErrors message={errors?.name?.message} />
          </div>

          <div
            style={{
              marginBottom: "2.3rem",
              display: "flex",
              gap: "0.4rem",
              flexDirection: "column",
            }}
          >
            <TextField
              sx={{ width: "100%" }}
              type="email"
              placeholder={t("AdminEmail")}
              {...register("email")}
            />
            <FormErrors message={errors?.email?.message} />
          </div>

          {!admin?._id && (
            <div
              style={{
                marginBottom: "2.3rem",
                display: "flex",
                gap: "0.4rem",
                flexDirection: "column",
              }}
            >
              <TextField
                sx={{ width: "100%" }}
                type="password"
                placeholder={t("AdminPassword")}
                {...register("password")}
              />
              <FormErrors message={errors?.password?.message} />
            </div>
          )}

          <div>
            <Controller
              name="role"
              control={control}
              defaultValue=""
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    sx={{ width: "100%" }}
                    displayEmpty
                    onChange={(e) => {
                      field.onChange(String(e.target.value));
                    }}
                    value={field.value?.startsWith(NaN) ? "" : field.value}
                  >
                    <MenuItem value="" disabled>
                      {t("SelectRole")}
                    </MenuItem>
                    <MenuItem value="Super Admin">{t("Super Admin")}</MenuItem>
                    <MenuItem value="Shop Admin">{t("Shop Admin")}</MenuItem>
                  </Select>
                );
              }}
            />

            <FormErrors message={errors?.role?.message} />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                sx={{
                  marginTop: "1.4rem",
                  backgroundColor: "red",
                  color: "white",
                }}
                variant="contained"
                onClick={() => {
                  onOpen((open) => !open);
                  setAdmin(() => {});
                }}
              >
                {t("Cancel")}
              </Button>

              <Button
                sx={{ marginTop: "1.4rem" }}
                type="submit"
                variant="contained"
                // onClick={() => handleSubmit(onSubmit)}
              >
                {admin?._id ? t("Update") : t("Add")}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddAdminModal;
