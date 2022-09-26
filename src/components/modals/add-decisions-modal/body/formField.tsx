import { Grid, Stack } from "@mui/material";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import FroalaEditor from "react-froala-wysiwyg";

import DateInput from "../../../input-fields/date";
import MultipleSelectChip from "../../../input-fields/multiselect";
import RadioButton from "../../../input-fields/radio";
import SelectField from "../../../input-fields/select";
import TextInput from "../../../input-fields/text";
import Props from "../../type/modalProps";

import S from "./addDecisionsModal.styled";

const FormField = (props: Props) => {
  return (
    <>
      <S.InputContainer>
        <S.RadioContainer>
          <RadioButton label="அனைத்து குழுக்களையும் தேர்ந்தெடுக்கவா?" openModal={props.openModal} />
        </S.RadioContainer>
        <Grid container spacing={2}>
          <S.ChildContainer item>
            <Stack spacing={2}>
              <TextInput
                register={{ ...props.register("decisionHeading") }}
                helperText={props.error.decisionHeading?.message}
                label="தீர்மானம் தலைப்பு"
                openModal={props.openModal}
              />
              <DateInput
                register={{ ...props.register("dob") }}
                label="பிறந்த தேதி"
                helperText={props.error.dob?.message}
                openModal={props.openModal}
              />
              <SelectField
                register={{ ...props.register("qualification") }}
                helperText={props.error.qualification?.message}
                label="தகுதி"
                openModal={props.openModal}
              />
              <MultipleSelectChip multiSelectLabel="தொகுப்பாளர்" openModal={props.openModal} />
              <MultipleSelectChip multiSelectLabel="பங்கேற்பாளர்கள்" openModal={props.openModal} />
            </Stack>
          </S.ChildContainer>
          <S.ChildContainer item>
            <S.RichTextBoxWrapper>
              <S.RichTextLabel>தீர்மானம்</S.RichTextLabel>
              <FroalaEditor tag="textarea" />
            </S.RichTextBoxWrapper>
          </S.ChildContainer>
        </Grid>
      </S.InputContainer>
    </>
  );
};

export default FormField;
