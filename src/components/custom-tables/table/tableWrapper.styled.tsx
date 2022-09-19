import { TableContainer, Paper, styled, Table } from "@mui/material";

namespace S {
  export const PaperBox = styled(Paper)(({ theme }) => ({
    height: "85%",
    margin: "2rem 0",
    borderRadius: "2rem",
    overflow: "hidden",
  }));

  export const TableContainerBox = styled(TableContainer)(({ theme }) => ({
    height: "100%",
  }));

  export const TableBox = styled(Table)(({ theme }) => ({
    backgroundColor: "white",
    border: 0,
    "& thead,& tbody,& tfoot,& tr,& th,& td,& div": {
      border: 0,
      borderCollapse: "collapse",
    },
  }));
}

export default S;
