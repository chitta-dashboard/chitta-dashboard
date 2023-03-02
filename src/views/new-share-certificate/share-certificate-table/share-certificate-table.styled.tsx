import { Box, styled, Typography, TableBody, TableRow, TableCell, Table, TableContainer, TableHead } from "@mui/material";

export namespace S {
  export const ShareCertificateTable = styled(Box)(({ theme }) => ({
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "1104px",
    minHeight: "1562px",
    maxHeight: "1562px",
    backgroundColor: theme.palette.bg.main,
    overflow: "hidden",
    padding: "1.875rem 1.25rem",
  }));

  export const CertificateMainContent = styled(Box)(({ theme }) => ({
    border: `5px solid ${theme.palette.border.primary}`,
    minHeight: "1129.67px",
    maxHeight: "1129.67px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "10px 5px",
  }));

  export const CertificateTitle = styled(Typography)(({ theme }) => ({
    fontSize: "24px",
    fontWeight: "600",
    padding: "40px 0 30px",
    color: theme.palette.text.red,
  }));

  export const CustomTableContainer = styled(TableContainer)(() => ({}));

  export const CustomTable = styled(Table)(() => ({}));

  export const CustomTableHead = styled(TableHead)(() => ({}));

  export const CustomTableRow = styled(TableRow)(() => ({}));

  export const CustomTableBody = styled(TableBody)(() => ({}));

  export const CustomTableHeadCell = styled(TableCell)(({ theme }) => ({
    border: "1px solid #2D2C31",
    color: theme.palette.text.red,
    fontSize: "24px",
    fontWeight: "600",
    textAlign: "center",
    padding: "0",
    height: "70px",
    lineHeight: "1.2",
  }));

  export const CustomTableBodyCell = styled(TableCell)(() => ({
    border: "1px solid #2D2C31",
    color: "#112f5c",
    fontSize: "22px",
    fontWeight: "600",
    textAlign: "center",
    padding: "0",
    height: "70px",
  }));
}
