import { styled, TextField } from "@mui/material";

namespace S {
  export const Description = styled(TextField)(({ theme }) => ({
    "& .MuiInputLabel-root": {
      fontSize: ".8rem",
    },
    "& .MuiOutlinedInput-root": {
      fontSize: ".8rem",
    },
  }));
}

export default S;
