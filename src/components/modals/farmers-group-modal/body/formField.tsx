import { FC } from "react";
import { Stack } from "@mui/system";
import { UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { IAddFarmersGroupFormInput } from "../../type/formInputs";
import DescriptionField from "../../../input-fields/description";
import TextInput from "../../../input-fields/text";
import AutoCompleteField from "../../../input-fields/autocomplete";
import S from "./farmersGroupModal.styled";

interface CustomProps {
  register: UseFormRegister<IAddFarmersGroupFormInput>;
  errors: any;
  setValue: UseFormSetValue<IAddFarmersGroupFormInput>;
  trigger: UseFormTrigger<IAddFarmersGroupFormInput>;
}

const FormField: FC<CustomProps> = ({ register, errors, setValue, trigger }) => {
  return (
    <S.InputContainer spacing={3}>
      <TextInput<IAddFarmersGroupFormInput> label="குழு பெயர்" register={register} inputName="groupName" helperText={errors.groupName?.message} />
      <DescriptionField label="விளக்கம்" register={register} inputName="explanation" helperText={errors.explanation?.message} />
      <Stack direction={"row"} spacing={2}>
        <AutoCompleteField
          label="தலைவர்"
          register={register}
          inputName="chairman"
          helperText={errors.chairman?.message}
          setValue={setValue}
          trigger={trigger}
          selectOptions={[
            { label: "option1", id: 1 },
            { label: "option2", id: 2 },
            { label: "option3", id: 3 },
            { label: "option4", id: 4 },
          ]}
        />
        <AutoCompleteField
          label="பொருளாளர்"
          register={register}
          inputName="treasurer"
          helperText={errors.treasurer?.message}
          setValue={setValue}
          trigger={trigger}
          selectOptions={[
            { label: "option1", id: 1 },
            { label: "option2", id: 2 },
            { label: "option3", id: 3 },
            { label: "option4", id: 4 },
          ]}
        />
        <AutoCompleteField
          label="செயலாளர்"
          register={register}
          inputName="secretary"
          helperText={errors.secretary?.message}
          setValue={setValue}
          trigger={trigger}
          selectOptions={[
            { label: "option1", id: 1 },
            { label: "option2", id: 2 },
            { label: "option3", id: 3 },
            { label: "option4", id: 4 },
          ]}
        />
      </Stack>
    </S.InputContainer>
  );
};

export default FormField;
