import { Box, styled, Typography } from "@mui/material";
import { LightTheme } from "../../../utils/theme";

export namespace S {
  export const IdHeaderWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "4rem",
    justifyContent: "start",
  }));

  export const LogoImage = styled("img")(({ theme }) => ({
    height: "4.5rem",
    width: "5.5rem",
    borderRadius: "50%",
    alignSelf: "center",
  }));

  export const HeaderRight = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }));

  export const IdHeading = styled(Typography)(({ theme }) => ({
    fontSize: "1.1rem",
    fontWeight: "600",
    textAlign: "center",
    paddingTop: "1rem",
    color: LightTheme.palette.primary.light,
  }));

  export const IdSubHeading = styled(Box)(({ theme }) => ({
    fontSize: "0.8rem",
    color: LightTheme.palette.text.secondaryLight,
  }));
}

export default S;
