import { Avatar, styled, Box } from "@mui/material";

namespace S {
  export const ProfilePicture = styled(Avatar)(({ theme }) => ({
    width: "5rem",
    height: "5rem",
  }));

  export const UploadButton = styled(Box)(({ theme }) => ({
    width: "1.7rem",
    height: "1.7rem",
    lineHeight: "1.8rem",
    marginTop: "1.2rem",
    borderRadius: "50%",
    color: "#ffffff",
    border: theme.palette.primary.light,
    backgroundColor: theme.palette.primary.light,
  }));

  export const ProfileContainer = styled(Box)(({ theme }) => ({
    marginTop: "1rem",
    marginBottom: "1rem",
  }));
}

export default S;