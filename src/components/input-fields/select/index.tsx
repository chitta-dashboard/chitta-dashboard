import { MenuItem } from "@mui/material";
import { useState } from "react";

import Props from "../../modals/type/modalProps";

import S from "./select.styled";

const SelectField = (props: Props) => {
  const [value, setValue] = useState("");
  return (
    <>
      <S.SelectField
        label={props.label}
        select
        {...props.register}
        value={value}
        helperText={props.helperText}
        onChange={(e) => setValue(e.target.value)}
      >
        <MenuItem value="" defaultValue={""}></MenuItem>
        <MenuItem value="1">option1</MenuItem>
        <MenuItem value="2">option2</MenuItem>
        <MenuItem value="3">option3</MenuItem>
      </S.SelectField>
    </>
  );
};

export default SelectField;
