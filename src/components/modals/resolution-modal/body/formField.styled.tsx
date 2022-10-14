import { styled } from "@mui/material";

namespace S {
  export const Container = styled("div", { shouldForwardProp: (prop) => prop !== "selectAll" })<{ selectAll?: boolean }>(({ theme, selectAll }) => ({
    display: "grid",
    gridTemplateAreas: `
    "sel sel . ."
    "dhd dhd ric ric"
    "dct ${selectAll ? "dct" : "grp"} ric ric"
    "pre pre ric ric"
    "par par ric ric"
    `,
    gridAutoColumns: "1fr 1fr 1fr 1fr",
    gap: "1rem",

    [theme.breakpoints.down("md")]: {
      gridTemplateAreas: `
    "sel sel"
    "dhd dhd"
    "dct ${selectAll ? "dct" : "grp"}"
    "pre pre"
    "par par"
    "ric ric"
    `,
      gridAutoColumns: "1fr 1fr",
      gridAutoRows: "auto auto auto auto auto 300px",
    },
  }));

  export const EditorBox = styled("div")(() => ({
    gridArea: "ric",
  }));
}

export default S;
