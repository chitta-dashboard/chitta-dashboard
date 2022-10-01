import { styled, Stack, TableCell, Typography, Box, TableRow } from "@mui/material";

namespace S {
  export const CustomTableRow = styled(TableRow)<{ children: JSX.Element | JSX.Element[] }>(() => ({
    cursor: "pointer",
  }));

  export const RowCheckCell = styled(TableCell)(({ theme }) => ({
    width: "7%",
    padding: "1rem 0",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  export const TabCheckboxStack = styled(Stack)(() => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: "15%",
  }));

  export const TabCell = styled(TableCell)(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    [theme.breakpoints.down("md")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  }));

  export const WebTableCell = styled(TableCell)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: "1.1rem",
    fontWeight: 500,
    width: "18%",

    "&:last-of-type": {
      width: "20%",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  export const Cell = styled(TableCell)<{ title: string }>(({ theme, title }) => ({
    width: "18%",
    [theme.breakpoints.up("md")]: {
      "&:nth-of-type(5)": {
        display: "none",
      },
      "&:nth-of-type(7)": {
        width: "28%",
      },
    },

    [theme.breakpoints.down("md")]: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      position: "relative",
      left: "50%",

      //Table head for Tab view
      "&::before": {
        content: `"${title}"`,
        position: "absolute",
        left: "-45%",
      },
    },
  }));

  export const TabIdStack = styled(Stack)(() => ({
    flexDirection: "row",
    gap: "1rem",
  }));

  export const NameStack = styled(Stack)(() => ({
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

  export const AvatarImg = styled("img")(() => ({
    width: "100%",
    height: "100%",
    borderRadius: "50%",
  }));

  export const AvatarBox = styled(Box)(() => ({
    borderRadius: "50%",
    height: "2.5rem",
    width: "2.5rem",
    position: "relative",
    cursor: "pointer",

    "&:hover > .MuiBox-root": {
      display: "flex",
    },
  }));

  export const EditBox = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    left: "0",
    background: theme.palette.custom.backgroundLight,
    borderRadius: "50%",
    opacity: "0.8",
    border: "none",
    display: "none",
    alignItems: "center",
    justifyContent: "center",
  }));

  export const EditIcon = styled("i")(({ theme }) => ({
    color: theme.palette.text.primary,
    opacity: "1",
  }));
  export const HiddenInput = styled("input")(() => ({
    display: "none",
  }));

  export const EmptyMsg = styled("tbody")(({ theme }) => ({
    position: "relative",
    "> tr > td": {
      color: theme.palette.text.secondaryLight,
      fontSize: "1.2rem",
      textAlign: "center",
      fontWeight: "500",
      padding: "3rem 0",
      translate: "transform(-50%, -50%)",
    },
  }));
}

export default S;
