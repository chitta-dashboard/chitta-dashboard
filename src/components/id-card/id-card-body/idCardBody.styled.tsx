import { Box, styled, Typography } from "@mui/material";
import { LightTheme } from "../../../utils/theme";

export namespace S {
  export const IdCardWrapper = styled(Box)(({ theme }) => ({
    // height: "19.5rem",
    maxWidth: "35rem",
    backgroundColor: "#fff",
    borderRadius: "1.25rem",
    padding: "0.3rem 0.6rem 0 0.6rem",
  }));

  export const IdImage = styled("img")(({ theme }) => ({
    width: "8.5rem",
    height: "10rem",
  }));

  export const IdCardBodyWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    marginTop: "1.2rem",
    gap: "2rem",
    padding: "0 .2rem",
  }));

  export const IdDetailsWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "2rem",
  }));

  export const IdDetails = styled(Typography)(({ theme }) => ({
    fontSize: "0.8rem",
    fontWeight: "500",
    marginBottom: "0.1rem",
    marginTop: "0.5rem",
    color: LightTheme.palette.text.secondaryLight,
  }));

  export const IdDetailsName = styled(Typography)(({ theme }) => ({
    fontSize: "0.8rem",
    fontWeight: "500",
    marginBottom: "0.1rem",
    marginTop: "0.5rem",
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    color: LightTheme.palette.text.secondaryLight,
  }));

  export const BarCode = styled(Box)(({ theme }) => ({
    marginTop: "1rem",
  }));

  export const MiddleBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    marginBottom: "-0.5rem",
  }));

  export const Signature = styled("img")(({ theme }) => ({
    height: "5.3rem",
    width: "8.3rem",
    margin: "0 auto",
  }));
}

export default S;
