import { styled } from "@mui/material";

namespace S {
  export const StaticBox = styled("div")({
    display: "grid",
    // gridTemplateAreas: `
    // "gpn gpn gpn gpn gpn gpn"
    // "exn exn exn exn exn exn"
    // "chn chn tsr tsr sty sty"
    // `,
    gridTemplateAreas: `
    "gpn gpn gpn"
    "exn exn exn"
    "chn tsr sty"
    `,
    gridTemplateColumns: "10rem 10rem 10rem",
    gridTemplateRows: "auto  120px",
    gap: "1rem",
  });
}

export default S;
