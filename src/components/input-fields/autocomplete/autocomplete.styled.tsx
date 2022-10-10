import { Autocomplete, styled } from "@mui/material";

namespace S {
  export const StyledAutocomplete = styled(Autocomplete)({
    width: "18.75rem",
    height: "2.5rem",
    "& .MuiOutlinedInput-root": {
      fontSize: "0.9rem",
    },
    "& .MuiInputLabel-root": {
      fontSize: ".9em",
    },
    "& .MuiSvgIcon-root": {
      display: "none",
    },
  });
}

export default S;
