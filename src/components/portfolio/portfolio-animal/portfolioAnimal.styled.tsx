import { styled } from "@mui/material";

namespace S {
  export const PortfolioAnimal = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.2rem",
    color: theme.palette.text.secondaryLight,
  }));
}
export default S;
