import { Stack } from "@mui/system";

import DescriptionField from "../../../input-fields/description";
import TextInput from "../../../input-fields/text";
import Props from "../../type/modalProps";

import S from "./addFarmersGroupModal.styled";

const FormField = (props: Props) => {
  return (
    <>
      <S.InputContainer spacing={2}>
        <TextInput
          label="குழு பெயர்"
          openModal={props.openModal}
          register={{ ...props.register("groupName") }}
          helperText={props.error.groupName?.message}
        />
        <DescriptionField
          label="விளக்கம்"
          openModal={props.openModal}
          register={{ ...props.register("explanation") }}
          helperText={props.error.explanation?.message}
        />
        <Stack direction={"row"} spacing={2}>
          <TextInput
            label="தலைவர்"
            openModal={props.openModal}
            register={{ ...props.register("chairman") }}
            helperText={props.error.chairman?.message}
          />
          <TextInput
            label="பொருளாளர்"
            openModal={props.openModal}
            register={{ ...props.register("treasurer") }}
            helperText={props.error.treasurer?.message}
          />
          <TextInput
            label="செயலாளர்"
            openModal={props.openModal}
            register={{ ...props.register("secretary") }}
            helperText={props.error.secretary?.message}
          />
        </Stack>
      </S.InputContainer>
    </>
  );
};

export default FormField;
