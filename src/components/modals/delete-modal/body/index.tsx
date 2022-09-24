import { Stack } from "@mui/material";

import Props from "../../type/modalProps";
import DeleteIcon from "./deleteIcon";

import S from "./deleteModal.styled";

const DeleteBody = (props: Props) => {
  return (
    <>
      <S.Container>
        <S.ContainerItems>
          <Stack spacing={3}>
            <DeleteIcon />
            <S.DialogueText>Do you want to delete the current entry?</S.DialogueText>
          </Stack>
        </S.ContainerItems>
      </S.Container>
    </>
  );
};

export default DeleteBody;
