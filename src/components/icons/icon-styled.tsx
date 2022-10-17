import { styled } from "@mui/material";

namespace S {
  export const Icon = styled("i")<{ isColor: number }>(({ theme, isColor }) => ({
    fontSize: "1.75rem",
    color: isColor ? "none" : theme.palette.text.primary,
    [theme.breakpoints.down("md")]: {
      fontSize: isColor ? "1.75rem" : "1.25rem",
    },
  }));
}

export default S;
