import { styled, Chip, Stack } from "@mui/material";

namespace S {
  export const StyledChip = styled(Chip)(({ theme }) => ({
    borderRadius: ".2rem",
    height: "1.5rem",
    backgroundColor: theme.palette.custom.backgroundLight,
    color: theme.palette.text.secondary,

    "& 	.MuiChip-deleteIconSmall": {
      color: theme.palette.primary.dark,
    },
  }));

  export const ChipContainer = styled(Stack)(({ theme }) => ({
    padding: "1rem 0",
  }));
}

export default S;
