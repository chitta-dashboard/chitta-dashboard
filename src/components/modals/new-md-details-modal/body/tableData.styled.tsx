import { Box, Grid, Typography, Checkbox, styled } from "@mui/material";

namespace S {
  export const MdDetailsTableContainer = styled(Box)({
    width: "100%",
    height: "100%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center !important",
    justifyContent: "center !important",
  });

  export const MdDetailsTableHeadContainer = styled(Grid)(({ theme }) => ({
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 3fr 2fr",
    alignItems: "center",
    backgroundColor: theme.palette.bg.light,
    padding: "10px calc(10px + 0.8%)",
    p: {
      fontWeight: "600",
    },
    ".MuiButtonBase-root": {
      "&:hover": {
        backgroundColor: "transparent !important",
      },
    },
    span: {
      "&:active": {
        backgroundColor: "transparent !important",
      },
    },
  }));

  export const MdDetailsTableBodyWrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start !important",
    width: "98%",
    height: "400px",
    overflowY: "auto",
  });

  export const MdDetailsTableBodyContainer = styled(Grid)(({ theme }) => ({
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 3fr 2fr",
    alignItems: "center",
    padding: "10px",
    borderBottom: `2px solid ${theme.palette.addAlpha(theme.palette.border.secondary, 0.1)}`,
    p: {
      color: theme.palette.text.secondaryLight,
      fontWeight: "500",
    },
    ".MuiButtonBase-root": {
      "&:hover": {
        backgroundColor: "transparent !important",
      },
    },
    span: {
      "&:active": {
        backgroundColor: "transparent !important",
      },
    },
  }));

  export const MdDetailsTableCheckBox = styled(Checkbox)(({ theme }) => ({
    span: {
      "&:hover": {
        backgroundColor: "transparent !important",
      },
    },
    ".MuiSvgIcon-root": {
      color: theme.palette.text.primary,
      ".MuiCheckbox-root": {
        "&:hover": {
          backgroundColor: "transparent !important",
        },
      },
      span: {
        "&:hover": {
          backgroundColor: "transparent !important",
        },
      },
      "&:hover": {
        backgroundColor: "transparent !important",
      },
    },
  }));

  export const MdDetailsTableHeadTitle = styled(Typography)({
    display: "grid",
  });

  export const MdDetailsTableProfileImg = styled("img")({
    width: "2rem",
    height: "2rem",
    borderRadius: "50%",
  });

  export const MdDetailsTableBodyNameContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start !important",
    p: {
      marginLeft: "0.5rem",
    },
  });
}

export default S;
