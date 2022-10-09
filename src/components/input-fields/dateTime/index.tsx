import { FieldValues, UseFormRegister, Path } from "react-hook-form";
import { getCurrentTime } from "../../../utils/constants";
import S from "./dateTime.styled";

interface CustomProps<FormInputType extends FieldValues> {
  label: string;
  register: UseFormRegister<FormInputType>;
  inputName: string;
  helperText?: string;
  setDefault?: boolean;
}
function DateTimeInput<FormInputTypes>({ label, register, inputName, helperText, setDefault = false }: CustomProps<FormInputTypes & FieldValues>) {
  return (
    <S.ChooseDateTime
      variant="outlined"
      label={label}
      {...register(inputName as Path<FormInputTypes & FieldValues>)}
      helperText={helperText}
      inputProps={{ noValidate: true }}
      defaultValue={setDefault ? getCurrentTime() : ""}
    />
  );
}

export default DateTimeInput;
