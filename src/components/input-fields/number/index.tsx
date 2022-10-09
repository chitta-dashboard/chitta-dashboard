import { FieldValues, UseFormRegister, Path } from "react-hook-form";
import S from "./number.styled";

interface CustomProps<FormInputType extends FieldValues> {
  label: string;
  register: UseFormRegister<FormInputType>;
  helperText: string;
  inputName: string;
}
function NumberInput<FormInputTypes>({ label, register, helperText, inputName }: CustomProps<FormInputTypes & FieldValues>) {
  return (
    <S.InputNumber
      label={label}
      {...register(inputName as Path<FormInputTypes & FieldValues>)}
      helperText={helperText}
      inputProps={{ noValidate: true }}
    />
  );
}

export default NumberInput;
