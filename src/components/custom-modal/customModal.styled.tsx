import { styled, Dialog } from "@mui/material";

namespace S {
  export const ModalContainer = styled(Dialog)(({ theme }) => ({
    "& .MuiBackdrop-root": {
      backgroundColor: theme.palette.custom.backdrop,
    },

    "& .MuiPaper-root": {
      borderRadius: ".75rem",
      width: "max-content",
    },

    "& .MuiDialogTitle-root": {
      margin: theme.spacing(0),
      padding: theme.spacing(1),
      paddingLeft: "1rem",
      backgroundColor: theme.palette.custom.backgroundDark,
    },

    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },

    "& .MuiIconButton-root": {
      position: "absolute",
      right: "1rem",
      top: "1rem",
      color: theme.palette.primary.main,
      borderRadius: "50%",
      backgroundColor: "#ffffff",
      width: "1rem",
      height: "1rem",
    },

    "& .MuiSvgIcon-root": {
      width: ".75rem",
      height: "1rem",
    },
    "& .MuiBox-root": {
      display: "flex",
      justifyContent: "center",
    },
  }));
}

export default S;
