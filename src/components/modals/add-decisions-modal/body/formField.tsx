import { Grid, Stack } from "@mui/material";

import DateInput from "../../../input-fields/date";
import MultipleSelectChip from "../../../input-fields/multiselect";
import RadioButton from "../../../input-fields/radio";
import SelectField from "../../../input-fields/select";
import TextInput from "../../../input-fields/text";
import { IAddDecisionsFormInput } from "../../type/formInputs";

import S from "./addDecisionsModal.styled";
import Editor from "../../../rich-text/Editor";
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

interface CustomProps {
  register: UseFormRegister<IAddDecisionsFormInput>;
  errors: object;
}

const FormField: FC<CustomProps> = ({ register, errors }) => {
  return (
    <>
      <S.InputContainer>
        <S.RadioContainer>
          <RadioButton label="அனைத்து குழுக்களையும் தேர்ந்தெடுக்கவா?" />
        </S.RadioContainer>
        <Grid container spacing={2}>
          <S.ChildContainer item>
            <Stack spacing={2}>
              <TextInput register={{ ...register("decisionHeading") }} helperText={errors.decisionHeading?.message} label="தீர்மானம் தலைப்பு" />
              <DateInput register={{ ...register("dob") }} label="பிறந்த தேதி" helperText={errors.dob?.message} />
              <SelectField register={{ ...register("qualification") }} helperText={errors.qualification?.message} label="தகுதி" />
              <MultipleSelectChip multiSelectLabel="தொகுப்பாளர்" />
              <MultipleSelectChip multiSelectLabel="பங்கேற்பாளர்கள்" />
            </Stack>
          </S.ChildContainer>
          <S.ChildContainer item>
            <S.RichTextBoxWrapper>
              <S.RichTextLabel>தீர்மானம்</S.RichTextLabel>
              <Editor />
            </S.RichTextBoxWrapper>
          </S.ChildContainer>
        </Grid>
      </S.InputContainer>
    </>
  );
};

export default FormField;
