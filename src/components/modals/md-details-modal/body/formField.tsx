import { FC } from "react";
import { Stack } from "@mui/system";
import { UseFormClearErrors, UseFormRegister, UseFormSetError, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import TextInput from "../../../input-fields/text";
import NumberInput from "../../../input-fields/number";
import FileInput from "../../../input-fields/file";
import DateInput from "../../../input-fields/date";
import { IAddMDDetailsFormInput } from "../../type/formInputs";
import S from "./mdDetailsModal.styled";

interface CustomProps {
  register: UseFormRegister<IAddMDDetailsFormInput>;
  errors: any;
  setValue: UseFormSetValue<IAddMDDetailsFormInput>;
  trigger: UseFormTrigger<IAddMDDetailsFormInput>;
  setError: UseFormSetError<IAddMDDetailsFormInput>;
  clearErrors: UseFormClearErrors<IAddMDDetailsFormInput>;
}

const FormField: FC<CustomProps> = ({ register, errors, setValue, trigger, setError, clearErrors }) => {
  return (
    <S.InputContainer spacing={3}>
      <Stack direction={"row"} spacing={2}>
        <TextInput<IAddMDDetailsFormInput> label="பெயர்" register={register} inputName="name" helperText={errors.name?.message} />
        <NumberInput<IAddMDDetailsFormInput>
          label="கைபேசி எண்"
          register={register}
          inputName="phoneNumber"
          helperText={errors.phoneNumber?.message}
        />
      </Stack>
      <Stack direction={"row"} spacing={2}>
        <DateInput<IAddMDDetailsFormInput> label="பிறந்த தேதி" register={register} inputName="dob" helperText={errors.dob?.message} />
        <TextInput<IAddMDDetailsFormInput> label="தகுதி" register={register} inputName="qualification" helperText={errors.qualification?.message} />
      </Stack>
      <Stack>
        <FileInput<IAddMDDetailsFormInput>
          label="கையெழுத்து"
          register={register}
          inputName="signature"
          helperText={errors.signature?.message}
          setValue={setValue}
          trigger={trigger}
          setError={setError}
          clearErrors={clearErrors}
        />
      </Stack>
    </S.InputContainer>
  );
};

export default FormField;
