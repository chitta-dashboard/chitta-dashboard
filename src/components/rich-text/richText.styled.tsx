import { styled, Box } from "@mui/material";

namespace S {
  export const ToolbarBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    borderBottom: "1px solid gray",
    paddingBottom: ".5rem",
    padding: "0.5rem",
  }));

  export const ToolbarBtn = styled(Box)(({ theme }) => ({
    padding: "0.2rem 0.4rem",
    fontSize: "0.85rem",
    background: "#fff",
    color: "#000",
    border: "1px solid #000",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontWeight: "600",
  }));

  export const TextBox = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    border: "2px solid #1A9035",
    background: "#fff",
    justifyContent: "flex-start !important",
    borderRadius: "0.5rem",
    display: "flex",
    flexDirection: "column",
    padding: "0.5rem",
    color: "#000",
  }));
}

export default S;
