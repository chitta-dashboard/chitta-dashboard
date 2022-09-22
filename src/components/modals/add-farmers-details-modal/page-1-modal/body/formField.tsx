import { Stack } from "@mui/system";

import DateInput from "../../../../input-fields/date";
import NumberInput from "../../../../input-fields/number";
import TextInput from "../../../../input-fields/text";
import Props from "../../../type/modalProps";

import S from "./page1Modal.styled";

const FormField = (props: Props) => {
  return (
    <>
      <S.InputContainer spacing={2}>
        <Stack direction={"row"} spacing={2}>
          <TextInput label="பெயர்" openModal={props.openModal} />
          <TextInput label="தந்தையின் பெயர் " openModal={props.openModal} />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <TextInput label="பாலினம்" openModal={props.openModal} />
          <TextInput label="கணவன்/மணைவி பெயர்" openModal={props.openModal} />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <DateInput label="பிறந்த தேதி" openModal={props.openModal} />
          <TextInput label="குழு" openModal={props.openModal} />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <NumberInput label="கைபேசி எண்" openModal={props.openModal} />
          <NumberInput label="ஆதார் எண்" openModal={props.openModal} />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <NumberInput label="வாக்காளர் அடையாள எண்" openModal={props.openModal} />
          <NumberInput label="ஏக்கர்" openModal={props.openModal} />
        </Stack>
      </S.InputContainer>
    </>
  );
};

export default FormField;
