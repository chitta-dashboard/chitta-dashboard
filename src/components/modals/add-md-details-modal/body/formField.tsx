import { Stack } from "@mui/system";

import TextInput from "../../../custom-modal/input-fields/text";
import NumberInput from "../../../custom-modal/input-fields/number";
import FileInput from "../../../custom-modal/input-fields/file";
import DateInput from "../../../custom-modal/input-fields/date";

import S from "./addMdDetailsModal.styled";

const FormField = () => {
  return (
    <>
      <S.InputContainer spacing={2}>
        <Stack direction={"row"} spacing={2}>
          <TextInput label="பெயர்" />
          <NumberInput label="கைபேசி எண்" />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <DateInput label="பிறந்த தேதி" />
          <TextInput label="தகுதி" />
        </Stack>
        <Stack>
          <FileInput label=" கையெழுத்து" />
        </Stack>
      </S.InputContainer>
    </>
  );
};

export default FormField;
