import { styled } from "@mui/material";

namespace S {
  export const Icon = styled("i")(({ theme }) => ({
    fontSize: "1.25rem",
    color: theme.palette.text.primary,
  }));
}

export default S;
