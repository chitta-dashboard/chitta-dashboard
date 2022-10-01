import { FC } from "react";

import S from "./YesOrNoButtons.Styled";

type YesOrNoButtonsProps = {
  yesAction: () => void;
  handleClose: () => void;
};

const YesOrNoButtons: FC<YesOrNoButtonsProps> = (props) => {
  return (
    <>
      <S.ButtonContainer>
        <S.NoButton onClick={props.handleClose}>No</S.NoButton>
        <S.YesButton onClick={props.yesAction}>Yes</S.YesButton>
      </S.ButtonContainer>
    </>
  );
};

export default YesOrNoButtons;
