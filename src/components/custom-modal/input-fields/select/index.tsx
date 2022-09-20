import { MenuItem } from "@mui/material";

import LabelProps from "../../../modals/type/labelProps";

import S from "./select.styled";

const SelectField = (props: LabelProps) => {
  return (
    <>
      <S.SelectField label={props.label} select>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
      </S.SelectField>
    </>
  );
};

export default SelectField;
