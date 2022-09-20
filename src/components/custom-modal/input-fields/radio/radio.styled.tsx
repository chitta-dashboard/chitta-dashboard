import { FormLabel, styled, FormControlLabel } from "@mui/material";

namespace S {
  export const StyledLabel = styled(FormLabel)(({ theme }) => ({
    fontSize: "0.8rem",
  }));

  export const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    fontSize: "0.8rem",
    color: theme.palette.text.secondary,
  }));
}

export default S;
