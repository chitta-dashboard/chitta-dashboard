import { styled, Button, Stack } from "@mui/material";

namespace S {
  export const NoButton = styled(Button)(({ theme }) => ({
    fontSize: ".7rem",
    color: theme.palette.primary.main,
  }));

  NoButton.defaultProps = {
    variant: "outlined",
    size: "small",
  };

  export const YesButton = styled(Button)(({ theme }) => ({
    fontSize: ".7rem",
    backgroundColor: theme.palette.primary.main,
  }));

  YesButton.defaultProps = {
    variant: "contained",
    size: "small",
  };

  export const ButtonContainer = styled(Stack)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    paddingBottom: "2rem",
  }));

  ButtonContainer.defaultProps = {
    direction: "row",
    spacing: 3,
  };
}

export default S;
