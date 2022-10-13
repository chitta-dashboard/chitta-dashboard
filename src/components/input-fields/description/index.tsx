import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import S from "./description.styled";

interface CustomProps<FormInputType extends FieldValues> {
  label: string;
  register: UseFormRegister<FormInputType>;
  helperText: string;
  inputName: string;
}
function DescriptionField<FormInputTypes>({ label, register, helperText, inputName }: CustomProps<FormInputTypes & FieldValues>) {
  return (
    <S.Description
      label={label}
      // multiline
      fullWidth
      maxRows={3}
      {...register(inputName as Path<FormInputTypes & FieldValues>)}
      helperText={helperText}
    />
  );
}

export default DescriptionField;
