import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { LightTheme } from "../../../utils/theme";

export namespace S {
  export const DashboardHeaderWrapper = styled(Box)(({ theme }: any) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  }));

  export const ProfileBox = styled(Box)(({ theme }: any) => ({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    width: "50%",
  }));

  export const ProfileHeading = styled(Typography)(({ theme }: any) => ({
    color: LightTheme.palette.text.secondaryDark,
    letterSpacing: "0.05rem",
    fontSize: "1.4rem",
    fontWeight: "600",
  }));

  export const ProfileSubHeading = styled(Typography)(({ theme }: any) => ({
    color: LightTheme.palette.text.secondary,
    fontWeight: "500",
    fontSize: "1rem"
  }));

  export const HeaderIconsBox = styled(Box)(({ theme }: any) => ({
    width: "50%",
    marginLeft: "2rem",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "1.5rem",
  }));

  export const IconContainer = styled(Box)(({ theme }: any) => ({
    height: "2rem",
    width: "2rem",
    borderRadius: "50%",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  }));

  export const ImgContainer = styled(Box)(({ theme }: any) => ({
    height: "4.5rem",
    width: "4.5rem",
    borderRadius: "50%",
  }));

  export const DshboardImg = styled("img")(({ theme }: any) => ({
    height: "100%",
    width: "100%",
    borderRadius: "50%",
  }));

  export const SearchIconContainer = styled(Box)(({ theme }: any) => ({
    [theme.breakpoints.down("md")]: {
      display: "flex",
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  }));

  export const SearchBarContainer = styled(Box)(({ theme }: any) => ({
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
    [theme.breakpoints.down("lg")]: {
      width: "100%",
    },
    [theme.breakpoints.up("xl")]: {
      marginLeft: "22rem",
    },
  }));
}

export default S;
