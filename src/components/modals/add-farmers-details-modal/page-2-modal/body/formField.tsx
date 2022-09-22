import { Stack } from "@mui/system";

import DescriptionField from "../../../../input-fields/description";
import NumberInput from "../../../../input-fields/number";
import SelectField from "../../../../input-fields/select";
import TextInput from "../../../../input-fields/text";
import Props from "../../../type/modalProps";

import S from "./page2Modal.styled";

const FormField = (props: Props) => {
  return (
    <>
      <S.InputContainer spacing={2}>
        <Stack direction={"row"} spacing={2}>
          <TextInput label="கல்வி" openModal={props.openModal} />
          <TextInput label="கிராமம்" openModal={props.openModal} />
          <TextInput label="அஞ்சல் குறியீடு" openModal={props.openModal} />
        </Stack>
        <DescriptionField label="முகவரி" openModal={props.openModal} />
        <Stack direction={"row"} spacing={2}>
          <TextInput label="தாலுக்கா" openModal={props.openModal} />
          <TextInput label="மாவட்டம்" openModal={props.openModal} />
        </Stack>
        <NumberInput label="கணக்கெடுப்பு எண்" openModal={props.openModal} />
        <Stack direction={"row"} spacing={2}>
          <SelectField label="நில வகை" openModal={props.openModal} />
          <SelectField label="நீர் வகை" openModal={props.openModal} />
          <SelectField label="புல வகை" openModal={props.openModal} />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <TextInput label="விதைவகை" openModal={props.openModal} />
          <TextInput label="விலங்குகள்" openModal={props.openModal} />
        </Stack>
        <SelectField label="குழு உறுப்பினர்" openModal={props.openModal} />
      </S.InputContainer>
    </>
  );
};

export default FormField;
