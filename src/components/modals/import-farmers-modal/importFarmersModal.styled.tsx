import { Button as MuiButton, styled, Typography } from "@mui/material";

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
  export const OptionalContainer = styled("div")({
    marginTop: "3rem",
    display: "grid",
    gridTemplateAreas: `
    "txt txt"
    "cfm cfm"
    "cnl cnl"
        `,
    rowGap: "2rem",
  });

  export const DownloadButton = styled(Button)({
    gridArea: "cfm",
    fontSize: "1rem",
  });

  export const CancelButton = styled(Button)({
    gridArea: "cnl",
    fontSize: "1rem",
    textTransform: "none",
  });
  CancelButton.defaultProps = {
    variant: "outlined",
  };
  export const DialogueText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textAlign: "center",
    width: "100%",
    fontSize: "1.3rem",
    gridArea: "txt",
  }));

  export const Highlite = styled("span")(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: "1.3rem",
  }));
}

export default S;
