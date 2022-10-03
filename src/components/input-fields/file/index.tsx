import React from "react";
import { FieldValues, Path, PathValue, UseFormClearErrors, UseFormRegister, UseFormSetError, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import S from "./file.styled";

interface CustomProps<FormInputType extends FieldValues> {
  label: string;
  register: UseFormRegister<FormInputType>;
  inputName: string;
  helperText: string;
  setValue: UseFormSetValue<FormInputType>;
  trigger: UseFormTrigger<FormInputType>;
  setError: UseFormSetError<FormInputType>;
  clearErrors: UseFormClearErrors<FormInputType>;
}

function FileInput<FormInputTypes>({
  label,
  register,
  helperText,
  inputName,
  setValue,
  trigger,
  setError,
  clearErrors,
}: CustomProps<FormInputTypes & FieldValues>) {
  return (
    <>
      <S.ChooseFile
        variant="outlined"
        label={label}
        type="file"
        helperText={helperText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(
            inputName as Path<FormInputTypes & FieldValues>,
            (e.target.files as FileList)[0] as PathValue<FormInputTypes & FieldValues, Path<FormInputTypes & FieldValues>>,
          );
          trigger(inputName as Path<FormInputTypes & FieldValues>);
        }}
      />
    </>
  );
}

export default FileInput;
