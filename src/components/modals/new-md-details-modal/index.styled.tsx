import { Button, styled } from "@mui/material";

namespace S {
  export const AddButton = styled(Button)(({ theme }) => ({
    fontSize: "1rem",
    margin:"0.5rem auto",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    width:"30%",
    color: "white",
    borderColor: theme.palette.primary.light,
    borderRadius: ".6rem",
  }));
}

export default S;
