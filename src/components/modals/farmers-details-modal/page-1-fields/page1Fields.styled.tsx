import { IconButton } from "@mui/material";
import { styled, Button, Divider, Stack, Typography, Checkbox } from "@mui/material";

namespace S {
  export const StaticBox = styled("div")({
    display: "grid",
    gridTemplateAreas: `
      "prf prf"
      "nme sex"
      "fnm spo"
      "dob grp"
      "phn adh"
      "eml chb"
      "div div"
      "con con"
      "dyn dyn"
    `,
    gap: "1rem",
  });

  export const CheckboxContainer = styled("div")({
    position: "relative",
    gridArea: "chb",
  });

  export const CustomCheckbox = styled(Checkbox)({
    position: "absolute",
  });

  export const CheckboxText = styled("span")({
    position: "absolute",
    marginLeft: "2.5rem",
    marginTop: "0.5625rem",
    textAlign: "center",
  });

  export const IBtnContainer = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.text.primary,
    maxHeight: "1rem",
    maxWidth: "1rem",
    height: "1rem",
    pointerEvents: "auto",
    fontSize: "0.75rem",
    marginLeft: "0.625rem",
    alignSelf: "center",
    "&:hover": {
      backgroundColor: theme.palette.text.primaryDark,
    },
    p: {
      lineHeight: "0.5",
      fontSize: "0.7375rem",
      color: theme.palette.text.white,
    },
  }));

  export const CustomPopoverContainer = styled("span")({
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    maxWidth: "25rem",
    maxHeight: "20rem",
    padding: "0.8rem",
    p: {
      fontSize: "0.75rem",
    },
  });

  export const CustomTextBox = styled("div")(({ theme }) => ({
    position: "relative",
    gridArea: "chb",
    boxSizing: "border-box",
    border: `1px solid #1A9035`,
    borderRadius: "0.125rem",
    height: "2.675rem",
    p: {
      marginLeft: "1.375rem",
      marginTop: "0.75rem",
      position: "absolute",
      color: theme.palette.text.black,
      fontSize: "0.875rem",
      cursor: "pointer",
    },
    "&::before": {
      content: '"பிரதிநிதி *   "',
      position: "absolute",
      fontSize: "12px",
      backgroundColor: theme.palette.bg.main,
      top: -15,
      left: 10,
      padding: "0 10px 0 7px",
    },
  }));

  export const DynamicInputsBox = styled("div")(({ theme }) => ({
    gridArea: "dyn",
    display: "grid",
    gap: "1.5rem 1.2rem",
    "& .Mui-disabled": {
      backgroundColor: theme.palette.custom.disabled,
    },
  }));

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
    "& .Mui-disabled": {
      backgroundColor: theme.palette.custom.disabled,
    },
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

  export const AddNewRowButton = styled(Button)({
    fontSize: ".7rem",
    padding: ".1rem .7rem",
    textTransform: "none",
  });

  AddNewRowButton.defaultProps = {
    children: (
      <>
        <i style={{ marginRight: "0.3rem", fontSize: ".9rem" }}>add</i> Add a row
      </>
    ),
  };
}

export default S;
