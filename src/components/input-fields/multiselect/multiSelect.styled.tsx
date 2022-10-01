import { Box, Chip, FormControl, MenuItem, styled } from "@mui/material";

namespace S {
  export const ChipContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    maxHeight: "3rem",
    overflowY: "auto",
  }));

  ChipContainer.defaultProps = {
    gap: 2,
  };

  export const StyledChip = styled(Chip)(({ theme }) => ({
    zIndex: "999999 !important",
    borderRadius: ".2rem",
    height: "1.5rem",
    backgroundColor: theme.palette.custom.backgroundLight,
    color: theme.palette.text.secondary,

    "& 	.MuiChip-deleteIconSmall": {
      color: theme.palette.primary.dark,
    },

    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.dark,
      height: ".9rem !important",
      width: ".9rem !important",
    },
  }));

  export const StyledFormControl = styled(FormControl)(({ theme }) => ({
    width: "100% !important",

    "& .MuiOutlinedInput-root": {
      fontSize: ".9rem",
      height: "5rem ",
    },

    "& .MuiInputLabel-root": {
      fontSize: ".9rem",
      backgroundColor: "#ffffff",
      paddingRight: ".5rem",
    },

    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.light,
      height: "1.5rem ",
      width: "1.5rem ",
    },
    "& .MuiBox-root": {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
    },

    // "& .MuiPaper-elevation": {
    //   backgroundColor: "red !important",
    // },
 
  }));

  StyledFormControl.defaultProps = {
    sx: { m: 1, width: 300 },
  };
  export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  
  }));
}

export default S;
