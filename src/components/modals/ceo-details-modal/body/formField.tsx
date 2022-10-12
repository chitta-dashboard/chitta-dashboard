import { FC } from "react";
import { Stack } from "@mui/system";
import { UseFormClearErrors, UseFormRegister, UseFormSetError, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import TextInput from "../../../input-fields/text";
import NumberInput from "../../../input-fields/number";
import DateInput from "../../../input-fields/date";
import DescriptionField from "../../../input-fields/description";
import { IAddCEODetailsFormInput } from "../../type/formInputs";
import S from "./ceoDetailsModal.styled";

interface CustomProps {
  register: UseFormRegister<IAddCEODetailsFormInput>;
  errors: any;
  setValue: UseFormSetValue<IAddCEODetailsFormInput>;
  trigger: UseFormTrigger<IAddCEODetailsFormInput>;
  setError: UseFormSetError<IAddCEODetailsFormInput>;
  clearErrors: UseFormClearErrors<IAddCEODetailsFormInput>;
}

const FormField: FC<CustomProps> = ({ register, errors, setValue, trigger, setError, clearErrors }) => {
  return (
    <S.InputContainer spacing={3}>
      <Stack>
        <TextInput<IAddCEODetailsFormInput> label="பெயர்" register={register} inputName="name" helperText={errors.name?.message} />
      </Stack>
      <Stack direction={"row"} spacing={2}>
        <DateInput<IAddCEODetailsFormInput> label="பிறந்த தேதி" register={register} inputName="dob" helperText={errors.dob?.message} />
        <NumberInput<IAddCEODetailsFormInput>
          label="கைபேசி எண்"
          register={register}
          inputName="phoneNumber"
          helperText={errors.phoneNumber?.message}
        />
      </Stack>
      <Stack>
        <TextInput<IAddCEODetailsFormInput> label="தகுதி" register={register} inputName="qualification" helperText={errors.qualification?.message} />
      </Stack>

      <Stack>
        <DescriptionField<IAddCEODetailsFormInput>
          label="சுயவிவரம்"
          register={register}
          inputName="description"
          helperText={errors.description?.message}
        />
      </Stack>
    </S.InputContainer>
  );
};

export default FormField;
