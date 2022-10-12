import { Avatar, styled, Box } from "@mui/material";

namespace S {
  export const ProfilePicture = styled(Avatar)({
    width: "5rem",
    height: "5rem",
    ".MuiSvgIcon-root": {
      width: "2rem",
      height: "2rem",
    },
  });

  export const UploadButton = styled(Box)(({ theme }) => ({
    width: "1.7rem",
    height: "1.7rem",
    lineHeight: "1.8rem",
    marginTop: "1.2rem",
    borderRadius: "50%",
    color: theme.palette.text.white,
    border: theme.palette.border.primary,
    backgroundColor: theme.palette.primary.light,
  }));

  export const ProfileContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    ".MuiFormHelperText-root": {
      marginTop: "4px",
    },
  });
}

export default S;
