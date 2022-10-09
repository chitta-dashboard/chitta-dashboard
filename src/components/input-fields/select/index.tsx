import { MenuItem } from "@mui/material";
import { useState } from "react";
import { FieldValues, Path, PathValue, UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import S from "./select.styled";

interface CustomProps<FormInputType extends FieldValues> {
  label: string;
  register: UseFormRegister<FormInputType>;
  inputName: string;
  helperText?: string;
  setValue: UseFormSetValue<FormInputType>;
  trigger: UseFormTrigger<FormInputType>;
  selectOptions?: Array<[string, string]>;
}

function SelectField<FormInputTypes>({
  label,
  register,
  inputName,
  helperText,
  trigger,
  setValue,
  selectOptions = [
    ["option-1", "option-1"],
    ["option-2", "option-2"],
    ["option-3", "option-3"],
  ],
}: CustomProps<FormInputTypes & FieldValues>) {
  const [selected, setSelected] = useState<string>("");

  return (
    <S.SelectField
      label={label}
      select
      {...register(inputName as Path<FormInputTypes & FieldValues>)}
      value={selected}
      onChange={(e) => {
        setSelected(e.target.value);
        setValue(
          inputName as Path<FormInputTypes & FieldValues>,
          e.target.value as PathValue<FormInputTypes & FieldValues, Path<FormInputTypes & FieldValues>>,
        );
        trigger(inputName as Path<FormInputTypes & FieldValues>);
      }}
      helperText={helperText}
    >
      <MenuItem value="" style={{ display: "none" }}>
        ""
      </MenuItem>
      {selectOptions.map(([actualValue, displayValue]) => (
        <MenuItem key={actualValue} value={actualValue}>
          {displayValue}
        </MenuItem>
      ))}
    </S.SelectField>
  );
}

export default SelectField;
