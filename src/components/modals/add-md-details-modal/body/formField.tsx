import { Stack } from "@mui/system";

import TextInput from "../../../input-fields/text";
import NumberInput from "../../../input-fields/number";
import FileInput from "../../../input-fields/file";
import DateInput from "../../../input-fields/date";
import S from "./addMdDetailsModal.styled";
import { FC } from "react";
import { IAddMDDetailsFormInput } from "../../type/formInputs";
import { UseFormRegister } from "react-hook-form";

interface CustomProps {
  register: UseFormRegister<IAddMDDetailsFormInput>;
  errors: any;
}

const FormField: FC<CustomProps> = ({ register, errors }) => {
  return (
    <>
      <S.InputContainer spacing={2}>
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
          <FileInput<IAddMDDetailsFormInput> label="கையெழுத்து" register={register} inputName="signature" helperText={errors.signature?.message} />
        </Stack>
      </S.InputContainer>
    </>
  );
};

export default FormField;
