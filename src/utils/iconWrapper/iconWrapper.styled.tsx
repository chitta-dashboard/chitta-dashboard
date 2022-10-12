import { styled } from "@mui/material";

namespace S {
  export const Wrapper = styled("i", { shouldForwardProp: (prop) => prop !== "isGreen" && prop !== "isDummy" })<{
    isGreen?: boolean;
    isDummy?: boolean;
  }>(({ theme, isGreen, isDummy }) => ({
    fontWeight: "500",
    fontSize: "1.3rem",
    padding: ".6rem",
    borderRadius: "50%",
    lineHeight: "1",
    color: isGreen ? theme.palette.text.white : theme.palette.primary.light,
    backgroundColor: isGreen ? theme.palette.primary.light : theme.palette.text.white,
    boxShadow: `0px 4px 10px ${theme.palette.addAlpha(theme.palette.custom.shadow, 0.2)}`,
    transition: "background .3s, color .3s",
    visibility: isDummy ? "hidden" : "visible", // acts as a static placeholder if isDummy is true

    "&:hover": {
      cursor: "pointer",
    },
  }));
}

export default S;
