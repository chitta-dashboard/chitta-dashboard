import { styled, TableCell } from "@mui/material";
namespace S {
  export const WebTableCell = styled(TableCell)(({ theme }) => ({
    "&:nth-last-of-type(2)": {
      width: "12%",
    },

    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));
  export const TabTableCell = styled(TableCell)(({ theme }) => ({
    textAlign: "center",

    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  }));
}

export default S;
