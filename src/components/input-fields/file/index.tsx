import { FieldValues, Path, UseFormRegister } from "react-hook-form";

import S from "./file.styled";

interface CustomProps<FormInputType extends FieldValues> {
  label: string;
  register: UseFormRegister<FormInputType>;
  inputName: string;
  helperText: string;
}

function FileInput<FormInputTypes>({ label, register, helperText, inputName }: CustomProps<FormInputTypes & FieldValues>) {
  return (
    <>
      <S.ChooseFile
        variant="outlined"
        label={label}
        type="file"
        {...register(inputName as Path<FormInputTypes & FieldValues>)}
        helperText={helperText}
      />
    </>
  );
}

export default FileInput;
