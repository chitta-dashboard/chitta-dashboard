import { styled, Stack, Box, Typography, FormHelperText } from "@mui/material";

namespace S {
  export const ContainerStack = styled(Stack)({
    gap: "1rem",
    width: "100%",
    paddingTop: "1rem",
  });

  export const ErrorText = styled(FormHelperText)(({ theme }) => ({
    color: theme.palette.text.red,
    textAlign: "left",
    padding: "0.4rem 0rem",
    margin: "0%",
    fontSize: "0.75rem",
    lineHeight: "1.125rem",
    fontWeight: "400",
  }));

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
    width: "100%",
    height: "100%",
    aspectRatio: "1/1",
  }));
}

export default S;
