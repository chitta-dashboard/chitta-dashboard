import { styled } from "@mui/material";

namespace S {
  export const FieldsBox = styled("div")({
    display: "grid",
    gridTemplateAreas: `
      "edu edu vil vil pst pst"
      "adr adr adr adr adr adr"
      "tlk tlk tlk sta sta sta"
      "lty lty wty wty fty fty"
      "ani ani ani ani ani ani"
      "gmb gmb gmb gmb gmb gmb"
    `,
    gridTemplateRows: "auto 120px",
    gap: "1rem",
  });
}

export default S;
