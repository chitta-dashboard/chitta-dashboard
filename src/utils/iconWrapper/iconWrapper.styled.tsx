import { styled } from "@mui/material";

namespace S {
  export const Wrapper = styled("i", { shouldForwardProp: (prop) => prop !== "isGreen" })<{ isGreen?: boolean }>(({ theme, isGreen }) => ({
    fontWeight: "500",
    fontSize: "1.3rem",
    padding: ".6rem",
    borderRadius: "50%",
    lineHeight: "1",
    color: isGreen ? "white" : theme.palette.primary.main,
    backgroundColor: isGreen ? theme.palette.primary.main : "white",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, .2)",

    "&:hover": {
      cursor: "pointer",
    },
  }));
}

export default S;
