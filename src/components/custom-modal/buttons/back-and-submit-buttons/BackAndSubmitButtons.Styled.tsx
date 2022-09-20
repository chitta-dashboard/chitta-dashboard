import { styled, Button, Stack } from "@mui/material";

namespace S {
  export const BackButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    paddingLeft: "3rem",
    paddingRight: "3rem",
  }));

  BackButton.defaultProps = {
    variant: "contained",
    size: "small",
  };

  export const SubmitButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    paddingLeft: "3rem",
    paddingRight: "3rem",
  }));

  SubmitButton.defaultProps = {
    variant: "contained",
    size: "small",
  };

  export const ButtonContainer = styled(Stack)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    paddingBottom: "1rem",
    paddingLeft: ".5rem",
    marginTop: ".5rem",
  }));

  ButtonContainer.defaultProps = {
    direction: "row",
    spacing: 3,
  };
}
export default S;
