import { styled } from "@mui/material";

namespace S {
  export const StaticBox = styled("div")({
    display: "grid",
    gridTemplateAreas: `
    "prn prn"
    "var var"
    "std end"
    "ava qty"
    `,
    gridTemplateColumns: "15rem 15rem",
    gap: "1rem",
    "& .MuiAutocomplete-fullWidth": {
      width: "31rem",
    },
    "& .MuiAutocomplete-popper": {
      backgroundColor: "red",
    },
  });

}

export default S;
