import { FC } from "react";
import { FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import { IAddFarmersGroupFormInput } from "../../modals/type/formInputs";
import S from "./text.styled";

interface CustomProps<FormInputType extends FieldValues> {
  label: string;
  register: UseFormRegister<FormInputType>;
  helperText: string;
  inputName: string;
}

function TextInput<FormInputTypes>({ label, register, helperText, inputName }: CustomProps<FormInputTypes & FieldValues>) {
  return (
    <>
      <S.InputText label={label} {...register(inputName as Path<FormInputTypes & FieldValues>)} helperText={helperText} />
    </>
  );
}

export default TextInput;
