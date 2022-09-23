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
          <TextInput
            label="கல்வி"
            openModal={props.openModal}
            register={{ ...props.register("education") }}
            helperText={props.error.education?.message}
          />
          <TextInput
            label="கிராமம்"
            openModal={props.openModal}
            register={{ ...props.register("village") }}
            helperText={props.error.village?.message}
          />
          <TextInput
            label="அஞ்சல் குறியீடு"
            openModal={props.openModal}
            register={{ ...props.register("postalNo") }}
            helperText={props.error.postalNo?.message}
          />
        </Stack>
        <DescriptionField
          label="முகவரி"
          openModal={props.openModal}
          register={{ ...props.register("address") }}
          helperText={props.error.address?.message}
        />
        <Stack direction={"row"} spacing={2}>
          <TextInput label="தாலுக்கா" openModal={props.openModal} register={{ ...props.register("taluk") }} helperText={props.error.taluk?.message} />
          <TextInput
            label="மாவட்டம்"
            openModal={props.openModal}
            register={{ ...props.register("district") }}
            helperText={props.error.district?.message}
          />
        </Stack>
        <NumberInput
          label="கணக்கெடுப்பு எண்"
          openModal={props.openModal}
          register={{ ...props.register("surveyNo") }}
          helperText={props.error.surveyNo?.message}
        />
        <Stack direction={"row"} spacing={2}>
          <SelectField
            label="நில வகை"
            openModal={props.openModal}
            register={{ ...props.register("landType") }}
            helperText={props.error.landType?.message}
          />
          <SelectField
            label="நீர் வகை"
            openModal={props.openModal}
            register={{ ...props.register("waterType") }}
            helperText={props.error.waterType?.message}
          />
          <SelectField
            label="விவசாயி வகை"
            openModal={props.openModal}
            register={{ ...props.register("farmerType") }}
            helperText={props.error.farmerType?.message}
          />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <TextInput
            label="விதைவகை"
            openModal={props.openModal}
            register={{ ...props.register("seedType") }}
            helperText={props.error.seedType?.message}
          />
          <TextInput
            label="விலங்குகள்"
            openModal={props.openModal}
            register={{ ...props.register("animals") }}
            helperText={props.error.animals?.message}
          />
        </Stack>
        <SelectField
          label="குழு உறுப்பினர்"
          openModal={props.openModal}
          register={{ ...props.register("groupMember") }}
          helperText={props.error.groupMember?.message}
        />
      </S.InputContainer>
    </>
  );
};

export default FormField;
