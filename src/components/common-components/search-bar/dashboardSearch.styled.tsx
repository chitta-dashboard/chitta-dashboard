import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import { LightTheme } from "../../../utils/theme";

export namespace S {
  export const SearchBarPaper = styled(Paper)(({ theme }: any) => ({
    borderRadius: "1.2rem",
    width: "29rem",
    height: "2.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "1rem",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  }));

  export const SearchBar = styled("input")(({ theme }: any) => ({
    height: "100%",
    width: "100%",
    outline: "none",
    border: "#fff",
    borderRadius: "1.2rem",
    paddingLeft: "0.5rem",
    color: LightTheme.palette.primary.light,
  }));
}

export default S;
