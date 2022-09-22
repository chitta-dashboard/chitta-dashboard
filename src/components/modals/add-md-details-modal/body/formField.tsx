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
          <TextInput label="பெயர்" openModal={props.openModal} />
          <NumberInput label="கைபேசி எண்" openModal={props.openModal} />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <DateInput label="பிறந்த தேதி" openModal={props.openModal} />
          <TextInput label="தகுதி" openModal={props.openModal} />
        </Stack>
        <Stack>
          <FileInput label=" கையெழுத்து" openModal={props.openModal} />
        </Stack>
      </S.InputContainer>
    </>
  );
};

export default FormField;
