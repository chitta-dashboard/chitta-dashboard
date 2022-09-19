import { Box, Typography } from "@mui/material";
import { Theme, styled } from "@mui/material";

export namespace S {
  export const Footer = styled(Box)(({ theme }) => ({
    padding: ".5rem 1rem",
    backgroundColor: "white",
    color: theme.palette.text.secondaryLight,
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
  }));

  export const InfoBar = styled(Box)(({theme}) => ({
    display: "flex",
    gap: "1rem",
  }))

  export const InfoText = styled(Typography)(({theme}) => ({
    fontSize: ".8rem",
    textTransform: "uppercase",
    cursor: "pointer",

    "&:hover": {
      color: theme.palette.text.secondaryLight
    }
  }))

  export const ArticleBar = styled(Box)(({theme}) => ({
    display: "flex",
    gap: "1.5rem",
  }))

  export const ArticleText = styled(Typography)(({theme}) => ({
    fontSize: ".8rem",
    cursor: "pointer",

    "&:hover": {
      color: theme.palette.text.secondaryLight
    }
  }))
}
