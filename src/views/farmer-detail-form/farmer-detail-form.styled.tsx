import { Theme, Typography, Button as MuiButton } from "@mui/material";
import { Box, styled } from "@mui/material";
// import { Link } from "react-router-dom";

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
    width: "7.5rem",
  }));
  export const FarmersDetailsContent = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    background: "#FFFFFF",
    borderRadius: "1.25rem",
    height: "calc(100% - 80px)",
    // padding: "10px 60px",
    padding: "0.625rem 5%",
  }));
  export const FarmersDetailsHeader = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    height: "190px",
  }));
  export const NerkathirLogo = styled("img")(({ theme }: { theme: Theme }) => ({
    height: "7.1875rem",
  }));
  export const HeaderTextContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    color: "#1A9035",
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
  export const HeaderTextBox = styled(Box)(({ theme }: { theme: Theme }) => ({
    width: "100%",
    padding: "0 6%",
    // padding: "0 100px",
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
  }));
  export const HeaderDateText = styled(Box)(({ theme }: { theme: Theme }) => ({
    fontFamily: "Poppins",
    fontSize: "1.0625rem",
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
    "&::-webkit-scrollbar": {
      width: "0.4375rem",
      background: "#F5F5F5",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#1A9035",
      borderRadius: "1.25rem",
      height: "3.75rem",
    },
  }));
  export const UserInfoRow = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    width: "100%",
    height: "fit-content",
    padding: "1px 0",
    color: "#505050",
  }));
  export const UserInfoData1 = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: "flex",
    width: "40%",
    paddingLeft: "10%",
    fontFamily: "Poppins",
    fontSize: "1.0625rem",
    fontWeight: "500",
    lineHeight: "27px",
    "&::after": {
      content: `":"`,
      display: "block",
      fontSize: "0.75rem",
      marginLeft: "0.125rem",
    },
  }));
  export const UserInfoData2 = styled(Box)(({ theme }: { theme: Theme }) => ({
    width: "40%",
    fontSize: "17px",
    paddingLeft: "10%",
  }));
}
