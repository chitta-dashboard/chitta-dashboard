import { FC } from "react";
import { Stack } from "@mui/material";
import S from "./confirmationModal.styled";
import ConfirmationIcon from "./confirmationIcon";

interface ConfirmProps {
  confirmMessage?: JSX.Element | boolean;
}

const ConfirmationBody: FC<ConfirmProps> = ({ confirmMessage }) => {
  const message = confirmMessage ? confirmMessage : "Do you want to save changes?";
  return (
    <S.Container>
      <S.ContainerItems>
        <Stack spacing={4}>
          <ConfirmationIcon />
          <S.DialogueText>{message}</S.DialogueText>
        </Stack>
      </S.ContainerItems>
    </S.Container>
  );
};

export default ConfirmationBody;
