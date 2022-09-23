import { styled, Typography } from "@mui/material";

namespace S {
  export const DeleteImg = styled(`img`)(({ theme }) => ({
    marginTop: "1.5rem",
    width: "5rem",
    heigth: "5rem",
  }));

  export const DialogueText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textAlign: "center",
    width: "16rem",
  }));

  DialogueText.defaultProps = {
    variant: "body1",
  };
}

export default S;
