import { styled, Stack, Button, Typography, Popover } from "@mui/material";

namespace S {
  export const RightSectionContainer = styled(Stack)(({ theme }) => ({
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "1rem",
    [theme.breakpoints.down("lg")]: {
      justifyContent: "space-between",
    },
  }));

  export const CustomBulkGroupButton = styled(Button)(({ theme }) => ({
    minWidth: "10%",
    [theme.breakpoints.down("md")]: {
      padding: "0.4rem 2.5rem",
    },
  }));

  export const CustomPopover = styled(Popover)({
    maxHeight: "14.45rem",
  });

  export const CustomPopoverList = styled(Typography)(({ theme }) => ({
    textAlign: "left",
    padding: "0.7rem 1.5rem",
    fontWeight: "300",
    border: "0.0625rem solid",
    borderColor: theme.palette.addAlpha(theme.palette.border.secondary, 0.1),
    color: theme.palette.text.secondary,
    fontSize: "1rem",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.bg.light,
      color: theme.palette.text.secondaryDark,
    },
  }));

  export const DropdownStack = styled(Stack)(({ theme }) => ({
    "& MuiInputBase-root": {
      width: "100%",
    },
    [theme.breakpoints.down("lg")]: {
      width: "52%",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  }));

  export const CustomButton = styled(Button)(({ theme }) => ({
    minWidth: "10%",
    [theme.breakpoints.down("md")]: {
      padding: "0.4rem 2.5rem",
    },
  }));

  export const ButtonStack = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: "1rem",
    "& .Mui-disabled": {
      backgroundColor: theme.palette.custom.disabled,
    },
    [theme.breakpoints.down("md")]: {
      width: "inherit",
    },
  }));

  export const HiddenInput = styled("input")(() => ({
    display: "none",
  }));

  export const IconPlus = styled("i")(() => ({}));

  export const HightlightText = styled("span")(({ theme }) => ({
    color: theme.palette.text.primary,
  }));

  export const CustomMessage = styled("span")(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 600,
  }));
}
export default S;
