import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { LightTheme } from "../../../../../utils/theme";

export namespace S {
  export const OptionCardBox = styled(Box)(({ theme }: any) => ({
    width: "6rem",
    height: "7.5rem",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    position: "absolute",
    zIndex: "1",
    color: "#000",
    top: "90%",
    right: "1%",
  }));

  export const Options = styled(Box)(({ theme }: any) => ({
    fontSize: "0.73rem",
    marginBottom: "0.2rem",
    color: LightTheme.palette.text.secondary,
    cursor: "pointer",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    alignItems: "center",

    "&:hover": {
      backgroundColor: LightTheme.palette.custom.backgroundLight,
    },
  }));
}

export default S;
