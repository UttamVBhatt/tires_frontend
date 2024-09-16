// Third Library Imports
import { Box, Button, TextField } from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Proptypes from "prop-types";

// Hooks
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Our own components
import FormErrors from "../../ui/FormErrors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOne, updateOne } from "../../services/services";

const formFieldStrings = [
  { name: "ProductName", value: "product_name" },
  { name: "Profile", value: "profile" },
  { name: "CarBrand", value: "car_brand" },
  { name: "DesignType", value: "design_type" },
  { name: "TT_TL", value: "tt_tl" },
  { name: "Brand", value: "brand" },
];

const formFieldNumbers = [
  { name: "CustomsService", value: "customs_service" },
  { name: "Wheel Size", value: "wheel_size" },
  { name: "Load speed index", value: "load_speed_index" },
  { name: "PR", value: "PR" },
  { name: "Width", value: "width" },
  { name: "Weight", value: "weight" },
  { name: "Tyre height", value: "tyre_height" },
  { name: "Load per tyre", value: "load_per_tyre" },
  { name: "At km", value: "at_km" },
  { name: "EAN", value: "EAN" },
  { name: "Quantity", value: "quantity" },
  { name: "Price", value: "price" },
];

AddProductForm.propTypes = {
  images: Proptypes.array,
  setImages: Proptypes.func,
};

function AddProductForm({ images, setImages }) {
  const { t } = useTranslation();
  const { state } = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const route = "products";

  const { mutate: createProduct } = useMutation({
    mutationFn: (data) => createOne(route, data),
    onSuccess: () => queryClient.invalidateQueries(["products"]),
    onError: (err) => console.log(err),
  });

  const { mutate: updateProduct } = useMutation({
    mutationFn: ({ data, id }) => updateOne(route, data, id),
    onSuccess: () => queryClient.invalidateQueries(["products"]),
    onError: (err) => console.log(err),
  });

  // Later we'll make it in such way that it should be used for update product as well.
  const validationSchema = Yup.object().shape({
    product_name: Yup.string(),
    profile: Yup.string(),
    car_brand: Yup.string(),
    design_type: Yup.string(),
    customs_service: Yup.number()
      .min(5, "customs_service must contain atleast 8 numbers")
      .typeError("Please provide only numbers"),
    wheel_size: Yup.number(),
    load_speed_index: Yup.number(),
    PR: Yup.number(),
    tt_tl: Yup.string().oneOf(
      ["tt", "tl"],
      "Please provide values between tt or tl"
    ),
    width: Yup.number(),
    weight: Yup.number(),
    tyre_height: Yup.number(),
    load_per_tyre: Yup.number(),
    at_km: Yup.number(),
    EAN: Yup.number().min(10, "EAN number must contain atleast 10 characters"),
    brand: Yup.string(),
    quantity: Yup.number(),
  });

  const { formState, handleSubmit, register, reset } = useForm({
    defaultValues: {
      product_name: state?.product_name || "",
      EAN: state?.EAN || "",
      PR: state?.PR || "",
      at_km: state?.at_km || "",
      brand: state?.brand || "",
      car_brand: state?.car_brand || "",
      customs_service: state?.customs_service || "",
      design_type: state?.design_type || "",
      load_per_tyre: state?.load_per_tyre || "",
      load_speed_index: state?.load_speed_index || "",
      price: state?.price || "",
      profile: state?.profile || "",
      quantity: state?.quantity || "",
      tt_tl: state?.tt_tl || "",
      tyre_height: state?.tyre_height || "",
      weight: state?.weight || "",
      wheel_size: state?.wheel_size || "",
      width: state?.width || "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value); // Append key-value pairs to formData
    });

    images?.forEach((img) => {
      formData.append("image", img);
    });

    // Code to see the values of the formData
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    state?._id ? updateProduct({ data, id: state?._id }) : createProduct(data);

    reset();
    setImages([]);
    navigate("/product-list");
  };

  return (
    <Box sx={{ marginBottom: "3rem" }}>
      <form
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.6rem",
          marginTop: "2.3rem",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {formFieldStrings?.map(({ name, value }) => (
          <div
            style={{
              width: "45%",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
            key={name}
          >
            <TextField
              sx={{ width: "100%" }}
              type="text"
              placeholder={t(`${name}`)}
              {...register(value)}
            />

            {errors?.[value] && (
              <FormErrors message={errors?.[value]?.message} />
            )}
          </div>
        ))}

        {formFieldNumbers?.map(({ name, value }) => (
          <div
            style={{
              width: "45%",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
            key={name}
          >
            <TextField
              sx={{ width: "100%" }}
              type="text"
              placeholder={t(`${name}`)}
              {...register(value)}
            />

            {errors?.[value] && (
              <FormErrors message={errors?.[value]?.message} />
            )}
          </div>
        ))}

        <Button
          type="submit"
          variant="contained"
          sx={{ height: "2.8rem", marginTop: "0.5rem" }}
        >
          {t("Submit")}
        </Button>
      </form>
    </Box>
  );
}

export default AddProductForm;
