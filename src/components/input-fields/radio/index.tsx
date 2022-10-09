import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { Stack } from "@mui/material";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import S from "./radio.styled";

interface CustomProps<FormInputType extends FieldValues> {
  label: string;
  register: UseFormRegister<FormInputType>;
  inputName: string;
}

function RadioButton<FormInputTypes>({ label, register, inputName }: CustomProps<FormInputTypes & FieldValues>) {
  return (
    <FormControl>
      <Stack direction={"column"} spacing={1}>
        <S.StyledLabel id="demo-radio-buttons-group-label">{label}</S.StyledLabel>
        <RadioGroup defaultValue="yes">
          <Stack direction={"row"} spacing={2}>
            <S.StyledFormControlLabel {...register(inputName as Path<FormInputTypes & FieldValues>)} value="yes" control={<Radio />} label="ஆம்" />
            <S.StyledFormControlLabel {...register(inputName as Path<FormInputTypes & FieldValues>)} value="no" control={<Radio />} label="இல்லை" />
          </Stack>
        </RadioGroup>
        {/* <FormHelperText>{helperText}</FormHelperText> */}
      </Stack>
    </FormControl>
  );
}

export default RadioButton;
