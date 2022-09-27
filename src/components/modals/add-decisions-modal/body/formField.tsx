import { FormHelperText, Grid, Stack } from "@mui/material";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";

import DateInput from "../../../input-fields/date";
import MultipleSelectChip from "../../../input-fields/multiselect";
import RadioButton from "../../../input-fields/radio";
import SelectField from "../../../input-fields/select";
import TextInput from "../../../input-fields/text";
import { IAddDecisionsFormInput } from "../../type/formInputs";

import S from "./addDecisionsModal.styled";
import Editor from "../../../rich-text/Editor";
import { FC } from "react";
import { UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form";

interface CustomProps {
  register: UseFormRegister<IAddDecisionsFormInput>;
  errors: any;
  setValue: UseFormSetValue<IAddDecisionsFormInput>;
  trigger: UseFormTrigger<IAddDecisionsFormInput>;
}

const FormField: FC<CustomProps> = ({ register, errors, setValue, trigger }) => {
  return (
    <>
      <S.InputContainer>
        <S.RadioContainer>
          <RadioButton<IAddDecisionsFormInput> register={register} inputName="selectAll" label="அனைத்து குழுக்களையும் தேர்ந்தெடுக்கவா?" />
          <FormHelperText>{errors.selectAll?.message}</FormHelperText>
        </S.RadioContainer>
        <Grid container spacing={2}>
          <S.ChildContainer item>
            <Stack spacing={2}>
              <TextInput<IAddDecisionsFormInput> register={register} inputName="decisionHeading" label="தீர்மானம் தலைப்பு" />
              <FormHelperText>{errors.decisionHeading?.message}</FormHelperText>
              <DateInput<IAddDecisionsFormInput> register={register} inputName="dob" label="பிறந்த தேதி" />
              <FormHelperText>{errors.dob?.message}</FormHelperText>
              <SelectField<IAddDecisionsFormInput>
                register={register}
                inputName="qualification"
                label="தகுதி"
                setValue={setValue}
                trigger={trigger}
              />
              <FormHelperText>{errors.qualification?.message}</FormHelperText>
              <MultipleSelectChip<IAddDecisionsFormInput>
                register={register}
                inputName="presenter"
                multiSelectLabel="தொகுப்பாளர்"
                setValue={setValue}
                trigger={trigger}
              />
              <FormHelperText>{errors.presenter?.message}</FormHelperText>
              <MultipleSelectChip<IAddDecisionsFormInput>
                register={register}
                inputName="participator"
                multiSelectLabel="பங்கேற்பாளர்கள்"
                setValue={setValue}
                trigger={trigger}
              />
              <FormHelperText>{errors.participator?.message}</FormHelperText>
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
