import { Stack } from "@mui/system";
import { FC } from "react";

import DescriptionField from "../../../../input-fields/description";
import NumberInput from "../../../../input-fields/number";
import SelectField from "../../../../input-fields/select";
import TextInput from "../../../../input-fields/text";
import { IAddFarmersDetailsFormInput } from "../../../type/formInputs";
import { UseFormRegister } from "react-hook-form";


import S from "./page2Modal.styled";

interface CustomProps extends IAddFarmersDetailsFormInput {
  register: UseFormRegister<IAddFarmersDetailsFormInput>;
  errors: object;
}

const FormFieldPage2: FC<CustomProps> = ({ register, errors }) => {
  return (
    <>
      <S.InputContainer spacing={2}>
        <Stack direction={"row"} spacing={2}>
          <TextInput label="கல்வி" register={{ ...register("education") }} helperText={errors.education?.message} />
          <TextInput label="கிராமம்" register={{ ...register("village") }} helperText={errors.village?.message} />
          <TextInput label="அஞ்சல் குறியீடு" register={{ ...register("postalNo") }} helperText={errors.postalNo?.message} />
        </Stack>
        <DescriptionField label="முகவரி" register={{ ...register("address") }} helperText={errors.address?.message} />
        <Stack direction={"row"} spacing={2}>
          <TextInput label="தாலுக்கா" register={{ ...register("taluk") }} helperText={errors.taluk?.message} />
          <TextInput label="மாவட்டம்" register={{ ...register("district") }} helperText={errors.district?.message} />
        </Stack>
        <NumberInput label="கணக்கெடுப்பு எண்" register={{ ...register("surveyNo") }} helperText={errors.surveyNo?.message} />
        <Stack direction={"row"} spacing={2}>
          <SelectField label="நில வகை" register={{ ...register("landType") }} helperText={errors.landType?.message} />
          <SelectField label="நீர் வகை" register={{ ...register("waterType") }} helperText={errors.waterType?.message} />
          <SelectField label="விவசாயி வகை" register={{ ...register("farmerType") }} helperText={errors.farmerType?.message} />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <TextInput label="விதைவகை" register={{ ...register("seedType") }} helperText={errors.seedType?.message} />
          <TextInput label="விலங்குகள்" register={{ ...register("animals") }} helperText={errors.animals?.message} />
        </Stack>
        <SelectField label="குழு உறுப்பினர்" register={{ ...register("groupMember") }} helperText={errors.groupMember?.message} />
      </S.InputContainer>
    </>
  );
};

export default FormFieldPage2;
