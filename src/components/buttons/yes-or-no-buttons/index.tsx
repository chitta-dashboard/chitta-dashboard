import Props from "../../modals/type/modalProps";

import S from "./YesOrNoButtons.Styled";

const YesOrNo = (props: Props) => {
  return (
    <>
      <S.ButtonContainer>
        <S.NoButton autoFocus onClick={props.handleClose}>
          No
        </S.NoButton>
        <S.YesButton autoFocus onClick={props.handleClose}>
          Yes
        </S.YesButton>
      </S.ButtonContainer>
    </>
  );
};

export default YesOrNo;
