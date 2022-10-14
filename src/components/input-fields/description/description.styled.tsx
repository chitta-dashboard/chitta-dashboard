import { styled, TextareaAutosize } from "@mui/material";

namespace S {
  export const Description = styled(TextareaAutosize)(({ theme }) => ({
    padding: " 0.7rem",
    border: `.15rem solid ${theme.palette.primary.light}`,
    outline: "none",
    borderRadius: ".2rem",
    maxHeight: "4rem",
    minHeight: "4rem",
    width: "100%",
    resize: "none",
    overflow: "auto !important",
    "&:active": {
      border: `.15rem solid ${theme.palette.primary.dark}`,
    },
  }));

  export const Label = styled(`span`)(({ theme }) => ({
    position: "absolute",
    transform: "translate(0.7rem, -.8rem)",
    backgroundColor: theme.palette.bg.main,
    paddingLeft: ".2rem",
    paddingRight: ".3rem",
    fontSize: ".72rem",
  }));

  export const Container = styled(`div`)({
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  });
}

export default S;
