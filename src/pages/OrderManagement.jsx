// Third party imports
import { Box, Typography } from "@mui/material";

// Hooks
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

// Our own components or functions
import OrderManagementTable from "../features/orderManagement/orderManagementTable";
// import { orders as totalOrders } from "../data/orderManagement";

// Styles
import {
  searchInputStyle,
  activeTabStyle,
  inactiveTabStyle,
  tabHeaderStyles,
} from "../styles/orderManagement";
import { getAll } from "../services/services";

function OrderManagement() {
  // const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getAll("orders"),
  });

  const [tabIndex, setTabIndex] = useState(0);
  const [orders, setOrders] = useState();
  const [sortedOrders, setSortedOrders] = useState([]);
  const [orderId, setOrderId] = useState("");

  const theme = useTheme();
  const { t } = useTranslation();

  const tabHeads = [
    t("Pending"),
    t("Confirmed"),
    t("Shipped"),
    t("Delivered"),
    t("Cancelled"),
  ];

  const arrayOfEnglishHeads = [
    "Pending",
    "Confirmed",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const handleTabs = (i, tabHead) => {
    setTabIndex(i);
    const tabHeadLowerCase = tabHead.toLowerCase();
    setOrders(() =>
      data?.docs?.filter((order) => order.status === tabHeadLowerCase)
    );
  };

  useEffect(() => {
    if (orderId) {
      const allSortedOrders = [];
      Object.values(orders)?.forEach((order) => {
        (Object.values(order)[1]
          ?.toLowerCase()
          ?.startsWith(orderId?.toLowerCase()?.trim()) ||
          Object.values(order)[0] === +orderId?.trim()) &&
          allSortedOrders.unshift(order);
      });

      setSortedOrders(allSortedOrders);
    }
  }, [orderId, orders]);

  useEffect(() => {
    if (data?.docs) {
      setOrders(() =>
        data?.docs?.filter((order) => order.status === "pending")
      );
    }
  }, [data]);

  return (
    <>
      <input
        type="text"
        placeholder={t("SearchHere")}
        style={searchInputStyle}
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />

      <Box sx={tabHeaderStyles}>
        {tabHeads?.map((tabHead, i) => (
          <Typography
            sx={tabIndex === i ? () => activeTabStyle(theme) : inactiveTabStyle}
            onClick={() => handleTabs(i, arrayOfEnglishHeads[i])}
            key={tabHead}
          >
            {tabHead}
          </Typography>
        ))}
      </Box>

      <OrderManagementTable orders={orderId ? sortedOrders : orders} />
    </>
  );
}

export default OrderManagement;
