import { Theme, Typography, Button as MuiButton } from "@mui/material";
import { Box, styled } from "@mui/material";

export namespace S {
  export const FarmersDetailsMainContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "2.5rem",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
  }));
  export const FarmersDetailsButtonContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  }));
  export const ButtonAlignmentBox = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    gap: "1.5625rem",
  }));
  export const Button = styled(MuiButton)(({ theme }: { theme: Theme }) => ({
    minWidth: "6.8rem",
    padding: "0.4rem 0.5rem",
  }));
  export const FarmersDetailsContent = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    background: "#FFFFFF",
    borderRadius: "1.25rem",
    height: "calc(100% - 5rem)",
    padding: "0.625rem 5%",
  }));
  export const FarmersDetailsHeader = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    height: "11.875rem",
  }));
  export const NerkathirLogo = styled("img")(({ theme }: { theme: Theme }) => ({
    height: "7.1875rem",
  }));
  export const HeaderTextContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    color: theme.palette.text.primary,
    textAlign: "center",
  }));
  export const HeaderText1 = styled(Typography)(({ theme }: { theme: Theme }) => ({
    lineHeight: "1.4",
    fontFamily: "Poppins",
    fontStyle: "SemiBold",
    fontSize: "1.375rem",
    fontWeight: "600",
    marginBottom: "0.4375rem",
  }));
  export const HeaderText2 = styled(HeaderText1)(({ theme }: { theme: Theme }) => ({
    fontSize: "1.25rem",
    fontWeight: "500",
    marginBottom: "0",
  }));
  export const UserImgContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    height: "10rem",
    borderRadius: "1.25rem",
    overflow: "hidden",
    marginRight: "1.875rem",
    img: {
      height: "100%",
      width: "100%",
    },
  }));
  export const HeaderTextBox = styled(Typography)(({ theme }: { theme: Theme }) => ({
    width: "100%",
    padding: "0 6%",
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: "1.0625rem",
    fontWeight: "500",
    lineHeight: "1.2",
    color: " #666666",
  }));
  export const HeaderDateBox = styled(Box)(({ theme }: { theme: Theme }) => ({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#666666",
    borderBottom: "4px solid #F1F1F1",
    marginBottom: "0.1875rem",
    [theme.breakpoints.down("md")]: {
      margin: "0.3125rem 0 0.3125rem 0",
    },
  }));
  export const HeaderDateText = styled(Typography)(({ theme }: { theme: Theme }) => ({
    fontFamily: "Poppins",
    fontWeight: "500",
    lineHeight: "1",
    color: " #666666",
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
      background: "#F5F5F5",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.text.primary,
      borderRadius: "1.25rem",
      height: "3.75rem",
    },
  }));
  export const UserInfoRow = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    height: "fit-content",
    padding: "0.0938rem 0",
    color: "#505050",
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
  export const InvisibleBox = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "none",
  }));
}
