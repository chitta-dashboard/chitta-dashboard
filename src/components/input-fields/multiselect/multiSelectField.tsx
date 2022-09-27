import React, { FC } from "react";
import { Select, SelectChangeEvent, OutlinedInput, InputLabel, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CancelIcon from "@mui/icons-material/Cancel";
import { FieldValues, UseFormRegister, Path } from "react-hook-form";


import Props from "../../modals/type/modalProps";
import MenuProps from "./menuProps";
import { getStyles } from "./getStyles";
import names from "./menuItems";

import S from "./multiSelect.styled";

interface CustomProps <FormInputType extends FieldValues> {
  label?: string;
  register:UseFormRegister<FormInputType>;
  inputName: string;
}
function MultiSelect<FormInputTypes>({ label,register,inputName }: CustomProps<FormInputTypes & FieldValues>) {

  const theme = useTheme();
  const [nameList, setNameList] = React.useState<string[]>(names);
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
    let data = value[value.length - 1];
    let index = nameList.indexOf(data);
    let result = [...nameList];
    result.splice(index, 1);
    setNameList(result);
  };

  const handleDelete = (value: string) => {
    let index = personName.indexOf(value);
    let result = [...personName];
    result.splice(index, 1);
    setPersonName(result);
    setNameList([value, ...nameList]);
  };
  return (
    <>
      <S.StyledFormControl>
        <InputLabel shrink id="demo-multiple-chip-label">
          {label}
        </InputLabel>
        <Select
          label="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          {...register(inputName as Path<FormInputTypes & FieldValues>)}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
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
            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </S.StyledFormControl>
    </>
  );
};

export default MultiSelect;
