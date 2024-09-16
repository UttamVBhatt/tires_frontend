// Third library imports
import { Box, Button, TableCell } from "@mui/material";
import Proptypes from "prop-types";

// Icons
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Hooks
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";

// Styles
import { iconStyles } from "../../styles/orderManagement";
import { useMutation } from "@tanstack/react-query";
import { updateOne } from "../../services/services";

ArrowButtonComponent.propTypes = {
  status: Proptypes.string,
  isShow: Proptypes.bool,
  setIsShow: Proptypes.func,
  currentOrder: Proptypes.object,
};

function ArrowButtonComponent({ status, isShow, setIsShow, currentOrder }) {
  const [isUp, setIsUp] = useState(false);
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate: updateOrder } = useMutation({
    mutationFn: ({ data, id }) => updateOne("orders", data, id),
    onSuccess: () => queryClient.invalidateQueries(["orders"]),
    onError: (err) => console.log(err),
  });

  return (
    <TableCell
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "4rem",
      }}
    >
      <Box
        component={"div"}
        sx={{
          width: "2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {isUp ? (
          <KeyboardArrowUpIcon
            onClick={() => {
              setIsShow(!isShow);
              setIsUp(!isUp);
            }}
            sx={iconStyles}
          />
        ) : (
          <KeyboardArrowDownIcon
            onClick={() => {
              setIsShow(!isShow);
              setIsUp(!isUp);
            }}
            sx={iconStyles}
          />
        )}
      </Box>

      <Box
        component={"div"}
        sx={{ display: "flex", gap: "0.5rem", marginLeft: "1.2rem" }}
      >
        {status !== "delivered" && status !== "cancelled" && (
          <Button
            onClick={() =>
              updateOrder({
                data: { status: "cancelled" },
                id: currentOrder?._id,
              })
            }
            variant="contained"
            sx={{
              height: "1.9rem",
              backgroundColor: "red",
              color: "white",
            }}
          >
            {t("Cancel")}
          </Button>
        )}
        {status !== "confirmed" &&
          status !== "cancelled" &&
          status !== "shipped" && (
            <Button
              onClick={() =>
                status === "pending"
                  ? updateOrder({
                      data: { status: "confirmed" },
                      id: currentOrder?._id,
                    })
                  : updateOrder({
                      data: { status: "done" },
                      id: currentOrder?._id,
                    })
              }
              variant="contained"
              sx={{
                height: "1.9rem",
                backgroundColor: "green",
                color: "white",
              }}
            >
              {t("Approve")}
            </Button>
          )}
        {status === "confirmed" && (
          <Button
            onClick={() =>
              updateOrder({
                data: { status: "shipped" },
                id: currentOrder?._id,
              })
            }
            variant="contained"
            sx={{
              height: "1.9rem",
              color: "white",
              backgroundColor: "orange",
            }}
          >
            {t("Ship")}
          </Button>
        )}
        {status === "shipped" && (
          <Button
            onClick={() =>
              updateOrder({
                data: { status: "delivered" },
                id: currentOrder?._id,
              })
            }
            variant="contained"
            sx={{
              height: "1.9rem",
              color: "white",
              backgroundColor: "blue",
            }}
          >
            {t("Deliver")}
          </Button>
        )}
      </Box>
    </TableCell>
  );
}

export default ArrowButtonComponent;
