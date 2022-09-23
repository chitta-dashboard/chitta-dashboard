import { styled, Dialog } from "@mui/material";
namespace S {
  export const ModalContainer = styled(Dialog, { shouldForwardProp: (prop) => prop !== "addDecision" })<{ addDecision?: boolean }>(
    ({ theme, addDecision = false }) => ({
      "& .MuiBackdrop-root": {
        backgroundColor: theme.palette.custom.backdrop,
        width: "100%",
        height: "100%",
      },

      "& .MuiPaper-root": {
        borderRadius: ".75rem",
        margin: "2rem",
        width: addDecision ? "100% !important" : "",
        maxWidth: addDecision ? "100%" : "",
      },

      "& .MuiDialogTitle-root": {
        margin: theme.spacing(0),
        padding: theme.spacing(1),
        paddingLeft: "1rem",
        backgroundColor: theme.palette.custom.backgroundDark,
        width: "100%",
      },
      "& .MuiFormHelperText-root": {
        color: "#FF0000",
        marginTop: 0,
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
    }),
  );
}

export default S;
