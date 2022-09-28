import { TableContainer, styled, Table } from "@mui/material";

namespace S {
  export const TableContainerBox = styled(TableContainer)(({ theme }) => ({
    height: "calc(100% - 5rem)",
    backgroundColor: "white",
    borderRadius: "2rem",
    overflow: "hidden",
    margin: "2rem 0",
    border: 0,
    borderCollapse: "collapse",

    [theme.breakpoints.down("md")]: {
      margin: "1rem 0",
      height: "calc(100% - 7rem)",
    },
  }));

  export const TableBox = styled(Table)(({ theme }) => ({
    height: "100%",
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    border: 0,
    borderCollapse: "collapse",
    position: "relative",

    [theme.breakpoints.down("md")]: {
      height: "100%",
      display: "grid",
      gridTemplateRows: "auto 1fr auto",
    },

    "& thead,& tbody,& tr,& tfoot,& th,& td,& div": {
      border: 0,
      borderCollapse: "collapse",
    },

    "& thead ,& tbody,& tfoot ,& tr": {
      width: "100%",
      display: "table",
      tableLayout: "fixed",
    },
    "& thead": {
      display: "block",
      tableLayout: "fixed",
      backgroundColor: theme.palette.custom.backgroundDark,
      [theme.breakpoints.up("md")]: {
        padding: "0 1.5rem",
      },
    },
    "& tbody": {
      height: "100%",
      display: "block",
      tableLayout: "fixed",
      overflowY: "auto",
      overflowX: "hidden",
      [theme.breakpoints.up("md")]: {
        padding: "0 1.5rem",
      },
      " tr:hover": {
        backgroundColor: theme.palette.custom.backgroundLight,
      },
    },
  }));
}

export default S;
