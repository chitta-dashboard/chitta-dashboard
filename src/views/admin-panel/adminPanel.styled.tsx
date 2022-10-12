import { styled, Typography, Box, Stack, Button } from "@mui/material";

namespace S {
  export const MainContainer = styled(Box)({
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateRows: "auto 1fr",
    gap: "1.2rem",
    minHeight: "7rem",
  });

  export const AdminText = styled(Typography)(({ theme }) => ({
    textAlign: "center",
    color: theme.palette.text.primary,
    lineHeight: "1.5",
    fontSize: "1.6rem",
    fontWeight: "500",
  }));

  export const ContainerBox = styled(Box)(({ theme }) => ({
    borderRadius: "1.25rem",
    backgroundColor: theme.palette.bg.main,
    width: "100%",
    height: "100%",
    overflowX: "hidden",
    overflowY: "auto",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  }));

  export const ContainerStack = styled(Stack)({
    alignItems: "center",
    width: "100%",
    height: "100%",
    gap: "3.5rem",
  });

  export const Adminform = styled("form")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "60%",
    height: "100%",
    gap: "1rem",
    minWidth: "35rem",
    padding: "0rem 2rem",
  });

  export const ButtonBox = styled(Box)({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingBottom: "2rem",
    paddingTop: "1rem",
  });

  export const UpdateButton = styled(Button)({
    width: "30%",
  });
}
export default S;
