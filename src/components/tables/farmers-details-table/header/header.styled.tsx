import { styled, TableCell } from "@mui/material";
namespace S {
  export const ColCheckCell = styled(TableCell)(({ theme }) => ({
    width: "7%",
    textAlign: "center",

    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  export const WebTableCell = styled(TableCell)(({ theme }) => ({
    width: "18%",
    "&:nth-of-type(5)": {
      width: "28%",
    },
    "&:nth-last-of-type(2)": {
      width: "20%",
    },

    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  export const TabTableCell = styled(TableCell)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "30%",

    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  }));
}

export default S;
