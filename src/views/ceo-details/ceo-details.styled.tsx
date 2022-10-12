import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";

namespace S {
  export const CeoDetailsContainer = styled(Box)(({ theme }: any) => ({
    width: "100%",
    maxHeight: "100%",
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    overflow: "auto",
    [theme.breakpoints.down("xl")]: {
      justifyContent: "center",
      gap: "1rem",
    },
    [theme.breakpoints.down("lg")]: {
      justifyContent: "flex-start",
      gap: "1rem",
    },
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  }));

  export const CeoDetailCard = styled(Box)(({ theme }: any) => ({
    backgroundColor: theme.palette.bg.main,
    height: "19.375rem",
    width: "46.85rem",
    borderRadius: "1.25rem",
    padding: "1.5rem 2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.down("lg")]: {
      height: "15rem",
      width: "27rem",
      padding: "1rem",
    },
  }));

  export const CeoDetailData = styled(Box)(({ theme }: any) => ({
    display: "flex",
    justifyContent: "space-between",
    height: "35%",
    [theme.breakpoints.down("lg")]: {
      height: "40%",
    },
  }));

  export const CeoDataLeft = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  });

  export const ProfilePictureBox = styled(Box)({
    borderRadius: "50%",
    height: "100%",
    width: "5rem",
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
    "&:hover > .MuiBox-root": {
      display: "flex",
    },
  });

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
    height: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  });

  export const CeoName = styled(Typography)(({ theme }: any) => ({
    fontSize: "1.3125rem",
    fontWeight: "500",
    color: theme.palette.text.primary,
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.9375rem",
    },
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
    marginTop: "0.625rem",
    color: `${theme.palette.addAlpha(theme.palette.text.secondaryLight, 0.8)}`,
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.625rem",
    },
  }));

  export const CeoInfo = styled(Typography)(({ theme }: any) => ({
    fontSize: "0.9375rem",
    fontWeight: "500",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.75rem",
    },
  }));

  export const CeoDataRight = styled(CeoDataLeft)(({ theme }: any) => ({
    justifyContent: "space-between",
    gap: "3rem",
    [theme.breakpoints.down("lg")]: {
      gap: "0.5rem",
    },
  }));

  export const CeoDetailDescription = styled(Box)(({ theme }: any) => ({
    fontSize: "1.125rem",
    height: "35%",
    overflow: "auto",
    paddingRight: "0.3125rem",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.75rem",
    },
  }));

  export const ButtonContainer = styled(Box)({
    display: "flex",
    alignSelf: "flex-end",
    gap: "2.3125rem",
  });

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
