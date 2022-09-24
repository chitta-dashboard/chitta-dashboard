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
    height: "calc(100% - 11.5rem)",
    border: 0,
    borderCollapse: "collapse",
    position: "relative",

    [theme.breakpoints.down("md")]: {
      height: "calc(100% - 11rem)",
    },

    "& thead,& tbody,& tr,& tfoot,& th,& td,& div": {
      border: 0,
      borderCollapse: "collapse",
    },

    "& thead ,& tbody,& tfoot ,& tr": {
      display: "table",
      width: "100%",
      tableLayout: "fixed",
    },
    "& thead": {
      tableLayout: "fixed",
      display: "block",
      backgroundColor: theme.palette.custom.backgroundDark,
      [theme.breakpoints.up("md")]: {
        padding: "0 1%",
      },
    },
    "& tbody": {
      height: "100%",
      tableLayout: "fixed",
      display: "block",
      overflowY: "auto",
      overflowX: "hidden",
      [theme.breakpoints.up("md")]: {
        padding: "0 1%",
      },
      " tr:hover": {
        backgroundColor: theme.palette.custom.backgroundLight,
      },
    },
  }));
}

export default S;
