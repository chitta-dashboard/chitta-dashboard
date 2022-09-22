import { Stack } from "@mui/system";

import DescriptionField from "../../../input-fields/description";
import TextInput from "../../../input-fields/text";
import Props from "../../type/modalProps";

import S from "./addFarmersGroupModal.styled";

const FormField = (props: Props) => {
  return (
    <>
      <S.InputContainer spacing={2}>
        <TextInput label="குழு பெயர்" openModal={props.openModal} />
        <DescriptionField label="விளக்கம்" openModal={props.openModal} />
        <Stack direction={"row"} spacing={2}>
          <TextInput label="தலைவர்" openModal={props.openModal} />
          <TextInput label="பொருளாளர்" openModal={props.openModal} />
          <TextInput label="செயலாளர்" openModal={props.openModal} />
        </Stack>
      </S.InputContainer>
    </>
  );
};

export default FormField;
