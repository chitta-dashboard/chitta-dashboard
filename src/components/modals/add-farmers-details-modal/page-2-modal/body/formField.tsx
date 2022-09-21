import { Stack } from "@mui/system";

import DescriptionField from "../../../../custom-modal/input-fields/description";
import NumberInput from "../../../../custom-modal/input-fields/number";
import SelectField from "../../../../custom-modal/input-fields/select";
import TextInput from "../../../../custom-modal/input-fields/text";

import S from "./page2Modal.styled";

const FormField = () => {
  return (
    <>
      <S.InputContainer spacing={2}>
        <Stack direction={"row"} spacing={2}>
          <TextInput label="கல்வி" />
          <TextInput label="கிராமம்" />
          <TextInput label="அஞ்சல் குறியீடு" />
        </Stack>
        <DescriptionField label="முகவரி" />
        <Stack direction={"row"} spacing={2}>
          <TextInput label="தாலுக்கா" />
          <TextInput label="மாவட்டம்" />
        </Stack>
        <NumberInput label="கணக்கெடுப்பு எண்" />
        <Stack direction={"row"} spacing={2}>
          <SelectField label="நில வகை" />
          <SelectField label="நீர் வகை" />
          <SelectField label="புல வகை" />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <TextInput label="விதைவகை" />
          <TextInput label="விலங்குகள்" />
        </Stack>
        <SelectField label="குழு உறுப்பினர்" />
      </S.InputContainer>
    </>
  );
};

export default FormField;
