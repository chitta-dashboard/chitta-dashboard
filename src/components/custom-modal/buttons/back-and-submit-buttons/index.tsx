import { useState } from "react";

import Props from "../../../modals/type/modalProps";

import S from "./BackAndSubmitButtons.Styled";

const BackAndSubmitButtons = (props: Props) => {
  const [openPrev, setOpenPrev] = useState(false);
  const openPrevHandler = () => {
    setOpenPrev(!openPrev);
  };
  return (
    <>
      <S.ButtonContainer>
        <S.BackButton autoFocus onClick={openPrevHandler} variant="contained">
          Back
        </S.BackButton>
        <S.SubmitButton autoFocus onClick={props.handleClose} variant="contained">
          Submit
        </S.SubmitButton>
      </S.ButtonContainer>
    </>
  );
};

export default BackAndSubmitButtons;
