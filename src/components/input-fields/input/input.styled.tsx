import { styled, TextField, Autocomplete } from "@mui/material";

namespace S {
  export const CommonInputStyled = styled(TextField, {
    shouldForwardProp: (prop) => prop !== "gridArea" && prop !== "fullHeight" && prop !== "hide" && prop !== "selectOptions",
  })<{
    gridArea?: string;
    fullHeight?: boolean;
  }>(({ gridArea, fullHeight }) => ({
    ...(gridArea ? { gridArea } : null),
    fontSize: ".9rem",

    ".MuiOutlinedInput-root": {
      height: fullHeight ? "100%" : "2.7rem",
    },

    ".MuiFormLabel-root": {
      fontSize: ".9rem",
    },
  }));
  CommonInputStyled.defaultProps = {
    InputLabelProps: { shrink: true },
    inputProps: { noValidate: true },
  };

  export const TextInput = styled(CommonInputStyled)(() => ({}));

  export const NumberInput = styled(CommonInputStyled)(() => ({}));

  export const DateInput = styled(CommonInputStyled)(() => ({}));

  export const SelectInput = styled(CommonInputStyled)(() => ({}));

  export const MultiSelectInput = styled(CommonInputStyled)(() => ({}));

  export const RadioInput = styled(CommonInputStyled)(() => ({}));
  export const StyledAutocomplete = styled(Autocomplete)({
    width: "18.75rem",
    "& .MuiOutlinedInput-root": {
      height: "2.5rem",
      fontSize: "0.9rem",
      "& .MuiAutocomplete-input": {
        padding: "0.5px 4px 0.5px 6px",
      },
    },
    "& .MuiInputLabel-root": {
      fontSize: ".9em",
    },
    "& .MuiSvgIcon-root": {
      display: "none",
    },
  });

  export const FileInput = styled(CommonInputStyled)<{ hide?: boolean }>(({ hide }) => ({
    ...(hide
      ? {
          padding: "0 !important",
          border: "0 !important",
          width: "0 !important",
          height: "0 !important",
          ".MuiInputBase-input, .MuiOutlinedInput-notchedOutline": {
            padding: "0 !important",
            border: "0 !important",
            width: "0 !important",
            height: "0 !important",
          },
        }
      : null),
  }));
}

export default S;
