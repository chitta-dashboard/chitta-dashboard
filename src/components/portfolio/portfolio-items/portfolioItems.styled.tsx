import { styled } from "@mui/material";

namespace S {
  export const PortfolioItems = styled("div")(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, 27rem)",
    gap: "2rem",
    width: "100%",
    padding: "3rem 1rem 0 1rem",
    justifyContent: "center",
    alignContent: "start",
  }));

  export const LoaderWrapper = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  export const BottomMarginPlaceholder = styled("span")({
    color: "red",
  });
}

export default S;
