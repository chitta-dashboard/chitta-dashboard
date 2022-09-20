import { Stack, styled, TableFooter } from "@mui/material";

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
    "& .Mui-selected": {
      backgroundColor: theme.palette.primary.light,
      color: "white",
    },
    "& p": {
      fontSize: "1rem",
    },
  }));
  export const PageStack = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }));
}

export default S;
