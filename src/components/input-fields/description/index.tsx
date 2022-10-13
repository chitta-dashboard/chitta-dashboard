import { FormHelperText } from "@mui/material";
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
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.Description maxRows={3} {...register(inputName as Path<FormInputTypes & FieldValues>)} />
      <FormHelperText>{helperText}</FormHelperText>
    </S.Container>
  );
}

export default DescriptionField;
