import { Stack } from "@mui/system";

import DateInput from "../../../../input-fields/date";
import NumberInput from "../../../../input-fields/number";
import TextInput from "../../../../input-fields/text";
import { IAddFarmersDetailsFormInput } from "../../../type/formInputs";
import { UseFormRegister } from "react-hook-form";

import S from "./page1Modal.styled";
import { FC } from "react";

interface CustomProps extends IAddFarmersDetailsFormInput {
  register: UseFormRegister<IAddFarmersDetailsFormInput>;
  errors: object;
}

const FormField: FC<CustomProps> = ({ register, errors }) => {
  return (
    <>
      <S.InputContainer spacing={2}>
        <Stack direction={"row"} spacing={2}>
          <TextInput label="பெயர்" register={{ ...register("name") }} helperText={errors.name?.message} />
          <TextInput label="தந்தையின் பெயர்" register={{ ...register("fatherName") }} helperText={errors.fatherName?.message} />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <TextInput label="பாலினம்" register={{ ...register("sex") }} helperText={errors.sex?.message} />
          <TextInput label="கணவன்/மணைவி பெயர்" register={{ ...register("spouseName") }} helperText={errors.spouseName?.message} />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <DateInput label="பிறந்த தேதி" register={{ ...register("dob") }} helperText={errors.dob?.message} />
          <TextInput label="குழு" register={{ ...register("group") }} helperText={errors.group?.message} />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <NumberInput label="கைபேசி எண்" register={{ ...register("phoneNumber") }} helperText={errors.phoneNumber?.message} />
          <NumberInput label="ஆதார் எண்" register={{ ...register("addhaarNo") }} helperText={errors.addhaarNo?.message} />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <NumberInput label="வாக்காளர் அடையாள எண்" register={{ ...register("voterIdNo") }} helperText={errors.voterIdNo?.message} />
          <NumberInput label="ஏக்கர்" register={{ ...register("acre") }} helperText={errors.acre?.message} />
        </Stack>
      </S.InputContainer>
    </>
  );
};

export default FormField;
