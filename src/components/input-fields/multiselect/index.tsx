import MultiSelect from "./multiSelectField";
import { FieldValues, UseFormRegister, Path } from "react-hook-form";

interface CustomProps<FormInputType extends FieldValues> {
  multiSelectLabel: string;
  label: string;
}
function MultipleSelectChip<FormInputTypes>({ multiSelectLabel }: CustomProps<FormInputTypes & FieldValues>) {
  return (
    <>
      <MultiSelect label={multiSelectLabel} />
    </>
  );
}
export default MultipleSelectChip;
