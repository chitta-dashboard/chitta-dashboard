import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import S from "./text.styled";

interface CustomProps<FormInputType extends FieldValues> {
  label: string;
  register: UseFormRegister<FormInputType>;
  inputName: string;
  helperText?: string;
}

function TextInput<FormInputTypes>({ label, register, inputName, helperText }: CustomProps<FormInputTypes & FieldValues>) {
  return (
    <S.InputText
      label={label}
      {...register(inputName as Path<FormInputTypes & FieldValues>)}
      helperText={helperText}
      inputProps={{ noValidate: true }}
    />
  );
}

export default TextInput;
