import { ListItemText, styled, Stack, Chip, Typography } from "@mui/material";

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
    height: "18rem",
    maxHeight: "25rem",
    overflowY: "scroll",
    gridArea: "cip",
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
