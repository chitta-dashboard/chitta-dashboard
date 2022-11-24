import { Button as MuiButton, styled } from "@mui/material";

namespace S {
  export const ButtonBox = styled("div")(() => ({
    display: "grid",
    width: "100%",
    gridTemplateColumns: "auto 1fr",
    columnGap: ".5rem",
  }));

  export const Button = styled(MuiButton)(() => ({
    width: "100% !important",
  }));

  export const HighlightText = styled("span")(({ theme }) => ({
    color: theme.palette.text.primary,
  }));

  export const Body = styled("div")({
    display: "grid",
    rowGap: "1.2rem",
    justifyItems: "center",
    textAlign: "center",
  });
}

export default S;
