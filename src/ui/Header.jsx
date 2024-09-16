// Third party imports
import { Box, IconButton, Typography } from "@mui/material";
import Proptypes from "prop-types";

// Icons
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

// Hooks
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { UrlToHeading } from "../utils/handler";

// Our own Components
import DialogComponents from "./DialogComponents";
import LanguageSelector from "./LanguageSelector";

function Header({ onDarkMode, darkMode }) {
  // We'll remove this array when we'll have actual notification and messages data
  const dummyNotifications = [
    "A new user has arrived",
    "You've a new order check it out!",
  ];
  const dummyMessages = [
    "I've some doubt about your policy",
    "Can i get some discount on that product",
  ];

  const path = useLocation();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [notLength, setNotLength] = useState(dummyNotifications?.length);
  const [msgLength, setMsgLength] = useState(dummyMessages?.length);
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [messages, setMessages] = useState(dummyMessages);

  const { t } = useTranslation();

  const handleRemoveNots = () => {
    setNotLength(0);
    setNotifications([]);
    setOpen(!open);
  };

  const handleRemoveMsgs = () => {
    setMsgLength(0);
    setMessages([]);
    setOpen(!open);
  };

  const topHeading =
    path.pathname === "/" ? "Dashboard" : UrlToHeading(path.pathname);

  return (
    <header
      style={{
        // marginTop: "1rem",
        display: "flex",
        justifyContent: "space-between",
        width: "98%",
        margin: "1.3rem 0 0 0",
      }}
    >
      <Box
        component={"div"}
        sx={{ display: "flex", gap: "1.9rem", alignItems: "center" }}
      >
        <Typography variant="h6" component={"h6"}>
          {t(topHeading)}
        </Typography>

        <LanguageSelector />
      </Box>

      <Box>
        <IconButton disableRipple onClick={() => onDarkMode(!darkMode)}>
          {darkMode ? <DarkModeIcon /> : <WbSunnyIcon />}
        </IconButton>

        <IconButton
          onClick={() => {
            setOpen(true);
            setText("Notification");
          }}
          sx={{ position: "relative" }}
        >
          <NotificationsIcon />
          <Typography
            component={"span"}
            sx={{
              backgroundColor: "red",
              padding: "0rem 0.3rem",
              borderRadius: "100%",
              fontSize: "0.8rem",
              color: "white",
              position: "absolute",
              top: "-0.1rem",
              right: "0.3rem",
            }}
          >
            {notLength}
          </Typography>
        </IconButton>
        <DialogComponents
          onRemoveNots={handleRemoveNots}
          onRemoveMsgs={handleRemoveMsgs}
          notifications={notifications}
          messages={messages}
          text={text}
          open={open}
          onOpen={setOpen}
          onText={setText}
        />

        <IconButton
          onClick={() => {
            setOpen(true);
            setText("Message");
          }}
          sx={{ position: "relative" }}
        >
          <MessageIcon />
          <Typography
            component={"span"}
            sx={{
              backgroundColor: "red",
              padding: "0rem 0.3rem",
              borderRadius: "100%",
              fontSize: "0.8rem",
              color: "white",
              position: "absolute",
              top: "-0.1rem",
              right: "-0.1rem",
            }}
          >
            {msgLength}
          </Typography>
        </IconButton>
        <DialogComponents
          onRemoveNots={handleRemoveNots}
          onRemoveMsgs={handleRemoveMsgs}
          notifications={notifications}
          messages={messages}
          text={text}
          open={open}
          onOpen={setOpen}
          onText={setText}
        />

        <IconButton
          onClick={() => {
            setOpen(true);
            setText("User");
          }}
        >
          <AccountCircleIcon sx={{ width: "1.7rem", height: "1.7rem" }} />
        </IconButton>
      </Box>
    </header>
  );
}

export default Header;

Header.propTypes = {
  onDarkMode: Proptypes.func,
  darkMode: Proptypes.bool,
};
