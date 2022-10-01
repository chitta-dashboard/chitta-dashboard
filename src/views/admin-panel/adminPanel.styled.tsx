import { styled, Typography, Box, Stack, Button } from "@mui/material";

namespace S {
  export const AdminText = styled(Typography)(({ theme }) => ({
    textAlign: "center",
    color: theme.palette.text.primary,
    lineHeight: "1.5",
    fontSize: "1.6rem",
    fontWeight: "500",
    paddingBottom: "1.5rem",
  }));
  export const ContainerBox = styled(Box)(({ theme }) => ({
    borderRadius: "1.25rem",
    backgroundColor: "white",
    width: "100%",
    height: "90%",
    overflowX: "hidden",
    overflowY: "auto",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  }));
  export const ContainerStack = styled(Stack)(({ theme }) => ({
    alignItems: "center",
    width: "100%",
    height: "100%",
    gap: "2rem",
  }));
  export const Adminform = styled("form")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "50%",
    height: "100%",
    gap: "1rem",
    minWidth: "35rem",
    padding: "0rem 2rem",
  }));
  export const ButtonBox = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingBottom: "2rem",
    paddingTop: "1rem",
  }));
  export const UpdateButton = styled(Button)(({ theme }) => ({
    width: "30%",
  }));
}
export default S;
