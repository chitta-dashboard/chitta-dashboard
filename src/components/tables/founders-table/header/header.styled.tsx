import { styled, TableCell } from "@mui/material";
namespace S {
  export const WebTableCell = styled(TableCell)(({ theme }) => ({
    width: "25%",
    "&:nth-of-type(3)": {
      width: "32%",
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
