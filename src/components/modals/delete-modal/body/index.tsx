import { FC } from "react";
import { Stack } from "@mui/material";
import S from "./deleteModal.styled";
import DeleteIcon from "./deleteIcon";

interface DeleteProps {
  deleteMessage?: JSX.Element;
}

const DeleteBody: FC<DeleteProps> = ({ deleteMessage }) => {
  const message = deleteMessage ? deleteMessage : "Do you want to delete the current entry?";

  return (
    <S.Container>
      <S.ContainerItems>
        <Stack spacing={3}>
          <DeleteIcon />
          <S.DialogueText>{message}</S.DialogueText>
        </Stack>
      </S.ContainerItems>
    </S.Container>
  );
};

export default DeleteBody;
