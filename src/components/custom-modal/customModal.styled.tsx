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

      "& .MuiBox-root": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    }),
  );
}

export default S;
