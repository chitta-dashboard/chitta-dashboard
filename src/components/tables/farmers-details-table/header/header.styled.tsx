import { styled, TableCell } from "@mui/material";
namespace S {
  export const ColCheckCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.custom.backgroundDark,
    width: "7%",
    padding: "1rem 0",
    textAlign: "center",
    "& .MuiSvgIcon-root": {
      color: theme.palette.text.primaryDark,
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  export const WebTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.custom.backgroundDark,
    color: theme.palette.text.primaryDark,
    fontSize: "1.1rem",
    fontWeight: 600,
    padding: "1.25rem 0",
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
    fontSize: "1rem",
    fontWeight: 600,
    backgroundColor: theme.palette.custom.backgroundDark,
    color: theme.palette.text.primaryDark,
    display: "flex",
    alignItems: "center",
    padding: "1rem 2rem",
    gap: "30%",
    "& .MuiSvgIcon-root": {
      color: theme.palette.text.primaryDark,
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  }));
}

export default S;
