import { FC } from "react";
import { Stack } from "@mui/system";
import { UseFormRegister } from "react-hook-form";

import DescriptionField from "../../../input-fields/description";
import TextInput from "../../../input-fields/text";
import { IAddFarmersGroupFormInput } from "../../type/formInputs";

import S from "./farmersGroupModal.styled";

interface CustomProps {
  register: UseFormRegister<IAddFarmersGroupFormInput>;
  errors: any;
}

const FormField: FC<CustomProps> = ({ register, errors }) => {
  return (
    <>
      <S.InputContainer spacing={3}>
        <TextInput<IAddFarmersGroupFormInput> label="குழு பெயர்" register={register} inputName="groupName" helperText={errors.groupName?.message} />
        <DescriptionField label="விளக்கம்" register={register} inputName="explanation" helperText={errors.explanation?.message} />
        <Stack direction={"row"} spacing={2}>
          <TextInput<IAddFarmersGroupFormInput> label="தலைவர்" register={register} inputName="chairman" helperText={errors.chairman?.message} />
          <TextInput<IAddFarmersGroupFormInput> label="பொருளாளர்" register={register} inputName="treasurer" helperText={errors.treasurer?.message} />
          <TextInput<IAddFarmersGroupFormInput> label="செயலாளர்" register={register} inputName="secretary" helperText={errors.secretary?.message} />
        </Stack>
      </S.InputContainer>
    </>
  );
};

export default FormField;
