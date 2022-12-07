import { ListItemText, styled, Stack, Button, Chip, Typography } from "@mui/material";

namespace S {
  export const Contents = styled(Stack)(() => ({
    display: "grid",
    gridTemplateAreas: `
    "tit tit"
    "cip cip"
    "foo foo"
    `,
  }));
  Contents.defaultProps = {
    spacing: 4,
  };

  export const ChipContainer = styled(Stack)(() => ({
    maxHeight: "25rem",
    overflowY: "scroll",
    gridArea: "cip",
    // display: "flex",
    flexWrap: "wrap",
    gap: 10,
    left: 0,
  }));
  ChipContainer.defaultProps = {
    direction: "row",
    spacing: 0.25,
  };

  export const GroupList = styled(ListItemText)(() => ({}));
  export const ConfirmationText = styled("h2")(() => ({
    display: "flex",
    padding: "1.5rem ",
  }));
  export const ButtonContainer = styled(Stack)(() => ({
    gridArea: "foo",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    // padding: "2rem",
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
    "&.MuiButton-textPrimary": {
      width: "6rem",
    },
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
    width: "6rem",
  }));
  NoButton.defaultProps = {
    size: "small",
    variant: "outlined",
  };
  export const Chips = styled(Chip)(({ theme }) => ({
    borderColor: theme.palette.border.primary,
    backgroundColor: theme.palette.bg.light,
    color: theme.palette.text.secondaryDark,
    borderRadius: ".6rem",
    marginLeft: 9,
  }));
  Chips.defaultProps = {
    variant: "filled",
  };

  export const DialogueText = styled(Typography)(({ theme }) => ({
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
