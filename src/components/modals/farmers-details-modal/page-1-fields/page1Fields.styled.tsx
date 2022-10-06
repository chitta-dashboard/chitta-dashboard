import { styled, Button } from "@mui/material";

namespace S {
  export const StaticBox = styled("div")(() => ({
    display: "grid",
    gridTemplateAreas: `
      "prf prf"
      "nme sex"
      "fnm spo"
      "dob grp"
      "phn adh"
      "dyn dyn"
    `,
    gap: "1.5rem 1.2rem",
  }));

  export const DynamicInputsBox = styled("div")(() => ({
    gridArea: "dyn",
    display: "grid",
    gap: "1.5rem 1.2rem",
  }));

  export const DynamicInputs = styled("div")(() => ({
    display: "grid",
    gridTemplateAreas: `"srv acr bdr btn"`,
    gap: "1.5rem 1.2rem",
  }));

  export const AddBtn = styled(Button)(({ theme }) => ({
    gridArea: "btn",
    padding: "0",
    minWidth: "unset",
    height: "2.75rem",
    width: "2.75rem",
    borderRadius: "5px",
    fontSize: "1rem",
  }));

  AddBtn.defaultProps = {
    children: <i>add</i>,
  };

  export const RemoveBtn = styled(AddBtn)(({ theme }) => ({
    backgroundColor: "white",
    color: theme.palette.primary.light,
    border: `2px solid ${theme.palette.primary.light}`,
  }));

  RemoveBtn.defaultProps = {
    children: <i>close</i>,
  };
}

export default S;
