import { styled } from "@mui/material";

namespace S {
  export const Icon = styled("i")(({ theme }) => ({
    fontSize: "1.75rem",
    color: theme.palette.text.primary,
    [theme.breakpoints.down("md")]: {
      fontSize: "1.25rem",
    },
  }));
}

export default S;
