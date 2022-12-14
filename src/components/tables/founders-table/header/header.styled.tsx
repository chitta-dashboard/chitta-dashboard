import { styled, TableCell } from "@mui/material";
namespace S {
  export const WebTableCell = styled(TableCell)(({ theme }) => ({
    "&:first-of-type": {
      span: {
        display: "flex",
        width: "fit-content",
        gap: "1rem",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    "&:nth-of-type(2)": {
      width: "15%",
    },
    "&:nth-of-type(3)": {
      width: "16%",
    },
    "&:nth-last-of-type(2)": {
      width: "16%",
    },
    [theme.breakpoints.down("lg")]: {
      "&:nth-of-type(4)": {
        width: "20%",
      },
    },
    [theme.breakpoints.up("md")]: {
      "&:first-of-type": {
        paddingLeft: "1.25rem",
      },
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  export const TabTableCell = styled(TableCell)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    p: {
      textAlign: "center",
      flexGrow: 1,
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  }));
}

export default S;
