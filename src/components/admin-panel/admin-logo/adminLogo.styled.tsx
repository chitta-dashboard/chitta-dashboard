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
    gap: "1rem",
    width: "100%",
    flexDirection: "row",
    alignItems: "end",
    justifyContent: "space-between",
  }));

  export const LogoStack = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "end",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    gap: "1rem",
    [theme.breakpoints.down("xl")]: {
      display: "grid",
      gridTemplateColumns: "auto auto",
      justifyContent: "start",
    },
  }));

  export const logoImage = styled("img")<{ isColor: boolean }>(({ theme, isColor }) => ({
    filter: isColor ? "grayscale(100%)" : "",
  }));
}

export default S;
