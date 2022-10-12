import { Stack, styled, TableFooter, Typography } from "@mui/material";

namespace S {
  export const Footer = styled(TableFooter)(({ theme }) => ({
    position: "sticky",
    bottom: "0%",
    backgroundColor: "white",
    "& .MuiButtonBase-root": {
      fontSize: "0.8rem",
      backgroundColor: "#CED6E0", //Custom Color
      color: theme.palette.text.secondaryDark, //Custom Color
      border: "none",
    },
    "& .css-oznjvi-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected": {
      backgroundColor: `${theme.palette.primary.light} !important`,
      color: "white",
    },
  }));

  export const PageNoDetails = styled(Typography)(({ theme }) => ({
    fontSize: "1rem",
    color: theme.palette.addAlpha(theme.palette.text.secondary, 0.8),
  }));

  export const PageStack = styled(Stack)({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  });
}

export default S;
