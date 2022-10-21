import { styled } from "@mui/material";

namespace S {
  export const StaticBox = styled("div")({
    display: "grid",
    gridTemplateAreas: `
      "prf prf"
      "nme nme"
      "dob phn"
      "qfn qfn"
      "sgn sgn"
    `,
    gridTemplateColumns: "50% 50%",
    gap: "1rem",
  });
}

export default S;
