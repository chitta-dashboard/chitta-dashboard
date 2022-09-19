import { styled, TextField } from "@mui/material";
namespace S {
  export const ChooseFile = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      color: "transparent",
      paddingLeft: "23rem",
      fontSize: "small",
      heigth: "2.5rem",
    },
  }));
}

export default S;
