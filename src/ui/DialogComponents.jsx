// Third party imports
import { Box, IconButton, Typography } from "@mui/material";
import Proptypes from "prop-types";

// Icons
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Hooks
import { useTheme } from "@emotion/react";

export default function DialogComponents({
  open,
  text,
  notifications,
  messages,
  onOpen,
  onRemoveMsgs,
  onRemoveNots,
  onText,
}) {
  const theme = useTheme();
  // Through this variable we'll show this div if messages or notifications are not an empty array
  const isVisible =
    (text === "Notification" && notifications?.length) ||
    (text === "Message" && messages?.length) ||
    text === "User";
  false;

  const rightMargin =
    (text === "Notification" && "7.6rem") ||
    (text === "Message" && "5rem") ||
    (text === "User" && "2.3rem");

  return (
    <>
      {isVisible && (
        <div
          style={{
            position: "absolute",
            right: rightMargin,
            display: open ? "flex" : "none",
            flexDirection: "column",
            gap: "1rem",
            width: "21rem",
            marginTop: "0.1rem",
            padding: "1rem",
            height: "10rem",
            borderRadius: "0.5rem",
            WebkitBoxShadow: "2px 3px 5px 5px rgba(214,214,214,1)",
            MozBoxShadow: "2px 3px 5px 5px rgba(214,214,214,1)",
            boxShadow: "2px 3px 5px 5px rgba(214,214,214,1)",
            zIndex: 5,
            backgroundColor:
              theme.palette.mode === "light"
                ? theme.palette.background.default
                : "black",
          }}
        >
          {text === "User" ? (
            <div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <IconButton
                  onClick={() => {
                    onOpen(true);
                    onText("User");
                  }}
                >
                  <AccountCircleIcon
                    sx={{ width: "3rem", height: "3rem", color: "lightGray" }}
                  />
                </IconButton>

                <Box>
                  <Typography component={"span"} sx={{ display: "block" }}>
                    first User
                  </Typography>
                  <Typography component={"span"} sx={{ display: "block" }}>
                    firstUser@gmail.com
                  </Typography>
                </Box>
              </div>
            </div>
          ) : (
            <>
              {text === "Notification"
                ? notifications?.map((not, i) => (
                    <Typography
                      sx={{ marginTop: "0.5rem" }}
                      key={i}
                      variant="p"
                      component={"p"}
                    >
                      {i + 1}) {not}
                    </Typography>
                  ))
                : messages?.map((msg, i) => (
                    <Typography
                      sx={{ marginTop: "0.5rem" }}
                      key={i}
                      variant="p"
                      component={"p"}
                    >
                      {i + 1}) {msg}
                    </Typography>
                  ))}
            </>
          )}

          <Box
            component={"div"}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {text === "User" ? (
              <IconButton sx={{ marginLeft: "0.7rem" }}>
                <LogoutIcon />
              </IconButton>
            ) : (
              <Typography
                variant="p"
                component={"p"}
                onClick={() => {
                  onOpen(!open);
                }}
                sx={{
                  color: "rgb(9, 167, 230)",
                  cursor: "pointer",
                  textAlign: "end",
                }}
              >
                Close
              </Typography>
            )}
            <Typography
              onClick={() => {
                text === "Notification" && onRemoveNots();
                text === "Message" && onRemoveMsgs();
                text === "User" && onOpen(!open);
              }}
              variant="p"
              component={"p"}
              sx={{
                color: "rgb(9, 167, 230)",
                cursor: "pointer",
                textAlign: "end",
              }}
            >
              {text === "User" ? "Close" : "Clear All"}
            </Typography>
          </Box>
        </div>
      )}
    </>
  );
}

DialogComponents.propTypes = {
  open: Proptypes.bool,
  text: Proptypes.string,
  notifications: Proptypes.array,
  messages: Proptypes.array,
  onOpen: Proptypes.func,
  onRemoveMsgs: Proptypes.func,
  onRemoveNots: Proptypes.func,
  onText: Proptypes.func,
};
