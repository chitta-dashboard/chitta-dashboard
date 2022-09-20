import { Button } from "@mui/material";

import Props from "../../../modals/type/modalProps";

import S from "./Next.Styled";

const NextButton = (props: Props) => {
  return (
    <>
      <S.ButtonContainer>
        <Button autoFocus onClick={props.handleClose} variant="contained">
          Next
        </Button>
      </S.ButtonContainer>
    </>
  );
};

export default NextButton;