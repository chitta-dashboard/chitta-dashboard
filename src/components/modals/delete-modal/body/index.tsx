import { DialogContent, Stack } from "@mui/material";

import Props from "../../type/modalProps";
import DeleteIcon from "./deleteIcon";

import S from "./deleteModal.styled";

const DeleteBody = (props: Props) => {
  return (
    <>
      <DialogContent>
        <Stack spacing={2}>
          <DeleteIcon />
          <S.DialogueText>Do you want to delete the current entry?</S.DialogueText>
        </Stack>
      </DialogContent>
    </>
  );
};

export default DeleteBody;
