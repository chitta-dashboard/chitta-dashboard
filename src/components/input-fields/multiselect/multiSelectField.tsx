import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useTheme } from "@mui/material";
import { Select, SelectChangeEvent, OutlinedInput, InputLabel } from "@mui/material";
import { FieldValues, UseFormRegister, Path, UseFormSetValue, PathValue, UseFormTrigger } from "react-hook-form";
import names from "./menuItems";
import MenuProps from "./menuProps";
import { getStyles } from "./getStyles";
import S from "./multiSelect.styled";

interface CustomProps<FormInputType extends FieldValues> {
  label: string;
  register: UseFormRegister<FormInputType>;
  inputName: string;
  setValue: UseFormSetValue<FormInputType>;
  trigger: UseFormTrigger<FormInputType>;
}

function MultiSelect<FormInputTypes>({ label, register, inputName, setValue, trigger }: CustomProps<FormInputTypes & FieldValues>) {
  const theme = useTheme();
  const [nameList, setNameList] = useState<string[]>(names);
  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    setPersonName(value as string[]);
    setNameList(nameList.filter((n) => n !== value[value.length - 1]));
    setValue(inputName as Path<FormInputTypes & FieldValues>, value as PathValue<FormInputTypes & FieldValues, Path<FormInputTypes & FieldValues>>);
    trigger(inputName as Path<FormInputTypes & FieldValues>);
  };

  const handleDelete = (value: string) => {
    const updatedPersons = personName.filter((p) => p !== value);
    setPersonName(updatedPersons);
    setNameList([...nameList, value]);
    setValue(
      inputName as Path<FormInputTypes & FieldValues>,
      updatedPersons as PathValue<FormInputTypes & FieldValues, Path<FormInputTypes & FieldValues>>,
    );
    trigger(inputName as Path<FormInputTypes & FieldValues>);
  };

  return (
    <S.StyledFormControl>
      <InputLabel shrink id="demo-multiple-chip-label">
        {label}
      </InputLabel>
      <Select
        label="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        maxRows={4}
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" {...register(inputName as Path<FormInputTypes & FieldValues>)} />}
        renderValue={(selected) => (
          <S.ChipContainer>
            {selected.map((value) => (
              <S.StyledChip
                clickable
                deleteIcon={<CancelIcon onMouseDown={(event: any) => event.stopPropagation()} />}
                key={value}
                label={value}
                onDelete={() => handleDelete(value)}
              />
            ))}
          </S.ChipContainer>
        )}
        MenuProps={MenuProps}
      >
        {nameList.map((name) => (
          <S.StyledMenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
            {name}
          </S.StyledMenuItem>
        ))}
      </Select>
    </S.StyledFormControl>
  );
}

export default MultiSelect;
