import { MenuItem } from "@mui/material";
import { useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

import S from "./select.styled";

interface CustomProps<FormInputType extends FieldValues> {
  label: string;
  register: UseFormRegister<FormInputType>;
  helperText: String;
  inputName: string;
}

function SelectField<FormInputTypes>({ label, register, helperText, inputName }: CustomProps<FormInputTypes & FieldValues>) {
  const [value, setValue] = useState("");
  return (
    <>
      <S.SelectField
        label={label}
        select
        {...register(inputName as Path<FormInputTypes & FieldValues>)}
        value={value}
        helperText={helperText}
        onChange={(e) => setValue(e.target.value)}
      >
        <MenuItem value="" defaultValue={""}></MenuItem>
        <MenuItem value="1">option1</MenuItem>
        <MenuItem value="2">option2</MenuItem>
        <MenuItem value="3">option3</MenuItem>
      </S.SelectField>
    </>
  );
}

export default SelectField;
