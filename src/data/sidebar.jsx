// Importing Icons - Outlined/Filled
// Dashboard
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import HouseIcon from "@mui/icons-material/House";

// Order Management
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Customers
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

// Transactions
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

// Activities
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

// Add Product
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";

// Product List
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";

// Manage Admin
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonIcon from "@mui/icons-material/Person";

export const mainMenu = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <HouseOutlinedIcon />,
    activeIcon: <HouseIcon />,
  },
  {
    name: "Order Management",
    path: "/order-management",
    icon: <ShoppingCartOutlinedIcon />,
    activeIcon: <ShoppingCartIcon />,
  },
  {
    name: "Customers",
    path: "/customers",
    icon: <PeopleAltOutlinedIcon />,
    activeIcon: <PeopleAltIcon />,
  },
  {
    name: "Transactions",
    path: "/transactions",
    icon: <ReceiptLongOutlinedIcon />,
    activeIcon: <ReceiptLongIcon />,
  },
  {
    name: "Activities",
    path: "/activities",
    icon: <LibraryBooksOutlinedIcon />,
    activeIcon: <LibraryBooksIcon />,
  },
];

export const products = [
  {
    name: "Add Product",
    path: "/add-product",
    icon: <AddCircleOutlineIcon />,
    activeIcon: <AddCircleIcon />,
  },
  {
    name: "Product List",
    path: "/product-list",
    icon: <ListAltOutlinedIcon />,
    activeIcon: <ListAltOutlinedIcon />,
  },
];

export const admin = [
  {
    name: "Manage Admin",
    path: "/manage-admin",
    icon: <PersonOutlineOutlinedIcon />,
    activeIcon: <PersonIcon />,
  },
];
