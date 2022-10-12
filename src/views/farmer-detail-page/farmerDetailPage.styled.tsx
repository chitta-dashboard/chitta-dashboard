import { Theme, Typography, Button as MuiButton } from "@mui/material";
import { Box, styled } from "@mui/material";

export namespace S {
  export const FarmersDetailsMainContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "2.5rem",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
  });

  export const FarmersDetailsButtonContainer = styled(Box)({
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  });

  export const ButtonAlignmentBox = styled(Box)({
    display: "flex",
    gap: "1.5625rem",
  });

  export const Button = styled(MuiButton)({
    minWidth: "6.8rem",
    padding: "0.4rem 0.5rem",
  });

  export const FarmersDetailsContent = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    background: theme.palette.bg.main,
    borderRadius: "1.25rem",
    height: "calc(100% - 5rem)",
    padding: "0.625rem 5%",
  }));

  export const FarmersDetailsHeader = styled(Box)({
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    height: "11.875rem",
  });

  export const NerkathirLogo = styled("img")({
    height: "7.1875rem",
  });

  export const HeaderTextContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    color: theme.palette.text.primary,
    textAlign: "center",
  }));

  export const HeaderText1 = styled(Typography)({
    lineHeight: "1.4",
    fontFamily: "Poppins",
    fontStyle: "SemiBold",
    fontSize: "1.375rem",
    fontWeight: "600",
    marginBottom: "0.4375rem",
  });

  export const HeaderText2 = styled(HeaderText1)({
    fontSize: "1.25rem",
    fontWeight: "500",
    marginBottom: "0",
  });

  export const UserImgContainer = styled(Box)({
    height: "10rem",
    borderRadius: "1.25rem",
    overflow: "hidden",
    marginRight: "1.875rem",
    position: "relative",
    cursor: "pointer",
    img: {
      height: "100%",
      width: "100%",
    },
    "&:hover > .MuiBox-root": {
      display: "flex",
    },
  });

  export const EditBox = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    left: "0",
    background: theme.palette.bg.light,
    opacity: "0.7",
    display: "none",
    alignItems: "center",
    justifyContent: "center",
  }));

  export const EditIcon = styled("i")(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: "30px",
    opacity: "1",
  }));

  export const HiddenInput = styled("input")({
    display: "none",
  });

  export const HeaderTextBox = styled(Typography)(({ theme }) => ({
    width: "100%",
    padding: "0 6%",
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: "1.0625rem",
    fontWeight: "500",
    lineHeight: "1.2",
    color: theme.palette.text.secondary,
  }));

  export const HeaderDateBox = styled(Box)(({ theme }: { theme: Theme }) => ({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: theme.palette.text.secondary,
    borderBottom: `4px solid ${theme.palette.addAlpha(theme.palette.border.secondary, 0.1)}`,
    marginBottom: "0.1875rem",
    [theme.breakpoints.down("md")]: {
      margin: "0.3125rem 0 0.3125rem 0",
    },
  }));

  export const HeaderDateText = styled(Typography)(({ theme }) => ({
    fontFamily: "Poppins",
    fontWeight: "500",
    lineHeight: "1",
    color: theme.palette.text.secondary,
    padding: " 0.5rem 0.625rem 0.5rem 0.625rem",
  }));

  export const UserInfoContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "Calc(100% - 16.5625rem)",
    overflowY: "auto",
    marginTop: "0.625rem",
    "&::-webkit-scrollbar": {
      width: "0.4375rem",
      background: theme.palette.addAlpha(theme.palette.text.secondary, 0.1),
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.light,
      borderRadius: "1.25rem",
      height: "3.75rem",
    },
  }));

  export const UserInfoRow = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    height: "fit-content",
    padding: "0.0938rem 0",
    color: theme.palette.text.secondary,
  }));

  export const UserInfoData1 = styled(Typography)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    width: "40%",
    paddingLeft: "10%",
    fontFamily: "Poppins",
    fontSize: "1.125rem",
    fontWeight: "500",
    lineHeight: "1.6875rem",
    "&::after": {
      content: `":"`,
      display: "block",
      fontSize: "0.75rem",
      marginLeft: "0.125rem",
    },
    [theme.breakpoints.down("md")]: {
      paddingLeft: "5%",
    },
  }));

  export const UserInfoData2 = styled(Typography)(({ theme }: { theme: Theme }) => ({
    width: "40%",
    fontSize: "1.125rem",
    paddingLeft: "10%",
    [theme.breakpoints.down("md")]: {
      paddingLeft: "1%",
    },
  }));

  export const InvisibleBox = styled(Box)({
    display: "none",
  });
}
