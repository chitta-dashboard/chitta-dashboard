import { FC } from "react";
import { Stack } from "@mui/material";
import ConfirmationIcon from "./confirmationIcon";
import S from "./confirmationModal.styled";

interface ConfirmProps {
  userConfirm?: string;
}

const ConfirmationBody: FC<ConfirmProps> = ({ userConfirm }) => {
  const message = userConfirm ? `Do you want to remove ${userConfirm} from mdList?` : "Do you want to save changes?";
  return (
    <>
      <S.Container>
        <S.ContainerItems>
          <Stack spacing={4}>
            <ConfirmationIcon />
            <S.DialogueText>{message}</S.DialogueText>
          </Stack>
        </S.ContainerItems>
      </S.Container>
    </>
  );
};

export default ConfirmationBody;
