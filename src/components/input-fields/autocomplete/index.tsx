import { useState } from "react";
import { TextField } from "@mui/material";
import { FieldValues, Path, PathValue, UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import S from "./autocomplete.styled";

interface CustomProps<FormInputType extends FieldValues> {
  label: string;
  register: UseFormRegister<FormInputType>;
  inputName: string;
  helperText?: string;
  setValue: UseFormSetValue<FormInputType>;
  trigger: UseFormTrigger<FormInputType>;
  selectOptions?: any;
}

function AutoCompleteField<FormInputTypes>({
  label,
  register,
  inputName,
  helperText,
  trigger,
  setValue,
  selectOptions,
}: CustomProps<FormInputTypes & FieldValues>) {
  const [selected, setSelected] = useState<string>("");

  return (
    <S.StyledAutocomplete
      disableClearable
      id="autocomplete-box"
      options={selectOptions}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          size="small"
          InputLabelProps={{ shrink: true }}
          value={selected}
          {...register(inputName as Path<FormInputTypes & FieldValues>)}
          helperText={helperText}
          onChange={(e) => {
            setSelected(e.target.value);
            setValue(
              inputName as Path<FormInputTypes & FieldValues>,
              e.target.value as PathValue<FormInputTypes & FieldValues, Path<FormInputTypes & FieldValues>>,
            );
            trigger(inputName as Path<FormInputTypes & FieldValues>);
          }}
        />
      )}
    />
  );
}

export default AutoCompleteField;
