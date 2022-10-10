import { styled } from "@mui/material";

namespace S {
  export const Icon = styled("i")<{ shade?: boolean }>(({ theme, shade }) => ({
    fontSize: "1.75rem",
    color: shade ? theme.palette.text.secondaryLight : theme.palette.text.primary,
    [theme.breakpoints.down("md")]: {
      fontSize: "1.25rem",
    },
  }));

  export const Bold = styled("b")(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: "1.4rem",
    fontWeight: 600,
  }));
}

export default S;
