import { styled } from "@mui/material";

namespace S {
  export const Icon = styled("i")<{ iscolor: number }>(({ theme, iscolor }) => ({
    fontSize: "1.75rem",
    color: iscolor ? "none" : theme.palette.text.primary,
    [theme.breakpoints.down("md")]: {
      fontSize: iscolor ? "1.75rem" : "1.25rem",
    },
  }));
}

export default S;
