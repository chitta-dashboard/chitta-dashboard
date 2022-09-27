import { FieldValues, UseFormRegister, Path } from "react-hook-form";

import S from "./date.styled";

interface CustomProps<FormInputType extends FieldValues> {
  label: string;
  register: UseFormRegister<FormInputType>;
  inputName: string;
  helperText?: string;
}
function DateInput<FormInputTypes>({ label, register, inputName, helperText }: CustomProps<FormInputTypes & FieldValues>) {
  return (
    <>
      <S.ChooseDate
        variant="outlined"
        label={label}
        {...register(inputName as Path<FormInputTypes & FieldValues>)}
        helperText={helperText}
        inputProps={{ noValidate: true }}
      />
    </>
  );
}

export default DateInput;
