import Props from "../../modals/type/modalProps";

import S from "./backButton.Styled";

const BackButton = (props: Props) => {
  return (
    <>
      <S.BackButton  onClick={props.handleClose}>
        Back
      </S.BackButton>
    </>
  );
};

export default BackButton;
