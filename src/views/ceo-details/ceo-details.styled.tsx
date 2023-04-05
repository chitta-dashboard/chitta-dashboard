import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";

namespace S {
  export const CeoDetailsContainer = styled(Box)(({ theme }: any) => ({
    width: "100%",
    maxHeight: "fit-content",
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    [theme.breakpoints.down("xl")]: {
      gap: "1rem",
    },
    [theme.breakpoints.down("lg")]: {
      gap: "0.75rem",
    },
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  }));

  export const CeoDetailCard = styled(Box)(({ theme }: any) => ({
    display: "flex",
    gap: "1rem",
    backgroundColor: theme.palette.bg.main,
    height: "fit-content",
    minHeight: "18.85rem",
    width: "37.5rem",
    borderRadius: "1.25rem",
    padding: "1.5rem 2rem",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.down("lg")]: {
      gap: "0.75rem",
      minHeight: "13.925rem",
      width: "23.75rem",
      minWidth: "20.625rem",
      padding: "1rem",
    },
  }));

  export const CeoDetailData = styled(Box)(({ theme }: any) => ({
    display: "flex",
    justifyContent: "space-between",
    height: "6rem",
    [theme.breakpoints.down("lg")]: {
      height: "5rem",
    },
  }));

  export const CeoDataProfileContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    height: "100%",
    maxWidth: "50%",
  });

  export const ProfilePictureBox = styled(Box)(({ theme }: any) => ({
    borderRadius: "50%",
    height: "100%",
    minWidth: "6rem",
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
    "&:hover > .MuiBox-root": {
      display: "flex",
    },
    [theme.breakpoints.down("lg")]: {
      minWidth: "5rem",
    },
  }));

  export const CeoProfilePicture = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "cover",
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
    fontSize: "1.5625rem",
  }));

  export const HiddenInput = styled("input")({
    display: "none",
  });

  export const CeoData = styled(Box)({
    minHeight: "95%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  });

  export const CeoName = styled(Typography)(({ theme }: any) => ({
    fontSize: "1.3125rem",
    fontWeight: "500",
    lineHeight: "1.1",
    color: theme.palette.text.primary,
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.9375rem",
    },
  }));

  export const DeleteName = styled("span")(({ theme }: any) => ({
    fontSize: "1.3125rem",
    fontWeight: "500",
    color: theme.palette.text.primary,
  }));

  export const CeoAge = styled(Typography)(({ theme }: any) => ({
    fontSize: "1rem",
    fontWeight: "500",
    color: theme.palette.text.secondaryLight,
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.75rem",
    },
  }));

  export const CeoJoinedDate = styled(Typography)(({ theme }: any) => ({
    fontSize: "0.75rem",
    // marginTop: "0.625rem",
    color: `${theme.palette.addAlpha(theme.palette.text.secondaryLight, 0.8)}`,
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.625rem",
    },
  }));

  export const CeoInfoLeft = styled(Typography)(({ theme }: any) => ({
    fontSize: "0.9375rem",
    fontWeight: "500",
    color: theme.palette.text.secondary,
    minWidth: "5.9825rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.75rem",
      minWidth: "4.7862rem",
    },
  }));

  export const CeoInfo = styled(CeoInfoLeft)(() => ({
    width: "auto",
  }));

  export const CeoDataDetailsContainer = styled(CeoDataProfileContainer)(({ theme }: any) => ({
    justifyContent: "space-between",
    gap: "2rem",
    height: "100%",
    [theme.breakpoints.down("lg")]: {
      gap: "0.5rem",
    },
  }));

  export const CeoDetailDescription = styled(Box)(({ theme, cardexpand }: any) => ({
    fontSize: "1.125rem",
    minHeight: "6rem",
    height: cardexpand === "true" ? "6rem" : "fit-content",
    overflow: "hidden",
    paddingRight: "0.3125rem",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.75rem",
      minHeight: "4rem",
      height: cardexpand === "true" ? "4rem" : "fit-content",
    },
  }));

  export const ButtonContainer = styled(Box)({
    position: "relative",
    display: "flex",
    justifyContent: "flex-end",
    gap: "2.3125rem",
    width: "100%",
  });

  export const SeeMore = styled("span")(({ theme }: any) => ({
    position: "absolute",
    left: "0",
    bottom: "1.25rem",
    fontSize: "0.8125rem",
    cursor: "pointer",
    color: theme.palette.text.primary,
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.6875rem",
    },
  }));
  export const SeeLess = styled(Typography)(({ theme }: any) => ({
    fontSize: "0.8125rem",
    cursor: "pointer",
    color: theme.palette.text.primary,
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.6875rem",
    },
  }));

  export const CustomIconContainer = styled("i")(({ theme }: any) => ({
    color: theme.palette.text.primary,
    fontSize: "1.875rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.375rem",
    },
  }));

  export const CeoDetailAdd = styled(CeoDetailCard)({
    alignItems: "center",
    justifyContent: "center",
  });

  export const CustomButton = styled(Button)(({ theme }: any) => ({
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.bg.main,
    border: `0.0625rem dotted ${theme.palette.border.primary}`,
    borderRadius: "50%",
    height: "4.375rem",
    width: "4.375rem",
    fontSize: "1.875rem",
    "&:hover": {
      color: theme.palette.text.white,
    },
  }));
}

export default S;
