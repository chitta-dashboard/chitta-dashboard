import { styled, Button, Divider, Stack } from "@mui/material";

namespace S {
  export const StaticBox = styled("div")({
    display: "grid",
    gridTemplateAreas: `
      "prf prf"
      "nme sex"
      "fnm spo"
      "dob grp"
      "phn adh"
      "div div"
      "con con"
      "dyn dyn"
    `,
    gap: "1rem",
  });

  export const DynamicInputsBox = styled("div")({
    gridArea: "dyn",
    display: "grid",
    gap: "1.5rem 1.2rem",
  });

  export const DynamicInputs = styled("div")({
    display: "grid",
    gridTemplateAreas: `"srv acr bdr btn"`,
    gap: "1.5rem 1.2rem",
  });
  export const DividerLine = styled(Divider)({
    gridArea: "div",
    width: "100%",
  });
  export const AddLandDetailsContainer = styled(Stack)(({ theme }) => ({
    gridArea: "con",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: ".8rem",
    color: theme.palette.text.secondary,
  }));

  AddLandDetailsContainer.defaultProps = {
    direction: "row",
  };
  export const AddBtn = styled(Button)({
    gridArea: "btn",
    padding: "0",
    minWidth: "unset",
    height: "2.75rem",
    width: "2.75rem",
    borderRadius: "5px",
    fontSize: "1rem",
  });

  AddBtn.defaultProps = {
    children: <i>add</i>,
  };


  export const RemoveBtn = styled(Button)(({ theme }) => ({
    gridArea: "btn",
    padding: "0",
    minWidth: "unset",
    height: "2.75rem",
    width: "2.75rem",
    borderRadius: "5px",
    fontSize: "1rem",
    color: `${theme.palette.bg.main}!important`,
  }));

  RemoveBtn.defaultProps = {
    children: <i>delete</i>,
  };

  export const AddNewRowButton = styled(Button)(({ theme }) => ({
    fontSize: ".7rem",
    padding: ".1rem .7rem",
    textTransform: "none",
  }));
  AddNewRowButton.defaultProps = {
    children: (
      <>
        <i style={{ marginRight: "0.3rem", fontSize: ".9rem" }}>add</i> Add a row
      </>
    ),
  };
}

export default S;
