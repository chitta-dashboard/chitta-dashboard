import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";

namespace S {
  export const CeoDetailsContainer = styled(Box)(({ theme }: any) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
    // justifyContent: "space-between",
    gap: "30px",
    overflow: "auto",
    paddingRight: "10px",
  }));
  export const CeoDetailCard = styled(Box)(({ theme }: any) => ({
    backgroundColor: "#FFFFFF",
    height: "310px",
    width: "750px",
    borderRadius: "1.25rem",
    padding: "1.5rem 2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }));
  export const CeoDetailData = styled(Box)(({ theme }: any) => ({
    display: "flex",
    justifyContent: "space-between",
    height: "35%",
  }));
  export const CeoDataLeft = styled(Box)(({ theme }: any) => ({
    display: "flex",
    alignItems: "center",
    gap: "15px",
  }));
  export const ProfilePictureBox = styled(Box)(({ theme }: any) => ({
    borderRadius: "50%",
    height: "90px",
    width: "90px",
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",

    "&:hover > .MuiBox-root": {
      display: "flex",
    },
  }));
  export const CeoProfilePicture = styled("img")(({ theme }: any) => ({
    width: "100%",
    height: "100%",
  }));
  export const EditBox = styled(Box)(({ theme }: any) => ({
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    left: "0",
    background: theme.palette.custom.backgroundLight,
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
    fontSize: "25px",
  }));
  export const HiddenInput = styled("input")(({ theme }: any) => ({
    display: "none",
  }));
  export const CeoData = styled(Box)(({ theme }: any) => ({
    height: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }));
  export const CeoName = styled(Typography)(({ theme }: any) => ({
    fontSize: "21px",
    fontWeight: "500",
    color: theme.palette.text.primary,
  }));
  export const CeoAge = styled(Typography)(({ theme }: any) => ({
    fontSize: "16px",
    fontWeight: "500",
    marginBottom: "10px",
    color: theme.palette.text.secondaryLight,
  }));
  export const CeoJoinedDate = styled(Typography)(({ theme }: any) => ({
    fontSize: "12px",
    color: "rgba(119, 119, 119, 0.8)",
  }));
  export const CeoInfo = styled(Typography)(({ theme }: any) => ({
    fontSize: "15px",
    fontWeight: "500",
    color: theme.palette.text.secondary,
  }));
  export const CeoDataRight = styled(CeoDataLeft)(({ theme }: any) => ({
    gap: "60px",
  }));
  export const CeoDetailDescription = styled(Box)(({ theme }: any) => ({
    fontSize: "18px",
    height: "35%",
    overflow: "auto",
    color: theme.palette.text.secondary,
  }));
  export const ButtonContainer = styled(Box)(({ theme }: any) => ({
    display: "flex",
    alignSelf: "flex-end",
    gap: "37px",
  }));
  export const CustomIconContainer = styled("i")(({ theme }: any) => ({
    color: theme.palette.text.primary,
    fontSize: "30px",
  }));
  export const CeoDetailAdd = styled(CeoDetailCard)(({ theme }: any) => ({
    alignItems: "center",
    justifyContent: "center",
  }));
  export const CustomButton = styled(Button)(({ theme }: any) => ({
    color: theme.palette.text.primary,
    backgroundColor: "white",
    border: "1px dotted #1A9035",
    borderRadius: "50%",
    height: "70px",
    width: "70px",
    fontSize: "30px",
    "&:hover": {
      color: "white",
    },
  }));
}

export default S;
