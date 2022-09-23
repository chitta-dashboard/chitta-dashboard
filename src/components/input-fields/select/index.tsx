import { MenuItem } from "@mui/material";

import Props from "../../modals/type/modalProps";

import S from "./select.styled";

const SelectField = (props: Props) => {
  return (
    <>
      <S.SelectField
        label={props.label}
        select
        {...props.register}
        // value={"sq.ft"}
        helperText={props.helperText}
      >
        <MenuItem value={`10`}>option1</MenuItem>
        <MenuItem value={`11`}>option2</MenuItem>
        <MenuItem value={`12`}>option3</MenuItem>
      </S.SelectField>
    </>
  );
};

export default SelectField;
