import { Stack } from "@mui/system";

import DateInput from "../../../custom-modal/input-fields/date";
import DescriptionField from "../../../custom-modal/input-fields/description";
import RadioButton from "../../../custom-modal/input-fields/radio";
import SelectField from "../../../custom-modal/input-fields/select";
import TextInput from "../../../custom-modal/input-fields/text";

import S from "./addDecisionsModal.styled";

const FormField = () => {
  return (
    <>
      <S.InputContainer spacing={2}>
        <RadioButton label="அனைத்து குழுக்களையும் தேர்ந்தெடுக்கவா?" />
        <TextInput label="கையெழுத்து" />
        <Stack direction={"row"} spacing={2}>
          <DateInput label="பிறந்த தேதி" />
          <SelectField label="தகுதி" />
        </Stack>
        <DescriptionField label="தீர்மானம்" />
        <Stack direction={"row"} spacing={2}>
          <TextInput label="தொகுப்பாளர்" />
          <TextInput label="பங்கேற்பாளர்கள்" />
        </Stack>
      </S.InputContainer>
    </>
  );
};

export default FormField;
