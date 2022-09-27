import { styled, Dialog } from "@mui/material";
namespace S {
  export const ModalContainer = styled(Dialog, { shouldForwardProp: (prop) => prop !== "openAddDecisionModal" })<{ openAddDecisionModal?: boolean }>(
    ({ theme, openAddDecisionModal = false }) => ({
      "& .MuiBackdrop-root": {
        backgroundColor: theme.palette.custom.backdrop,
        width: "100%",
        height: "100%",
      },

      "& .MuiPaper-root": {
        borderRadius: ".75rem",
        margin: "2rem",
        width: openAddDecisionModal ? "100% !important" : "",
        maxWidth: openAddDecisionModal ? "1400px" : "",
      },

      "& .MuiDialogTitle-root": {
        margin: theme.spacing(0),
        padding: theme.spacing(1),
        paddingLeft: "1rem",
        backgroundColor: theme.palette.custom.backgroundDark,
        color: theme.palette.text.primaryDark,
        width: "100%",
      },

      "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
      },

      "& .MuiInputLabel-root": {
        color: theme.palette.primary.light,
      },

      "& .MuiOutlinedInput-root": {
        color: theme.palette.text.secondaryDark,
        "& fieldset": {
          border: ".15rem solid",
          borderColor: theme.palette.primary.light,
        },
        "&:hover fieldset": {
          borderColor: theme.palette.primary.main,
        },
        "&.Mui-focused fieldset": {
          borderColor: theme.palette.primary.main,
        },
      },
      "& .MuiFormHelperText-root": {
        color: "#FF0000",
        marginTop: 0,
        marginLeft: 0,
      },

      "& .MuiIconButton-root": {
        position: "absolute",
        right: "1rem",
        top: "1rem",
        padding: ".7rem",
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
        alignItems: "center",
      },
    }),
  );
}

export default S;
