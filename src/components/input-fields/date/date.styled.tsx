import { styled, TextField } from "@mui/material";

namespace S {
  export const ChooseDate = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      color: theme.palette.text.secondaryLight,
      height: "2rem",
    },
    width: "100%",
  }));
  ChooseDate.defaultProps = {
    size: "small",
    type: "date",
    InputProps: { style: { fontSize: ".8rem" } },
    InputLabelProps: { style: { fontSize: ".8rem" }, shrink: true },
  };
}

export default S;
