import { Avatar, styled, Box } from "@mui/material";

namespace S {
  export const ProfilePicture = styled(Avatar)(({ theme }) => ({
    width: "5rem",
    height: "5rem",
  }));
  export const SmallAddButton = styled(`button`)(({ theme }) => ({
    width: "1.75rem",
    height: "1.75rem",
    borderRadius: "50%",
    backgroundColor: "#1A9035",
    color: "#ffffff",
    border: "#1A9035",
  }));

  export const ProfileContainer = styled(Box)(({ theme }) => ({
    marginTop: "1rem",
    marginBottom: "1rem",
  }));
}

export default S;
