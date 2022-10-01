import { FieldValues, UseFormRegister, Path } from "react-hook-form";

import S from "./dateTime.styled";

interface CustomProps<FormInputType extends FieldValues> {
  label: string;
  register: UseFormRegister<FormInputType>;
  inputName: string;
  helperText?: string;
}
function DateTimeInput<FormInputTypes>({ label, register, inputName, helperText }: CustomProps<FormInputTypes & FieldValues>) {
  return (
    <>
      <S.ChooseDateTime
        variant="outlined"
        label={label}
        {...register(inputName as Path<FormInputTypes & FieldValues>)}
        helperText={helperText}
        inputProps={{ noValidate: true }}
      />
    </>
  );
}

export default DateTimeInput;
