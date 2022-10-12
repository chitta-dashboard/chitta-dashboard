import { styled, TextField } from "@mui/material";

namespace S {
  export const ChooseDate = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      "& .MuiOutlinedInput-input": {
        color: theme.palette.text.secondaryDark,
      },
      color: theme.palette.text.secondaryLight,
      height: "2.65rem",
    },
    width: "100%",
  }));

  ChooseDate.defaultProps = {
    size: "small",
    type: "date",
    InputProps: { style: { fontSize: ".9rem" } },
    InputLabelProps: { style: { fontSize: ".9rem" }, shrink: true },
  };
}

export default S;
