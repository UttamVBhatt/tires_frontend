import Header from "../ui/Header";
import SideBar from "../ui/SideBar";
import { Outlet } from "react-router-dom";
import Proptypes from "prop-types";
import { useTheme } from "@emotion/react";

function MainLayout({ onDarkMode, darkMode }) {
  const theme = useTheme();

  const backgroundColor =
    theme.palette.mode === "light"
      ? "whitesmoke"
      : theme.palette.background.default;

  return (
    <div style={{ display: "flex" }}>
      <div>
        <SideBar />
      </div>

      <main
        style={{
          // marginLeft: "1.4rem",
          padding: "0.5rem 0.5rem 0.5rem 2.3rem",
          width: "77.9vw",
          display: "flex",
          flexDirection: "column",
          gap: "1.3rem",
          backgroundColor,
          height: "100vh",
          // overflowY: "scroll",
        }}
      >
        <Header onDarkMode={onDarkMode} darkMode={darkMode} />
        <Outlet />
      </main>
    </div>
  );
}

MainLayout.propTypes = {
  onDarkMode: Proptypes.func,
  darkMode: Proptypes.bool,
};

export default MainLayout;
