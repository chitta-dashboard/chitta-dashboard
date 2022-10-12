import { Box, Typography, styled } from "@mui/material";

export namespace S {
  export const DashboardHeaderWrapper = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  });

  export const ProfileBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    width: "50%",
  });

  export const ProfileHeading = styled(Typography)(({ theme }: any) => ({
    color: theme.palette.text.secondaryDark,
    letterSpacing: "0.05rem",
    fontSize: "1.4rem",
    fontWeight: "600",
  }));

  export const ProfileSubHeading = styled(Typography)(({ theme }: any) => ({
    color: theme.palette.text.secondary,
    fontWeight: "500",
    fontSize: "1rem",
  }));

  export const HeaderIconsBox = styled(Box)({
    width: "50%",
    marginLeft: "2rem",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "1.5rem",
  });

  export const IconContainer = styled(Box)(({ theme }) => ({
    height: "2rem",
    width: "2rem",
    borderRadius: "50%",
    backgroundColor: theme.palette.bg.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  }));

  export const ImgContainer = styled(Box)({
    height: "4.5rem",
    width: "4.5rem",
    borderRadius: "50%",
    position: "relative",
    cursor: "pointer",
    "&:hover > .MuiBox-root": {
      display: "flex",
    },
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
  }));

  export const HiddenInput = styled("input")({
    display: "none",
  });

  export const DshboardImg = styled("img")({
    height: "100%",
    width: "100%",
    borderRadius: "50%",
  });

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
