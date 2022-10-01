import { styled, Button, Stack } from "@mui/material";

namespace S {
  export const NoButton = styled(Button)(({ theme }) => ({
    fontSize: "1rem",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    color: theme.palette.primary.light,
    borderColor: theme.palette.primary.light,
    borderRadius: ".6rem",
  }));

  NoButton.defaultProps = {
    variant: "outlined",
    size: "small",
  };

  export const YesButton = styled(Button)(({ theme }) => ({
    fontSize: "1rem",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    backgroundColor: theme.palette.primary.light,
  }));

  YesButton.defaultProps = {
    size: "small",
  };

  export const ButtonContainer = styled(Stack)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    paddingBottom: "3rem",
  }));

  ButtonContainer.defaultProps = {
    direction: "row",
    spacing: 3,
  };
}

export default S;
