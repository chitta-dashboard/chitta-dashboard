import { FieldValues, UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import MultiSelect from "./multiSelectField";

interface CustomProps<FormInputType extends FieldValues> {
  multiSelectLabel: string;
  register: UseFormRegister<FormInputType>;
  inputName: string;
  setValue: UseFormSetValue<FormInputType>;
  trigger: UseFormTrigger<FormInputType>;
}
function MultipleSelectChip<FormInputTypes>({ multiSelectLabel, register, inputName, setValue, trigger }: CustomProps<FormInputTypes & FieldValues>) {
  return <MultiSelect register={register} inputName={inputName} label={multiSelectLabel} setValue={setValue} trigger={trigger} />;
}
export default MultipleSelectChip;
