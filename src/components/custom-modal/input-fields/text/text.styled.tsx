import { styled, TextField } from "@mui/material";

namespace S {
  export const InputText = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      height: "2rem",
    },
    width: "100%",
  }));
}

export default S;
