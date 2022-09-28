import { FC } from "react";
import { Stack } from "@mui/system";
import { UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form";

import DescriptionField from "../../../../input-fields/description";
import NumberInput from "../../../../input-fields/number";
import SelectField from "../../../../input-fields/select";
import TextInput from "../../../../input-fields/text";
import { IAddFarmersDetailsPage2Input } from "../../../type/formInputs";

import S from "./page2Modal.styled";

interface CustomProps {
  register: UseFormRegister<IAddFarmersDetailsPage2Input>;
  errors: any;
  trigger: UseFormTrigger<IAddFarmersDetailsPage2Input>;
  setValue: UseFormSetValue<IAddFarmersDetailsPage2Input>;
}

const FormFieldPage2: FC<CustomProps> = ({ register, errors, trigger, setValue }) => {
  return (
    <>
      <S.InputContainer spacing={3}>
        <Stack direction={"row"} spacing={2}>
          <TextInput<IAddFarmersDetailsPage2Input> label="கல்வி" register={register} inputName="education" helperText={errors.education?.message} />
          <TextInput<IAddFarmersDetailsPage2Input> label="கிராமம்" register={register} inputName="village" helperText={errors.village?.message} />
          <TextInput<IAddFarmersDetailsPage2Input>
            label="அஞ்சல் குறியீடு"
            register={register}
            inputName="postalNo"
            helperText={errors.postalNo?.message}
          />
        </Stack>
        <DescriptionField<IAddFarmersDetailsPage2Input> label="முகவரி" register={register} inputName="address" helperText={errors.address?.message} />
        <Stack direction={"row"} spacing={2}>
          <TextInput<IAddFarmersDetailsPage2Input> label="தாலுக்கா" register={register} inputName="taluk" helperText={errors.taluk?.message} />
          <TextInput<IAddFarmersDetailsPage2Input> label="மாவட்டம்" register={register} inputName="district" helperText={errors.district?.message} />
        </Stack>
        <NumberInput<IAddFarmersDetailsPage2Input>
          label="கணக்கெடுப்பு எண்"
          register={register}
          inputName="surveyNo"
          helperText={errors.surveyNo?.message}
        />
        <Stack direction={"row"} spacing={2}>
          <SelectField<IAddFarmersDetailsPage2Input>
            label="நில வகை"
            register={register}
            inputName="landType"
            helperText={errors.landType?.message}
            trigger={trigger}
            setValue={setValue}
          />
          <SelectField<IAddFarmersDetailsPage2Input>
            label="நீர் வகை"
            register={register}
            inputName="waterType"
            helperText={errors.waterType?.message}
            trigger={trigger}
            setValue={setValue}
          />
          <SelectField<IAddFarmersDetailsPage2Input>
            label="விவசாயி வகை"
            register={register}
            inputName="farmerType"
            helperText={errors.farmerType?.message}
            trigger={trigger}
            setValue={setValue}
          />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <TextInput<IAddFarmersDetailsPage2Input> label="விதைவகை" register={register} inputName="seedType" helperText={errors.seedType?.message} />
          <TextInput<IAddFarmersDetailsPage2Input> label="விலங்குகள்" register={register} inputName="animals" helperText={errors.animals?.message} />
        </Stack>
        <SelectField<IAddFarmersDetailsPage2Input>
          label="குழு உறுப்பினர்"
          register={register}
          inputName="groupMember"
          helperText={errors.groupMember?.message}
          trigger={trigger}
          setValue={setValue}
        />
      </S.InputContainer>
    </>
  );
};

export default FormFieldPage2;
