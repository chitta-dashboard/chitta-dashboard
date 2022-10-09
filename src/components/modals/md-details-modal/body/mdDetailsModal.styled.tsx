import { styled, Stack, Box } from "@mui/material";

namespace S {
  export const InputContainer = styled(Stack)({});

  export const Title = styled("div")({
    display: "contents",
  });

  export const ButtonContainer = styled(Box)(({ theme }) => ({
    marginTop: "1rem",
    marginBottom: "1rem",

    "& .MuiButton-root": {
      paddingLeft: "3rem",
      paddingRight: "3rem",
      marginBottom: "1rem",
      backgroundColor: theme.palette.primary.light,
    },
  }));
  export const ChipContainer = styled(Stack)({
    marginLeft: "1rem",
  });
}

export default S;
