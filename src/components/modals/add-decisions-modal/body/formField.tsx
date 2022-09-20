import { Stack } from "@mui/system";

import DateInput from "../../../input-fields/date";
import DescriptionField from "../../../input-fields/description";
import RadioButton from "../../../input-fields/radio";
import SelectField from "../../../input-fields/select";
import TextInput from "../../../input-fields/text";
import Props from "../../type/modalProps";

import S from "./addDecisionsModal.styled";

const FormField = (props: Props) => {
  return (
    <>
      <S.InputContainer spacing={2}>
        <RadioButton label="அனைத்து குழுக்களையும் தேர்ந்தெடுக்கவா?" openModal={props.openModal} />
        <TextInput label="கையெழுத்து" openModal={props.openModal} />
        <Stack direction={"row"} spacing={2}>
          <DateInput label="பிறந்த தேதி" openModal={props.openModal} />
          <SelectField label="தகுதி" openModal={props.openModal} />
        </Stack>
        <DescriptionField label="தீர்மானம்" openModal={props.openModal} />
        <Stack direction={"row"} spacing={2}>
          <TextInput label="தொகுப்பாளர்" openModal={props.openModal} />
          <TextInput label="பங்கேற்பாளர்கள்" openModal={props.openModal} />
        </Stack>
      </S.InputContainer>
    </>
  );
};

export default FormField;
