import { styled, Theme } from "@mui/material";

export namespace S {
  export const Wrapper = styled("i", { shouldForwardProp: (prop) => prop !== "isGreen" })(
    ({ theme, isGreen }: { theme?: Theme; isGreen: boolean | undefined }) => ({
      fontWeight: "500",
      fontSize: "1.3rem",
      padding: '.6rem',
      borderRadius: "50%",
      color: isGreen ? "white" : theme?.palette.primary.main,
      backgroundColor: isGreen ? theme?.palette.primary.main : "white",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, .2)",

      "&:hover": {
        cursor: "pointer",
      },
    }),
  );
}
