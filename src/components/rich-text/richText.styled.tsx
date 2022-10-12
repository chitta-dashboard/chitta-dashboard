import { styled, Box, Typography } from "@mui/material";

namespace S {
  export const ToolbarBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    borderBottom: "2px solid",
    borderColor: theme.palette.border.primary,
    paddingBottom: ".5rem",
    padding: "0.5rem",
    width: "100%",
  }));

  export const ToolbarBtn = styled("button")(({ theme }) => ({
    padding: "0.3rem 0.4rem",
    fontSize: "0.85rem",
    background: theme.palette.bg.main,
    color: theme.palette.text.primary,
    border: "1px solid",
    borderColor: theme.palette.border.primary,
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontWeight: "400",
  }));
  ToolbarBtn.defaultProps = {
    type: "button",
  };

  export const TextBox = styled("div")(({ theme }) => ({
    width: "100%",
    height: "100%",
    border: "2px solid",
    borderColor: theme.palette.border.primary,
    background: theme.palette.bg.main,
    borderRadius: "0.5rem",
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.black,

    "> div:nth-of-type(2)": {
      height: "100%",
    },
  }));

  export const RichTextLabel = styled(Typography)(({ theme }) => ({
    fontSize: "0.75rem",
    fontWeight: "500",
    color: theme.palette.primary.light,
    position: "absolute",
    top: "-3.5%",
    left: "2%",
    zIndex: "1",
    background: theme.palette.bg.main,
    padding: "0 0.2rem",
  }));

  export const RichTextBoxWrapper = styled(Box)(({ theme }) => ({
    position: "relative",
    height: "100%",
    width: "100%",
    justifyContent: "initial",

    ".menu-bar": {
      ".is-active": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.text.white,

        i: {
          color: theme.palette.text.white,
        },
      },

      i: {
        fontSize: "1.375rem !important",
      },
    },

    ".ProseMirror": {
      /* min-height: 10rem; */
      maxHeight: "12rem",
      height: "100%",
      overflowY: "auto",
      outline: "none",
      padding: "0.5rem",

      ul: {
        padding: "0 1.5rem",
      },

      ol: {
        padding: "0 1.5rem",
      },

      h1: {
        lineHeight: "1.1",
      },
      h2: {
        lineHeight: "1.1",
      },
      h3: {
        lineHeight: "1.1",
      },
      h4: {
        lineHeight: "1.1",
      },
      h5: {
        lineHeight: "1.1",
      },
      h6: {
        lineHeight: "1.1",
      },

      code: {
        color: "inherit",
        padding: "0",
        background: theme.palette.text.secondaryLight,
        fontSize: "0.8rem",
      },

      pre: {
        background: theme.palette.text.certificateExtraDark,
        color: theme.palette.text.white,
        padding: "0.75rem 1rem",
      },

      blockquote: {
        paddingLeft: "1rem",
        borderLeft: `2px solid ${theme.palette.text.secondary}`,
      },

      hr: {
        border: "none",
        borderTop: `2px solid ${theme.palette.text.secondary}`,
        margin: "2rem 0",
      },
    },
  }));
}

export default S;
