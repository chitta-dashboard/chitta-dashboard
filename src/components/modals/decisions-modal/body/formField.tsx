import { FC, useEffect } from "react";
import { Control, useWatch } from "react-hook-form";
import { UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { FormHelperText, Grid, Stack } from "@mui/material";

import MultipleSelectChip from "../../../input-fields/multiselect";
import RadioButton from "../../../input-fields/radio";
import SelectField from "../../../input-fields/select";
import TextInput from "../../../input-fields/text";
import Editor from "../../../rich-text/rich-text-editor/index";
import { IAddDecisionsFormInput } from "../../type/formInputs";
import DateTimeInput from "../../../input-fields/dateTime";

import S from "./decisionsModal.styled";

interface CustomProps {
  register: UseFormRegister<IAddDecisionsFormInput>;
  errors: any;
  setValue: UseFormSetValue<IAddDecisionsFormInput>;
  trigger: UseFormTrigger<IAddDecisionsFormInput>;
  control: Control<IAddDecisionsFormInput>;
}

const FormField: FC<CustomProps> = ({ register, errors, setValue, trigger, control }) => {
  const selectAllGroup = useWatch<IAddDecisionsFormInput>({ name: "selectAll", control, defaultValue: "no" });

  useEffect(() => {
    if (selectAllGroup === "yes") setValue("groupName", "~All Groups~");
    else setValue("groupName", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectAllGroup]);

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
              <Stack spacing={2} direction={"row"}>
                <S.DateContainer width={"100%"}>
                  <DateTimeInput<IAddDecisionsFormInput> register={register} inputName="creationTime" label="தீர்மானம் தேதி" />
                  <FormHelperText>{errors.creationTime?.message}</FormHelperText>
                </S.DateContainer>
                {selectAllGroup === "yes" ? null : (
                  <S.QualificationContainer width={"100%"}>
                    <SelectField<IAddDecisionsFormInput>
                      register={register}
                      inputName="groupName"
                      label="குழு"
                      setValue={setValue}
                      trigger={trigger}
                    />
                    <FormHelperText>{errors.groupName?.message}</FormHelperText>
                  </S.QualificationContainer>
                )}
              </Stack>
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
            <Editor
              cb={(plainText: string, richText: string): void => {
                setValue("description", plainText);
                setValue("descriptionRichText", richText);
                trigger("description");
              }}
            />
            <FormHelperText>{errors.description?.message}</FormHelperText>
          </S.ChildContainer>
        </Grid>
      </S.InputContainer>
    </>
  );
};

export default FormField;
