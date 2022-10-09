import { FormLabel, styled, FormControlLabel } from "@mui/material";

namespace S {
  export const StyledLabel = styled(FormLabel)({
    fontSize: "0.9rem",
  });

  export const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    fontSize: "0.9rem",
    color: theme.palette.text.secondary,
    "& .MuiRadio-root": {
      color: theme.palette.primary.light,
    },
  }));
}

export default S;
