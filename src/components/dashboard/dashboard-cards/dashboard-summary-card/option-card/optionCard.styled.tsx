import { Box, styled } from "@mui/material";

export namespace S {
  export const OptionCardBox = styled(Box)(({ theme }) => ({
    width: "6rem",
    height: "7.5rem",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: `0px 4px 10px ${theme.palette.addAlpha(theme.palette.custom.shadow, 0.1)}`,
    backgroundColor: theme.palette.bg.main,
    position: "absolute",
    zIndex: "1",
    top: "90%",
    right: "1%",
  }));

  export const Options = styled(Box)(({ theme }: any) => ({
    fontSize: "0.73rem",
    marginBottom: "0.2rem",
    color: theme.palette.text.secondary,
    cursor: "pointer",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    alignItems: "center",
    "&:hover": {
      backgroundColor: theme.palette.bg.light,
    },
  }));
}

export default S;
