import { styled, Box, Typography } from "@mui/material";
import { LightTheme } from "../../utils/theme";

namespace S {
  export const ToolbarBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    borderBottom: "2px solid",
    borderColor: LightTheme.palette.text.primary,
    paddingBottom: ".5rem",
    padding: "0.5rem",
    width: "100%",
  }));

  export const ToolbarBtn = styled("button")(({ theme }) => ({
    padding: "0.3rem 0.4rem",
    fontSize: "0.85rem",
    background: "#fff",
    color: LightTheme.palette.text.primary,
    border: "1px solid",
    borderColor: LightTheme.palette.text.primary,
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontWeight: "400",
  }));

  export const TextBox = styled("div")(({ theme }) => ({
    width: "100%",
    height: "100%",
    border: "2px solid",
    borderColor: LightTheme.palette.text.primary,
    background: "#fff",
    borderRadius: "0.5rem",
    display: "flex",
    flexDirection: "column",
    color: "#000",
  }));

  export const RichTextLabel = styled(Typography)(({ theme }) => ({
    fontSize: "0.75rem",
    fontWeight: "500",
    color: LightTheme.palette.primary.light,
    position: "absolute",
    top: "-3.5%",
    left: "2%",
    zIndex: "1",
    background: "#ffff",
    padding: "0 0.2rem",
  }));

  export const RichTextBoxWrapper = styled(Box)(({ theme }) => ({
    position: "relative",
    height: "100%",
    width: "100%",
    justifyContent: "initial",
  }));
}

export default S;
