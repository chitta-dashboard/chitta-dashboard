import Props from "../../modals/type/modalProps";

import S from "./YesOrNoButtons.Styled";

const YesOrNoButtons = (props: Props) => {
  return (
    <>
      <S.ButtonContainer>
        <S.NoButton onClick={props.handleClose}>No</S.NoButton>
        <S.YesButton onClick={props.handleClose}>Yes</S.YesButton>
      </S.ButtonContainer>
    </>
  );
};

export default YesOrNoButtons;
