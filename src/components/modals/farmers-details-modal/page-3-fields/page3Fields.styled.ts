import { styled } from "@mui/material";

namespace S {
  export const FieldsBox = styled("div")({
    display: "grid",
    minWidth:"540px",
    minHeight:"415px",
    gridTemplateAreas: `
      "napb napb napb napb napb napb"
      "bn bn bn bn bn bn"
      "anum anum anum anum anum anum"
      "cnanum cnanum cnanum cnanum cnanum cnanum"
      "code code code code code code"
    `,
    gridTemplateRows: "auto",
    gap: "1rem",
  });
}

export default S;
