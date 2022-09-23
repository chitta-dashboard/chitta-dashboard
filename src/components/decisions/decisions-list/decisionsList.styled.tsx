import { Box, Button, IconButton, styled, Typography } from "@mui/material";

namespace S {
  export const MasterContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    padding: "0 2.5rem",
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    justifyContent: "center",
    gap: "90px",

    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "auto 1fr",
      padding: "0 4rem",
    },
  }));

  export const LeftContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "3.5rem",
    margin: "5.5rem 0 2rem 0",
  }));

  export const RightContainer = styled(LeftContainer)(({ theme }) => ({
    margin: "3rem 0 2rem 0",
  }));

  export const LContent = styled(Box)(({ theme }) => ({
    border: "2px solid #E7E59A",
    borderRadius: "0 40px 0 40px",
    padding: "1.2rem",
    width: "100%",
    position: "relative",

    img: {
      position: "absolute",
      top: "0",
      right: "-90px",
    },

    "&::after": {
      content: "''",
      width: "18px",
      height: "14px",
      backgroundColor: theme.palette.primary.light,
      position: "absolute",
      top: "-4px",
      right: "-102px",
      borderRadius: "0 20px",
      transform: "matrix(-0.71, 0.73, -0.69, -0.71, 0, 0) rotate(40deg)",
      zIndex: "1",
    },
  }));

  export const RContent = styled(LContent)(({ theme }) => ({
    borderRadius: "40px 0 40px 0",

    img: {
      right: "unset",
      left: "-90px",
    },

    "&::after": {
      right: "unset",
      left: "-102px",
      transform: "matrix(-0.71, 0.73, -0.69, -0.71, 0, 0) rotate(-10deg)",
    },
  }));

  export const Divider = styled("span")(({ theme }) => ({
    display: "inline-block",
    height: "1",
    backgroundColor: "#E7E59A",
    width: "2px",
    position: "relative",

    "&::before": {
      content: "''",
      backgroundColor: theme.palette.primary.light,
      position: "absolute",
      width: "40px",
      height: "30px",
      top: "-20px",
      left: "-40px",
      borderRadius: "0px 40px",
      transform: "matrix(0.71, 0.71, 0.71, -0.71, 0, 0) rotate(-15deg)",
    },

    "&::after": {
      content: "''",
      width: "25px",
      height: "18px",
      backgroundColor: theme.palette.primary.light,
      position: "absolute",
      top: "-10px",
      right: "-25px",
      borderRadius: "0 20px",
      transform: "matrix(-0.71, 0.73, -0.69, -0.71, 0, 0)",
    },
  }));

  export const ContentHeader = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: ".8rem",
    marginBottom: ".3rem",
    alignItems: "center",
  }));

  export const ContentTitle = styled(Typography)(({ theme }) => ({
    fontSize: ".9rem",
    color: theme.palette.text.primaryLight,
    fontWeight: "600",
    whiteSpace: "nowrap",
  }));

  export const ContentSubtitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondaryLight,
    fontSize: ".8rem",
    fontWeight: "500",
    marginBottom: "8px",
  }));

  export const ContentBodyText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondaryExtraLight,
    fontSize: ".8rem",
    [theme.breakpoints.down("md")]: {
      // maxWidth: "200px",
      // overflow: "hidden",
      // textOverflow: "ellipsis",
      // whiteSpace: "nowrap",
    },
  }));

  export const ContentTimeStamp = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondaryExtraLight,
    position: "absolute",
    fontSize: ".8rem",
    top: "-28px",
    right: "10px",
  }));

  export const ContentViewBtn = styled(Button)(({ theme }) => ({
    padding: ".2rem 2rem",
    fontSize: ".7rem",
    marginLeft: "auto",
  }));

  export const ContentDownloadBtn = styled(IconButton)(({ theme }) => ({
    width: "1.7rem",
    height: "1.7rem",
    fontSize: "1rem",
    color: "white",
    "&.MuiButtonBase-root": {
      backgroundColor: theme.palette.primary.light,
      "&:hover": {
        backgroundColor: "#57ab5b",
      },
    },
  }));
}

export default S;
