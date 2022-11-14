import { Button, styled } from "@mui/material";

namespace S {
  export const ButtonBox = styled("div")(() => ({
    display: "grid",
    width: "100%",
    gridTemplateColumns: "auto 1fr",
    columnGap: ".5rem",
  }));

  export const DownloadBtn = styled(Button)(() => ({
    width: "auto !important",
    minWidth: "unset",
    padding: ".4rem",
  }));

  export const ImportBtn = styled(Button)(() => ({
    width: "100% !important",
    minWidth: "unset",
  }));

  export const HighlightText = styled("span")(({ theme }) => ({
    color: theme.palette.text.primary,
  }));
}

export default S;
