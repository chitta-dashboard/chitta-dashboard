import { styled, Stack, Box } from "@mui/material";

namespace S {
  export const StaticBox = styled("div")({
    display: "grid",
    gridTemplateAreas: `
      "prf prf"
      "nme nme"
      "dob phn"
      "qfn qfn"
      "dsc dsc"
    `,
    gridTemplateColumns: "50% 50%",
    gridTemplateRows: "auto  auto auto auto 120px",
    gap: "1rem",
  });

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

  export const DateContainer = styled(Stack)({
    width: "100%",
  });
}

export default S;
