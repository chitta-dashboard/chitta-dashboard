import { Stack } from "@mui/system";

import DescriptionField from "../../../custom-modal/input-fields/description";
import TextInput from "../../../custom-modal/input-fields/text";

import S from "./addFarmersGroupModal.styled";

const FormField = () => {
  return (
    <>
      <S.InputContainer spacing={2}>
        <TextInput label="கல்வி" />
        <DescriptionField label="கல்வி" />
        <Stack direction={"row"} spacing={2}>
          <TextInput label="கல்வி" />
          <TextInput label="கல்வி" />
          <TextInput label="கல்வி" />
        </Stack>
      </S.InputContainer>
    </>
  );
};

export default FormField;
