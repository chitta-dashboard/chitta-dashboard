import { styled, Stack, Box, Typography } from "@mui/material";

namespace S {
  export const ContainerStack = styled(Stack)(({ theme }) => ({
    gap: "1rem",
    width: "100%",
    paddingTop: "1rem",
  }));
  export const LogoText = styled(Typography)(({ theme }) => ({
    color: "rgba(119, 119, 119, 1)",
    fontSize: "1.125rem",
    lineHeight: "1.688rem",
  }));
  export const UploadStack = styled(Stack)(({ theme }) => ({
    gap: "2.5rem",
    width: "100%",
    flexDirection: "row",
    alignItems: "end",
    justifyContent: "space-between",

    [theme.breakpoints.down("xl")]: {
      flexWrap: "wrap",
    },
  }));

  export const LogoStack = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "end",
    flexWrap: "wrap",
    // justifyContent: "space-between",
    width: "100%",
    gap: "2.5rem",

    [theme.breakpoints.down("xl")]: {
      justifyContent: "center",
    },
  }));

  export const logoImage = styled("img")<{ isColor: boolean }>(({ theme, isColor }) => ({
    filter: isColor ? "grayscale(100%)" : "",
  }));
}

export default S;
