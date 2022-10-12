import { styled, Stack, Box, Typography } from "@mui/material";

namespace S {
  export const ContainerStack = styled(Stack)({
    gap: "1rem",
    width: "100%",
    paddingTop: "1rem",
  });

  export const LogoText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondaryLight,
    fontSize: "1.125rem",
    lineHeight: "1.688rem",
  }));

  export const UploadStack = styled(Stack)({
    gap: "2.5rem",
    width: "100%",
    flexDirection: "row",
    alignItems: "end",
    justifyContent: "space-between",
  });

  export const LogoStack = styled(Box)({
    display: "flex",
    alignItems: "end",
    width: "100%",
    gap: "2rem",
  });

  export const logoImage = styled("img")<{ isColor: boolean }>(({ isColor }) => ({
    filter: isColor ? "grayscale(100%)" : "",
    objectFit: "contain",
    width: "100%",
    height: "100%",
  }));
}

export default S;
