import { styled, TableCell } from "@mui/material";
namespace S {
  export const WebTableCell = styled(TableCell)(({ theme }) => ({
    "&:first-of-type": {
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
    },
    "&:nth-last-of-type(2)": {
      width: "12%",
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
