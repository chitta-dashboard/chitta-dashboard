import { FC } from "react";
import S from "./YesOrNoButtons.Styled";

type YesOrNoButtonsProps = {
  yesAction: () => void;
  handleClose: () => void;
};

const YesOrNoButtons: FC<YesOrNoButtonsProps> = ({ handleClose, yesAction }) => {
  return (
    <>
      <S.ButtonContainer>
        <S.NoButton onClick={handleClose}>No</S.NoButton>
        <S.YesButton onClick={yesAction}>Yes</S.YesButton>
      </S.ButtonContainer>
    </>
  );
};

export default YesOrNoButtons;
