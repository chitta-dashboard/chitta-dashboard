import { styled, Stack, TableCell, Typography, TableRow } from "@mui/material";

namespace S {
  export const CustomTableRow = styled(TableRow)(({ theme }) => ({
    cursor: 'pointer',
  }));
  export const RowCheckCell = styled(TableCell)(({ theme }) => ({
    width: "6%",
    padding: "1rem 0",
    textAlign: "center",
    "& .MuiSvgIcon-root": {
      color: theme.palette.text.primaryDark,
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  export const TabCheckboxStack = styled(Stack)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: "15%",
    "& .MuiSvgIcon-root": {
      color: theme.palette.text.primary,
    },
  }));

  export const TabCell = styled(TableCell)(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    [theme.breakpoints.down("md")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: "1rem",
      padding: "0 2rem",
      paddingTop: "1rem",
    },
  }));

  export const WebTableCell = styled(TableCell)(({ theme }) => ({
    textAlign: "center",
    color: theme.palette.text.secondary,
    fontSize: "1.1rem",
    fontWeight: 500,
    width: "18%",
    padding: "1rem 0",

    "&:nth-of-type(2)": {
      width: "6%",
      textAlign: "center",
    },
    "&:last-of-type": {
      width: "20%",
    },

    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  export const Cell = styled(TableCell)<{ title: string }>(({ theme, title }) => ({
    color: theme.palette.text.secondary,
    fontSize: "1.1rem",
    fontWeight: 500,
    borderBottom: "1rem solid red",
    width: "18%",
    padding: "1rem 0",
    [theme.breakpoints.up("md")]: {
      "&:nth-of-type(6)": {
        width: "28%",
      },
    },

    [theme.breakpoints.down("md")]: {
      display: "flex",
      alignItems: "center",
      fontSize: "1rem",
      width: "100%",
      padding: "1rem 0",
      position: "relative",
      left: "50%",

      //Create Table head for Tab view
      "&::before": {
        content: `"${title}"`,
        color: theme.palette.text.primary,
        fontSize: "1rem",
        fontWeight: 600,
        position: "absolute",
        left: "-43%",
      },
    },
  }));

  export const TabIdStack = styled(Stack)(({ theme }) => ({
    diplay: "flex",
    flexDirection: "row",
    gap: "1rem",
  }));
  export const IdBox = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondaryLight,
  }));

  export const NameStack = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    gap: "1rem",
    alignItems: "center",
  }));

  export const IconBox = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));
}

export default S;
