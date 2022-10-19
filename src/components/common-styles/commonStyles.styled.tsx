import { styled } from "@mui/material";

namespace S {
  export const Icon = styled("i")<{ shade?: boolean; deleteicon?: number }>(({ theme, shade, deleteicon }) => ({
    fontSize: "1.75rem",
    color: shade ? theme.palette.text.secondaryLight : theme.palette.text.primary,
    visibility: deleteicon ? "hidden" : "visible",
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
