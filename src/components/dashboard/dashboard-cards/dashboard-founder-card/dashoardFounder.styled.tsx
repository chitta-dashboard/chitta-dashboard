import { Box, Grid, Typography, styled } from "@mui/material";

export namespace S {
  export const FounderWrapper = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    backgroundColor: theme.palette.bg.main,
    boxShadow: `0px 4px 10px ${theme.palette.addAlpha(theme.palette.custom.shadow, 0.1)}`,
    borderRadius: "1.25rem",
    [theme.breakpoints.up("xl")]: {
      minHeight: "15vh",
      padding: "2.5rem",
    },
    [theme.breakpoints.down("lg")]: {
      minHeight: "340px",
    },
    ".slick-prev": {
      top: "98%",
      left: "25%",
      zIndex: "3",
      width: "35px",
      height: "35px",
      transform: "rotate(-180deg)",
      background: theme.palette.bg.main,
      borderRadius: "50%",
      boxShadow: `0px 4px 10px ${theme.palette.addAlpha(theme.palette.custom.shadow, 0.1)}`,
      ":before": {
        content: '"j"',
        fontFamily: "nerkathir-icon",
        color: theme.palette.text.primary,
        fontSize: "20px",
      },
    },
    ".slick-next": {
      top: "105%",
      right: "25%",
      width: "35px",
      height: "35px",
      zIndex: "3",
      background: theme.palette.bg.main,
      borderRadius: "50%",
      boxShadow: `0px 4px 10px ${theme.palette.addAlpha(theme.palette.custom.shadow, 0.1)}`,
      ":before": {
        content: '"j"',
        fontFamily: "nerkathir-icon",
        color: theme.palette.text.primary,
        fontSize: "20px",
      },
    },
    a: {
      textDecoration: "none",
      color: theme.palette.text.primary,
    },
    ".slick-dots": {
      bottom: "-20px",
      button: {
        "&:before": {
          fontSize: "10px",
        },
      },
      ".slick-active": {
        button: {
          "&:before": {
            color: theme.palette.text.primary,
          },
        },
      },
    },
  }));

  export const SliderDotUl = styled("ul")({
    margin: "0px",
  });

  export const FounderCard = styled(Box)(({ theme }) => ({
    width: "100% !important",
    height: "250px !important",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    background: theme.palette.bg.main,
    borderRadius: "1.25rem",
    padding: "1rem 0.2rem",
    [theme.breakpoints.down("lg")]: {
      margin: "0 auto",
    },
  }));

  export const FounderCardContainer = styled(Box)(({ theme }) => ({
    width: "calc(100% - 10rem)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    background: theme.palette.bg.main,
    borderRadius: "1.25rem",
    paddingLeft: "2rem",
    [theme.breakpoints.down("lg")]: {
      margin: "0 auto",
    },
  }));

  export const FounderCardHeader = styled(Box)(() => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "1rem",
    paddingBottom: "1rem",
  }));

  export const FounderCardHeaderRight = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid",
    borderColor: theme.palette.addAlpha(theme.palette.border.secondary, 0.1),
  }));

  export const FounderImgContainer = styled(Box)({
    width: "10rem",
    height: "10rem",
    borderRadius: "50%",
    float: "left",
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",

    "&:hover > .MuiBox-root": {
      display: "flex",
    },
  });

  export const FounderImg = styled("img")({
    width: "100%",
    height: "100%",
  });

  export const EditBox = styled(Box)(({ theme }: any) => ({
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    left: "0",
    background: theme.palette.bg.light,
    borderRadius: "50%",
    opacity: "0.8",
    border: "none",
    display: "none",
    alignItems: "center",
    justifyContent: "center",
  }));

  export const EditIcon = styled("i")(({ theme }: any) => ({
    color: theme.palette.text.primary,
    opacity: "1",
    fontSize: "1.5625rem",
  }));

  export const HiddenInput = styled("input")({
    display: "none",
  });

  export const FounderCardHeaderDetails = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    paddingTop: "0.5rem",
    flex: "1.7",
  });

  export const FounderName = styled(Typography)(({ theme }) => ({
    fontSize: "1.2rem",
    fontWeight: "500",
    color: theme.palette.text.primary,
    whiteSpace: "nowrap",
  }));

  export const FounderAge = styled(Typography)(({ theme }) => ({
    fontSize: "1.1rem",
    fontWeight: "500",
    color: theme.palette.text.secondaryLight,
  }));

  export const FounderJoinDate = styled(Typography)(({ theme }) => ({
    fontSize: "0.8rem",
    fontWeight: "500",
    opacity: "0.8",
    color: theme.palette.text.secondaryLight,
  }));

  export const FounderCardBody = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    width: "12rem",
    color: theme.palette.text.secondary,
    div: {
      flex: "1 !important",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
    },
    "div:nth-of-type(1)": {
      alignItems: "flex-start",
    },
  }));

  export const FounderCardBodyLeft = styled(Typography)({
    fontSize: "0.9rem",
    fontWeight: "500",
    margin: "0.3rem 0",
  });

  export const FounderCardDescContainer = styled(Box)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textAlign: "justify",
    p: {
      WebkitBoxOrient: "vertical",
      WebkiLineClamp: "3",
    },
  }));
}

export default S;
