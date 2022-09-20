import { styled, Typography } from "@mui/material";

namespace S {
  export const SuccessImg = styled(`img`)(({ theme }) => ({
    marginTop: "1.5rem",
    width: "5rem",
    heigth: "5rem",
  }));

  export const DialogueText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textAlign: "center",
  }));

  DialogueText.defaultProps = {
    variant: "body1",
  };
}
export default S;
