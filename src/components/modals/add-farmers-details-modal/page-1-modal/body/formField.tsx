import { Stack } from "@mui/system";

import DateInput from "../../../../custom-modal/input-fields/date";
import NumberInput from "../../../../custom-modal/input-fields/number";
import TextInput from "../../../../custom-modal/input-fields/text";

import S from "./page1Modal.styled";

const FormField = () => {
  return (
    <>
      <S.InputContainer spacing={2}>
        <Stack direction={"row"} spacing={2}>
          <TextInput label="பெயர்" />
          <TextInput label="தந்தையின் பெயர் " />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <TextInput label="பாலினம்" />
          <TextInput label="கணவன்/மணைவி பெயர்" />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <DateInput label="பிறந்த தேதி" />
          <TextInput label="குழு" />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <NumberInput label="கைபேசி எண்" />
          <NumberInput label="ஆதார் எண்" />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <NumberInput label="வாக்காளர் அடையாள எண்" />
          <NumberInput label="ஏக்கர்" />
        </Stack>
      </S.InputContainer>
    </>
  );
};

export default FormField;
