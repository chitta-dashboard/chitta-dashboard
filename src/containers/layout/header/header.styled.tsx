import { Theme } from "@mui/material";
import { Box, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
export namespace S {
  export const Header = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: "1rem 1.5rem",
    gap: "2.5rem",
  }));

  export const LogoBox = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: '1.5rem'
  }));

  export const Logo = styled("img")(({ theme }: { theme: Theme }) => ({
    height: "5rem",
    width: "5rem",
  }));

  export const LogoText = styled(Typography)(({ theme }: { theme: Theme }) => ({
    fontSize: "1rem",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: ".5px",
    color: theme.palette.text.primary,
    whiteSpace: "nowrap",
  }));

  export const NavBar = styled("nav")(({ theme }: { theme: Theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    gap: "1.5rem",
  }));

  // const ModifiedNavItem: LinkProps extends {isActive: boolean} = ()
  export const NavItem = styled(Link)(({ theme, isActive }: { theme: Theme; isActive: boolean }) => ({
    color: isActive ? theme.palette.text.primary : theme.palette.text.secondary,
    textDecoration: "none",
    whiteSpace: "nowrap",
    position: "relative",

    "&::after": {
      content: "''",
      backgroundColor: theme.palette.warning.main,
      width: "100%",
      height: "3px",
      position: "absolute",
      borderRadius: "50px",
      bottom: "0",
      left: "0",
      transform: isActive ? "scaleX(.6)" : "scaleX(0)",
      transformOrigin: "left",
      transition: "transform .2s ease-out",
    },

    "&:hover": isActive
      ? {}
      : {
          color: theme.palette.text.primary,
          "&::after": {
            transform: "scaleX(.6)",
          },
        },
  }));

  export const ActionsBox = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  }));
}
