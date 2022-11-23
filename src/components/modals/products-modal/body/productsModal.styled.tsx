import { styled } from "@mui/material";

namespace S {
  export const StaticBox = styled("div")({
    display: "grid",
    gridTemplateAreas: `
    "ftp ftp"
    "prn prn"
    "var var"
    "std end"
    "ava qty"
    "des des"
    `,
    gridTemplateColumns: "15rem 15rem",
    gridTemplateRows: "auto auto auto auto auto 100px",
    gap: "1rem",
    "& .MuiAutocomplete-fullWidth": {
      width: "31rem",
    },
    "& .MuiAutocomplete-popper": {
      backgroundColor: "red",
    },
    "& .Mui-disabled": {
      backgroundColor: "transparent",
    },
  });
}

export default S;
