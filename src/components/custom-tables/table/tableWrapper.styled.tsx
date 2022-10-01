import { TableContainer, styled, Table } from "@mui/material";

namespace S {
  export const TableContainerBox = styled(TableContainer)(({ theme }) => ({
    backgroundColor: "white",
    borderRadius: "2rem",
    overflow: "hidden",
  }));

  export const TableBox = styled(Table)(({ theme }) => ({
    height: "100%",
    display: "grid",
    gridTemplateRows: "auto 1fr auto",

    "& thead,& tbody,& tr,& tfoot,& th,& td,& div": {
      border: 0,
      borderCollapse: "collapse",
    },

    "& thead": {
      display: "block",
      tableLayout: "fixed",
      backgroundColor: theme.palette.custom.backgroundDark,
      // background

      "& th": {
        backgroundColor: theme.palette.custom.backgroundDark,
        color: theme.palette.text.primaryDark,
        fontSize: "1.1rem",
        fontWeight: 600,
        padding: "1.5rem 0",

        [theme.breakpoints.down("md")]: {
          alignItems: "center",
          padding: "1.25rem 2rem",
        },
      },

      //Checkbox icon color
      "& .MuiSvgIcon-root": {
        color: theme.palette.text.primaryDark,
      },

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
    },

    // "& thead ,& tbody,& tfoot ,
    "& tr": {
      width: "100%",
      display: "table",
      tableLayout: "fixed",
    },

    "& tfoot": {
      padding: 0,
      "& td": {
        padding: "1.25rem 2rem",
      },
    },
  }));
}

export default S;
