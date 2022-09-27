import { FC } from "react";
import S from "./YesOrNoButtons.Styled";

interface CustomProps {
  handleClose: () => void;
}

const YesOrNoButtons: FC<CustomProps> = ({ handleClose }) => {
  return (
    <>
      <S.ButtonContainer>
        <S.NoButton onClick={handleClose}>No</S.NoButton>
        <S.YesButton onClick={handleClose}>Yes</S.YesButton>
      </S.ButtonContainer>
    </>
  );
};

export default YesOrNoButtons;
