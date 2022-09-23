import { Stack } from "@mui/system";

import DateInput from "../../../../input-fields/date";
import NumberInput from "../../../../input-fields/number";
import TextInput from "../../../../input-fields/text";
import Props from "../../../type/modalProps";

import S from "./page1Modal.styled";

const FormField = (props: Props) => {
  return (
    <>
      <S.InputContainer spacing={2}>
        <Stack direction={"row"} spacing={2}>
          <TextInput label="பெயர்" openModal={props.openModal} register={{ ...props.register("name") }} helperText={props.error.name?.message} />
          <TextInput
            label="தந்தையின் பெயர்"
            openModal={props.openModal}
            register={{ ...props.register("fatherName") }}
            helperText={props.error.fatherName?.message}
          />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <TextInput label="பாலினம்" openModal={props.openModal} register={{ ...props.register("sex") }} helperText={props.error.sex?.message} />
          <TextInput
            label="கணவன்/மணைவி பெயர்"
            openModal={props.openModal}
            register={{ ...props.register("spouseName") }}
            helperText={props.error.spouseName?.message}
          />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <DateInput label="பிறந்த தேதி" openModal={props.openModal} register={{ ...props.register("dob") }} helperText={props.error.dob?.message} />
          <TextInput label="குழு" openModal={props.openModal} register={{ ...props.register("group") }} helperText={props.error.group?.message} />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <NumberInput
            label="கைபேசி எண்"
            openModal={props.openModal}
            register={{ ...props.register("phoneNumber") }}
            helperText={props.error.phoneNumber?.message}
          />
          <NumberInput
            label="ஆதார் எண்"
            openModal={props.openModal}
            register={{ ...props.register("addhaarNo") }}
            helperText={props.error.addhaarNo?.message}
          />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <NumberInput
            label="வாக்காளர் அடையாள எண்"
            openModal={props.openModal}
            register={{ ...props.register("voterIdNo") }}
            helperText={props.error.voterIdNo?.message}
          />
          <NumberInput label="ஏக்கர்" openModal={props.openModal} register={{ ...props.register("acre") }} helperText={props.error.acre?.message} />
        </Stack>
      </S.InputContainer>
    </>
  );
};

export default FormField;
