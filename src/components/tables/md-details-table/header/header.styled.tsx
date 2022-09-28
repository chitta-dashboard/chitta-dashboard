import { styled, TableCell } from "@mui/material";
namespace S {
  export const WebTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.custom.backgroundDark,
    color: theme.palette.text.primaryDark,
    fontSize: "1.1rem",
    fontWeight: 600,
    padding: "1.25rem 0",
    width: "25%",
    "&:nth-of-type(3)": {
      width: "32%",
    },
    "&:nth-last-of-type(2)": {
      width: "20%",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));
  export const TabTableCell = styled(TableCell)(({ theme }) => ({
    fontSize: "1.1rem",
    fontWeight: 600,
    textAlign: "center",
    backgroundColor: theme.palette.custom.backgroundDark,
    color: theme.palette.text.primaryDark,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  }));
}

export default S;
