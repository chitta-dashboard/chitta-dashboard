import { Theme, Box, styled, Typography, Badge, Popover } from "@mui/material";
import { Link } from "react-router-dom";

namespace S {
  export const Header = styled(Box)(({ theme }: { theme: Theme }) => ({
    maxWidth: "100vw",
    height: "4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.palette.bg.main,
    padding: ".5rem 1.2rem",
    gap: "1rem",
  }));

  export const LogoBox = styled(Box)({
    display: "inline-flex",
    alignItems: "center",
    gap: "1rem",
  });

  export const Logo = styled("img")({
    height: "3.2rem",
    width: "3.2rem",
    cursor: "pointer",
    borderRadius: "50%",
    aspectRatio: "1/1",
  });

  export const LogoText = styled(Typography)(({ theme }: { theme: Theme }) => ({
    fontSize: "0.8rem",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: ".5px",
    color: theme.palette.text.primary,
    whiteSpace: "nowrap",
  }));

  export const NavBar = styled("nav", {
    shouldForwardProp: (prop) => prop !== "isOpen",
  })<{ isOpen: boolean }>(({ theme, isOpen }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(8, auto)",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    flexWrap: "wrap",
    backgroundColor: theme.palette.bg.main,
    [theme.breakpoints.down("lg")]: {
      gridTemplateColumns: "repeat(4, auto)",
    },
    [theme.breakpoints.down("md")]: {
      position: "absolute",
      gridTemplateColumns: "18.75rem",
      width: "unset",
      top: "0",
      right: "0",
      boxShadow: `0 5px 20px ${theme.palette.addAlpha(theme.palette.custom.shadow, 0.3)}`,
      borderTopLeftRadius: "40px",
      borderBottomLeftRadius: "40px",
      height: "100%",
      gap: "0",
      alignContent: "start",
      overflow: "hidden",
      zIndex: "10",
      transition: "transform .3s ease-out",
      transform: isOpen ? "translateX(0)" : "translateX(calc(18.75rem + 20px))",
    },
  }));

  export const NavbarSlickContainer = styled(Box)(({ theme }) => ({
    width: "calc(100vw - 25rem)",
    margin: "0 2rem",
    ".slick-slide": {
      maxWidth: "calc(278px + 1rem) !important",
      textAlign: "center",
    },
    ".slick-disabled": {
      ":before": {
        display: "none",
      },
    },
    ".slick-prev": {
      top: "27% !important",
      zIndex: "3",
      width: "13px",
      height: "13px",
      transform: "scaleX(-1)",
      borderRadius: "50%",
      ":before": {
        content: '"j"',
        fontFamily: "nerkathir-icon",
        color: theme.palette.text.secondaryLight,
        fontSize: "13px",
      },
    },
    ".slick-next": {
      width: "13px",
      height: "13px",
      borderRadius: "50%",
      zIndex: "3",
      ":before": {
        content: '"j"',
        fontFamily: "nerkathir-icon",
        color: theme.palette.text.secondaryLight,
        fontSize: "13px",
      },
    },
  }));

  export const NavLink = styled(Link, {
    shouldForwardProp: (prop) => prop !== "isActive",
  })<{ isActive: boolean }>(({ theme, isActive }) => ({
    position: "relative",
    width: "fit-content !important",
    textDecoration: "none",
    [theme.breakpoints.down("md")]: {
      padding: "1rem 1rem 1rem 2rem",
      width: "100% !important",
      "&::after": {
        content: "''",
        width: "100% !important",
        height: "100%",
        position: "absolute",
        top: "0",
        left: "0",
        transform: isActive ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "right",
        transition: "transform .3s ease-out",
        backgroundColor: theme.palette.bg.light,
      },
      "&:hover::after": {
        transform: "scaleX(1)",
      },
    },
    "&:hover .MuiTypography-root": isActive
      ? {}
      : {
          color: theme.palette.text.primary,
          "&::after": {
            transform: "scaleX(.6)",
          },
        },
  }));

  export const NavLinkText = styled(Typography, {
    shouldForwardProp: (prop) => prop !== "isActive",
  })<{ isActive: boolean }>(({ theme, isActive }) => ({
    color: isActive ? theme.palette.text.primary : theme.palette.text.secondaryLight,
    whiteSpace: "nowrap",
    width: "max-content",
    position: "relative",
    fontSize: ".77rem",
    zIndex: "1",
    "&::after": {
      content: "''",
      backgroundColor: theme.palette.warning.main,
      width: "100%",
      height: "4px",
      position: "absolute",
      borderRadius: "50px",
      bottom: "0",
      left: "0",
      transform: isActive ? "scaleX(.6)" : "scaleX(0)",
      transformOrigin: "left",
      transition: "transform .3s ease-out",
    },
  }));

  export const ActionsBox = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    color: theme.palette.text.secondaryLight,
    fontSize: "1.6rem",
    i: {
      cursor: "pointer",
    },
  }));

  export const webIcon = styled("i")(({ theme }) => ({
    fontSize: "1rem",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  export const TabIcon = styled("i")(({ theme }) => ({
    fontSize: "1rem",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  }));

  export const MenuIcon = styled("i")(({ theme }) => ({
    fontSize: "1rem",
  }));

  export const NavBarMenu = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: theme.palette.bg.dark,
    padding: "1.5rem 1.5rem 1.2rem 2rem",
    color: theme.palette.text.primaryDark,
    marginBottom: "2rem",
    fontWeight: "600",
    fontSize: "1.2rem",
    i: {
      fontSize: "1.6rem",
      cursor: "pointer",
    },
  }));

  export const NotificationBadge = styled(Badge)(({ theme }: { theme: Theme }) => ({
    fontSize: "0.9rem",
    cursor: "pointer",
    "& .MuiBadge-badge": {
      right: -2,
      top: 1,
      fontSize: "0.6rem",
      border: `3px solid ${theme.palette.background.paper}`,
      padding: "1px 1px",
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.text.white,
    },
    i: {
      fontSize: "1rem",
    },
  }));

  export const Pop = styled(Popover)(({ theme }) => ({
    margin: "0.6rem -0.6rem",
  }));

  export const Items = styled(Typography)(({ theme }) => ({
    textAlign: "center",
    padding: "0.6rem 2rem",
    borderBottom: `0.1rem solid ${theme.palette.addAlpha(theme.palette.border.secondary, 0.1)}`,
    color: theme.palette.text.secondaryLight,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.bg.light,
      color: theme.palette.text.secondaryDark,
    },
  }));
}

export default S;
