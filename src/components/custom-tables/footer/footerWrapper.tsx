import { Stack, styled, TableFooter, Typography } from "@mui/material";

namespace S {
  export const Footer = styled(TableFooter)(({ theme }) => ({
    position: "sticky",
    bottom: "0%",
    backgroundColor: "white",
    "& .MuiButtonBase-root": {
      fontSize: "0.8rem",
      backgroundColor: "#CED6E0", //Custom Color
      color: "#0B213E", //Custom Color
      border: "none",
    },
    "& .css-oznjvi-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected": {
      backgroundColor: theme.palette.primary.light,
      color: "white",
    },
  }));
  export const PageNoDetails = styled(Typography)(({ theme }) => ({
    fontSize: "1rem",
    color: theme.palette.text.secondary,
    opacity: theme.palette.shadeOpacity,
  }));
  export const PageStack = styled(Stack)(({ theme }) => ({
    padding: "0 0.8rem",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }));
}

export default S;
