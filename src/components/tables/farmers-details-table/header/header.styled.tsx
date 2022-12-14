import { styled, TableCell } from "@mui/material";
namespace S {
  export const ColCheckCell = styled(TableCell)(({ theme }) => ({
    width: "5%",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  export const WebTableCell = styled(TableCell)(({ theme }) => ({
    span: {
      display: "flex",
      width: "fit-content",
      gap: "1rem",
      "&:hover": {
        cursor: "pointer",
      },
    },
    [theme.breakpoints.down("xl")]: {
      "&:nth-of-type(2)": {
        width: "12%",
      },
      "&:nth-of-type(4)": {
        width: "14%",
      },
      "&:nth-of-type(5)": {
        width: "15%",
      },
      "&:nth-of-type(6)": {
        width: "15%",
      },
      "&:nth-of-type(7)": {
        width: "15%",
      },
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  export const icon = styled("i")({
    padding: "0 1rem",
  });

  export const TabTableCell = styled(TableCell)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  }));
}

export default S;
