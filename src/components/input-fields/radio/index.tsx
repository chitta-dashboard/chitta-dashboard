import { Stack } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";

import Props from "../../modals/type/modalProps";

import S from "./radio.styled";

const RadioButton = (props: Props) => {
  return (
    <>
      <FormControl>
        <Stack direction={"column"} spacing={1}>
          <S.StyledLabel id="demo-radio-buttons-group-label">{props.label}</S.StyledLabel>
          <RadioGroup defaultValue="">
            <Stack direction={"row"} spacing={2}>
              <S.StyledFormControlLabel value="yes" control={<Radio />} label="ஆம்" />
              <S.StyledFormControlLabel value="no" control={<Radio />} label="இல்லை" />
            </Stack>
          </RadioGroup>
        </Stack>
      </FormControl>
    </>
  );
};

export default RadioButton;
