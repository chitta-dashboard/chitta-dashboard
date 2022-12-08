import { styled, Stack, Button, Typography } from "@mui/material";

namespace S {
  export const Container = styled(Stack)(() => ({
    minWidth: "25rem",
    minHeight: "30rem",
    height: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
    left: 0,
  }));
  Container.defaultProps = {
    direction: "row",
    spacing: 0.25,
  };

  export const ConfirmationText = styled("h2")(() => ({
    display: "flex",
    padding: "1.5rem ",
  }));
  export const ButtonContainer = styled(Stack)(() => ({
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: "2rem",
  }));
  ButtonContainer.defaultProps = {
    direction: "row",
    spacing: 3,
  };
  export const YesButton = styled(Button)(({ theme }) => ({
    fontSize: "1rem",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    backgroundColor: theme.palette.primary.light,
    // "&.MuiButton-textPrimary": {
    //   width: "6rem",
    // },
  }));
  YesButton.defaultProps = {
    size: "small",
  };
  export const NoButton = styled(Button)(({ theme }) => ({
    fontSize: "1rem",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    color: theme.palette.primary.light,
    borderColor: theme.palette.border.primary,
    borderRadius: ".6rem",
    // width: "6rem",
  }));
  NoButton.defaultProps = {
    size: "small",
    variant: "outlined",
  };

  export const DialogueText = styled("span")(({ theme }) => ({
    gridArea: "tit",
    color: theme.palette.text.secondary,
    textAlign: "center",
    width: "100%",
    fontSize: "1.3rem",
    top: "1.5rem",
  }));

  export const Highlite = styled("span")(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: "1.3rem",
  }));
}

export default S;
