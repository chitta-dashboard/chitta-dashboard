import { styled, Typography, Box, DialogContent } from "@mui/material";

namespace S {
  export const Container = styled(Box)({
    width: "25rem",
    height: "18rem",
  });

  export const ContainerItems = styled(DialogContent)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  export const SuccessImg = styled(`img`)({
    marginTop: "1.5rem",
    width: "7rem",
    heigth: "7rem",
  });

  export const DialogueText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textAlign: "center",
    width: "20rem",
    fontSize: "1.4rem",
  }));
  DialogueText.defaultProps = {
    variant: "body1",
  };
}
export default S;
