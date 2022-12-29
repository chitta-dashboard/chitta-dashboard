import { styled } from "@mui/material";
import { Box } from "@mui/system";

namespace S {
  export const ToggleSwitchContainer = styled(Box)({
    width: "40px",
    backgroundColor: "#c4c4c4",
    cursor: "pointer",
    userSelect: "none",
    borderRadius: "18px",
    padding: "2px",
    height: "20px",
    position: "relative",
  });

  export const CustomSwitchButton = styled("span", {
    shouldForwardProp: (prop) => prop !== "colorToggle",
  })<{ colorToggle: boolean }>(({ theme, colorToggle }) => ({
    cursor: "pointer",
    backgroundColor: colorToggle ? theme.palette.primary.light : theme.palette.bg.main,
    borderRadius: "18px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    minWidth: "20px",
    width: "20px",
    height: "100%",
    position: "absolute",
    left: colorToggle ? " 21px" : "-1px",
    transition: "all 0.3s ease",
  }));
}

export default S;
