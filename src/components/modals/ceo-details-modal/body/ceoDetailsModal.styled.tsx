import { styled } from "@mui/material";

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
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "auto  auto auto auto 120px",
    gap: "1rem",
  });
}

export default S;
