import { DialogTitle, styled } from "@mui/material";

namespace S {
  export const Container = styled(DialogTitle)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    "& .MuiIconButton-root": {
      position: "absolute",
      right: "1rem",
      padding: ".7rem",
      marginRight: "1rem",
      color: theme.palette.primary.main,
      borderRadius: "50%",
      backgroundColor: "#ffffff",
      width: "1rem",
      height: "1rem",
      alignItems: "center",
    },
    backgroundColor: theme.palette.custom.backgroundDark,
  }));

  export const Title = styled("div", { shouldForwardProp: (prop) => prop !== "alignment" })<{ alignment?: string }>(({ theme, alignment }) => ({
    display: alignment ? "flex" : "contents",
    justifyContent: alignment ? "center" : "",
    marginRight: alignment ? "1.5rem" : "",
    paddingLeft: "2rem",
    color: theme.palette.text.primaryDark,
    width: "100%",
    alignItems: "center",
  }));
}

export default S;
