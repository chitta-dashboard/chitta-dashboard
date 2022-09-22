import { Box, Grid, Stack } from "@mui/material";

import DateInput from "../../../input-fields/date";
import DescriptionField from "../../../input-fields/description";
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
        <RadioButton label="அனைத்து குழுக்களையும் தேர்ந்தெடுக்கவா?" openModal={props.openModal} />
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
            <Box>
              <DescriptionField openModal={props.openModal} label="தீர்மானம்" />
            </Box>
          </S.ChildContainer>
        </Grid>
      </S.InputContainer>
    </>
  );
};

export default FormField;
