import {  Stack } from "@mui/material";

import Props from "../../type/modalProps";
import ConfirmationIcon from "./confirmationIcon";

import S from "./confirmationModal.styled";

const ConfirmationBody = (props: Props) => {
  return (
    <>
    <S.Container>
      <S.ContainerItems>
        <Stack spacing={4}>
          <ConfirmationIcon />
          <S.DialogueText>Do you want to save changes?</S.DialogueText>
        </Stack>
      </S.ContainerItems>
    </S.Container>
    </>
  );
};

export default ConfirmationBody;
