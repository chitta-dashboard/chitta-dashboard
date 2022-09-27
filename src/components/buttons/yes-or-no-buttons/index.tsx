import { FC } from "react";
import S from "./YesOrNoButtons.Styled";

interface CustomProps {
  handleClose: () => void;
  yesAction: () => void;
}

const YesOrNoButtons: FC<CustomProps> = ({ handleClose, yesAction }) => {
  return (
    <>
      <S.ButtonContainer>
        <S.NoButton onClick={handleClose}>No</S.NoButton>
        <S.YesButton
          onClick={() => {
            yesAction();
            handleClose();
          }}
        >
          Yes
        </S.YesButton>
      </S.ButtonContainer>
    </>
  );
};

export default YesOrNoButtons;
