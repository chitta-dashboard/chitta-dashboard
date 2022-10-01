import { styled, Stack, TableCell, Typography, Box, TableRow } from "@mui/material";
import { LightTheme } from "../../../../utils/theme";

namespace S {
  export const CustomTableRow = styled(TableRow)<{ children: JSX.Element | JSX.Element[] }>(({ theme }) => ({
    cursor: "pointer",
  }));
  export const RowCheckCell = styled(TableCell)(({ theme }) => ({
    width: "7%",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: "15%",
    color: "red",
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
      "& .MuiSvgIcon-root": {
        color: theme.palette.text.primary,
      },
    },
  }));

  export const WebTableCell = styled(TableCell)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: "1.1rem",
    fontWeight: 500,
    width: "18%",
    padding: "1rem 0",
    // "&:nth-of-type(2)": {
    //   textAlign: "center",
    // },
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
    padding: "0.8rem 0",
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
      fontSize: "1rem",
      width: "100%",
      padding: "0.8rem 0",
      position: "relative",
      left: "50%",
      //Table head for Tab view
      "&::before": {
        content: `"${title}"`,
        color: theme.palette.text.primary,
        fontSize: "1rem",
        fontWeight: 600,
        position: "absolute",
        left: "-45%",
      },
    },
  }));

  export const TabIdStack = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    gap: "1rem",
  }));
  export const IdBox = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondaryLight,
  }));
  export const TitleBox = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
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

  export const AvatarImg = styled("img")(({ theme }) => ({
    width: "100%",
    height: "100%",
    borderRadius: "50%",
  }));

  export const AvatarBox = styled(Box)(({ theme }) => ({
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
    background: LightTheme.palette.custom.backgroundLight,
    borderRadius: "50%",
    opacity: "0.8",
    border: "none",
    display: "none",
    alignItems: "center",
    justifyContent: "center",
  }));

  export const EditIcon = styled("i")(({ theme }) => ({
    color: LightTheme.palette.text.primary,
    opacity: "1",
  }));
  export const HiddenInput = styled("input")(({ theme }) => ({
    display: "none",
  }));

  export const EmptyMsg = styled("tbody")(({ theme }) => ({
    position: "relative",
    "> tr > td": {
      color: theme.palette.text.secondaryLight,
      fontSize: "1.2rem",
      textAlign: "center",
      fontWeight: "500",
      padding: "2rem 0",
      position: "absolute",
      top: "50%",
      left: "47%",
      translate: "transform(-50%, -50%)",
    },
  }));
}

export default S;
