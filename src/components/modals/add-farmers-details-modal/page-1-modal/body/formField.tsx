import { FC } from "react";
import { Stack } from "@mui/system";
import { UseFormRegister } from "react-hook-form";

import DateInput from "../../../../input-fields/date";
import NumberInput from "../../../../input-fields/number";
import TextInput from "../../../../input-fields/text";
import { IAddFarmersDetailsPage1Input } from "../../../type/formInputs";

import S from "./page1Modal.styled";

interface CustomProps {
  register: UseFormRegister<IAddFarmersDetailsPage1Input>;
  errors: any;
}

const FormField: FC<CustomProps> = ({ register, errors }) => {
  return (
    <>
      <S.InputContainer spacing={3}>
        <Stack direction={"row"} spacing={2}>
          <TextInput<IAddFarmersDetailsPage1Input> label="பெயர்" register={register} inputName="name" helperText={errors.name?.message} />
          <TextInput<IAddFarmersDetailsPage1Input>
            label="தந்தையின் பெயர்"
            register={register}
            inputName="fatherName"
            helperText={errors.fatherName?.message}
          />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <TextInput<IAddFarmersDetailsPage1Input> label="பாலினம்" register={register} inputName="sex" helperText={errors.sex?.message} />
          <TextInput<IAddFarmersDetailsPage1Input>
            label="கணவன்/மணைவி பெயர்"
            register={register}
            inputName="spouseName"
            helperText={errors.spouseName?.message}
          />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <DateInput label="பிறந்த தேதி" register={register} inputName="dob" helperText={errors.dob?.message} />
          <TextInput<IAddFarmersDetailsPage1Input> label="குழு" register={register} inputName="group" helperText={errors.group?.message} />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <NumberInput<IAddFarmersDetailsPage1Input>
            label="கைபேசி எண்"
            register={register}
            inputName="phoneNumber"
            helperText={errors.phoneNumber?.message}
          />
          <NumberInput<IAddFarmersDetailsPage1Input>
            label="ஆதார் எண்"
            register={register}
            inputName="addhaarNo"
            helperText={errors.addhaarNo?.message}
          />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <NumberInput<IAddFarmersDetailsPage1Input>
            label="வாக்காளர் அடையாள எண்"
            register={register}
            inputName="voterIdNo"
            helperText={errors.voterIdNo?.message}
          />
          <NumberInput<IAddFarmersDetailsPage1Input> label="ஏக்கர்" register={register} inputName="acre" helperText={errors.acre?.message} />
        </Stack>
      </S.InputContainer>
    </>
  );
};

export default FormField;
