import { FC } from "react";
import { Stack } from "@mui/system";
import { Control, UseFormRegister, UseFormSetValue, UseFormTrigger, UseFormGetValues, UseFormUnregister } from "react-hook-form";
import { IAddFarmersGroupFormInput } from "../../type/formInputs";
import DescriptionField from "../../../input-fields/description";
import TextInput from "../../../input-fields/text";
import Input from "../../../input-fields/input/input";
import S from "./farmersGroupModal.styled";

interface CustomProps {
  register: UseFormRegister<IAddFarmersGroupFormInput>;
  errors: any;
  setValue: UseFormSetValue<IAddFarmersGroupFormInput>;
  trigger: UseFormTrigger<IAddFarmersGroupFormInput>;
  control?: Control;
  getValues: UseFormGetValues<IAddFarmersGroupFormInput>;
  unregister: UseFormUnregister<IAddFarmersGroupFormInput>;
}

const FormField: FC<CustomProps> = ({ register, errors, setValue, trigger, control }) => {
  return (
    <S.InputContainer spacing={3}>
      <TextInput<IAddFarmersGroupFormInput> label="குழு பெயர்" register={register} inputName="groupName" helperText={errors.groupName?.message} />
      <DescriptionField label="விளக்கம்" register={register} inputName="explanation" helperText={errors.explanation?.message} />
      <Stack direction={"row"} spacing={2}>
        <Input
          name="chairman"
          type="autocomplete"
          control={control}
          rules={{ required: "required" }}
          options={{
            label: "தலைவர்",
            selectoptions: ["option-1", "option-2", "option-3"],
          }}
        />
        <Input
          name="treasurer"
          type="autocomplete"
          control={control}
          rules={{ required: "required" }}
          options={{
            label: "பொருளாளர்",
            selectoptions: ["option-1", "option-2", "option-3"],
          }}
        />
        <Input
          name="secretary"
          type="autocomplete"
          control={control}
          rules={{ required: "required" }}
          options={{
            label: "செயலாளர்",
            selectoptions: ["option-1", "option-2", "option-3"],
          }}
        />
      </Stack>
    </S.InputContainer>
  );
};

export default FormField;
