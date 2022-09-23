import { Stack } from "@mui/system";

import TextInput from "../../../input-fields/text";
import NumberInput from "../../../input-fields/number";
import FileInput from "../../../input-fields/file";
import DateInput from "../../../input-fields/date";
import Props from "../../type/modalProps";

import S from "./addMdDetailsModal.styled";

const FormField = (props: Props) => {
  return (
    <>
      <S.InputContainer spacing={2}>
        <Stack direction={"row"} spacing={2}>
          <TextInput label="பெயர்" openModal={props.openModal} register={{ ...props.register("name") }} helperText={props.error.name?.message} />
          <NumberInput
            label="கைபேசி எண்"
            openModal={props.openModal}
            register={{ ...props.register("phoneNumber") }}
            helperText={props.error.phoneNumber?.message}
          />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <DateInput label="பிறந்த தேதி" openModal={props.openModal} register={{ ...props.register("dob") }} helperText={props.error.dob?.message} />
          <TextInput
            label="தகுதி"
            openModal={props.openModal}
            register={{ ...props.register("qualification") }}
            helperText={props.error.qualification?.message}
          />
        </Stack>
        <Stack>
          <FileInput
            label="கையெழுத்து"
            openModal={props.openModal}
            register={{ ...props.register("signature") }}
            helperText={props.error.signature?.message}
          />
        </Stack>
      </S.InputContainer>
    </>
  );
};

export default FormField;
