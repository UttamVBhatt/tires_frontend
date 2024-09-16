// Third library imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Hooks
import { useEffect, useState } from "react";

// Importing pages
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import OrderManagement from "./pages/OrderManagement";
import Transactions from "./pages/Transactions";
import Activities from "./pages/Activities";
import ManageAdmin from "./pages/ManageAdmin";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import TransactionDetails from "./features/transactions/TransactionDetails";
import MainLayout from "./layout/MainLayout";

// themes
import { lightTheme, darkTheme } from "./styles/themes";

const queryClient = new QueryClient();

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = darkMode ? darkTheme : lightTheme;

  const toggleDarkMode = (mode) => {
    setDarkMode(mode);
    localStorage.setItem("mode", JSON.stringify(mode));
  };

  useEffect(() => {
    const mode = localStorage.getItem("mode");
    if (mode !== null) {
      setDarkMode(JSON.parse(mode));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <MainLayout onDarkMode={toggleDarkMode} darkMode={darkMode} />
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/order-management" element={<OrderManagement />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route
                path="/transactions-details"
                element={<TransactionDetails />}
              />
              <Route path="/activities" element={<Activities />} />
              <Route path="/manage-admin" element={<ManageAdmin />} />
              <Route path="/product-list" element={<ProductList />} />
              <Route path="/add-product" element={<AddProduct />} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
