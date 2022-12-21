import { Box, styled, Typography } from "@mui/material";

export namespace S {
  export const FarmerFormPreviewMainContainer = styled(Box)(({ theme }) => ({
    boxSizing: "border-box",
    display: "flex",
    gap: "1rem",
    width: "100%",
    height: "100%",
    [theme.breakpoints.down("lg")]: {
      flexWrap: "wrap",
      height: "fit-content",
      gap: "0",
    },
  }));

  export const InvisibleBox = styled(Box)({
    display: "none",
  });

  export const FarmerFormPreviewLeft = styled(Box)(({ theme }) => ({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "50%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: "1.25rem",
    padding: "2rem 3vw",
    textAlign: "center",
    gap: "1rem",
    [theme.breakpoints.down("lg")]: {
      width: "100%",
      height: "fit-content",
      borderRadius: "1.25rem 1.25rem 0 0",
      padding: "2.5rem 1rem",
    },
  }));

  export const FormHeading = styled(Box)({});

  export const Text1 = styled(Typography)(({ theme }) => ({
    fontSize: "1.25rem",
    fontWeight: "600",
    lineHeight: "1.7rem",
    color: theme.palette.text.primary,
  }));

  export const Text2 = styled(Typography)(({ theme }) => ({
    fontSize: "1.125rem",
    fontWeight: "500",
    lineHeight: "1.5rem",
    color: theme.palette.text.primary,
  }));

  export const FarmerImgContainer = styled(Box)({
    width: "8.9375rem",
    height: "10.25rem",
    minWidth: "8.125rem",
    minHeight: "9.375rem",
    borderRadius: "1.25rem",
    overflow: "hidden",
    cursor: "pointer",
    position: "relative",
    "&:hover > .MuiBox-root": {
      display: "flex",
    },
  });

  export const FarmerImg = styled("img")({
    height: "100%",
    width: "100%",
  });

  export const EditBox = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    left: "0",
    background: theme.palette.custom.backdrop,
    opacity: "0.7",
    display: "none",
    alignItems: "center",
    justifyContent: "center",
  }));

  export const EditIcon = styled("i")(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: "1.875rem",
    opacity: "1",
  }));

  export const HiddenInput = styled("input")({
    display: "none",
  });

  export const HeaderText = styled(Box)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: "1rem",
    fontWeight: "500",
    lineHeight: "1.4rem",
  }));

  export const CustomBackIcon = styled("span")({
    position: "absolute",
    left: "1.0625rem",
    top: "1.0625rem",
  });

  export const CustomThreeDotsIcon = styled("span")({
    position: "absolute",
    right: "1.0625rem",
    top: "1.0625rem",
  });

  export const CustomPopoverList = styled(Typography)(({ theme }) => ({
    textAlign: "center",
    padding: "0.9rem 2.2rem",
    fontWeight: "400",
    border: "0.0625rem solid",
    borderColor: theme.palette.addAlpha(theme.palette.border.secondary, 0.1),
    color: theme.palette.text.secondary,
    fontSize: "1rem",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.bg.light,
      color: theme.palette.text.secondaryDark,
    },
  }));

  export const FarmerFormPreviewRight = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    overflowX: "hidden",
    position: "relative",
    width: "50%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: "1.25rem",
    padding: "1.5rem 3vw",
    [theme.breakpoints.down("lg")]: {
      width: "100%",
      overflow: "hidden",
      height: "fit-content",
      borderRadius: "0 0 1.25rem 1.25rem",
    },
  }));

  export const AbsoluteBackgroundImage = styled(Box)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "73%",
    img: {
      height: "100%",
      width: "100%",
      borderRadius: "50%",
      opacity: "0.3",
      filter: "grayscale(100%)",
      aspectRatio: "1/1",
    },
  });

  export const UserInfoRow = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    fontSize: "1rem",
    fontWeight: "500",
    lineHeight: "1.875rem",
    color: theme.palette.text.secondary,
    zIndex: "5",
  }));

  export const UserInfoData1 = styled(Box)({
    display: "flex",
    width: "55%",
    "&::after": {
      content: `":"`,
      display: "block",
      fontSize: "0.75rem",
      marginLeft: "0.125rem",
    },
  });

  export const UserInfoData2 = styled(Box)({
    display: "flex",
    width: "45%",
  });

  export const DeleteName = styled("span")(({ theme }: any) => ({
    fontSize: "1.3125rem",
    fontWeight: "500",
    color: theme.palette.text.primary,
  }));
}
