import { Box, styled, Typography } from "@mui/material";
import { LightTheme } from "../../../utils/theme";

export namespace S {
  export const IdHeaderWrapper = styled(Box)(({ theme }) => ({
    height: "5.5rem",
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "2.5rem",
  }));

  export const LogoImage = styled("img")(({ theme }) => ({
    height: "4.5rem",
    width: "5.5rem",
    margin: "-0.2rem 0 0 0.6rem",
    borderRadius: "50%",
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
