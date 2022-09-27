import { Stack } from "@mui/system";

import TextInput from "../../../input-fields/text";
import NumberInput from "../../../input-fields/number";
import FileInput from "../../../input-fields/file";
import DateInput from "../../../input-fields/date";
import S from "./addMdDetailsModal.styled";
import { FC } from "react";
import { IAddMDDetailsFormInput } from "../../type/formInputs";
import { UseFormRegister } from "react-hook-form";

interface CustomProps extends IAddMDDetailsFormInput {
  register: UseFormRegister<IAddMDDetailsFormInput>;
  errors: object;
}

const FormField: FC<CustomProps> = ({ register, errors }) => {
  return (
    <>
      <S.InputContainer spacing={2}>
        <Stack direction={"row"} spacing={2}>
          <TextInput label="பெயர்" register={{ ...register("name") }} helperText={errors.name?.message} />
          <NumberInput label="கைபேசி எண்" register={{ ...register("phoneNumber") }} helperText={errors.phoneNumber?.message} />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <DateInput label="பிறந்த தேதி" register={{ ...register("dob") }} helperText={errors.dob?.message} />
          <TextInput label="தகுதி" register={{ ...register("qualification") }} helperText={errors.qualification?.message} />
        </Stack>
        <Stack>
          <FileInput label="கையெழுத்து" register={{ ...register("signature") }} helperText={errors.signature?.message} />
        </Stack>
      </S.InputContainer>
    </>
  );
};

export default FormField;
