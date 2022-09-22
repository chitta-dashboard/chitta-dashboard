import { Button } from "@mui/material";

import Props from "../../modals/type/modalProps";

import S from "./SubmitButton.Styled";

const SubmitButton = (props: Props) => {
  return (
    <>
      <S.ButtonContainer>
        <Button autoFocus onClick={props.handleClose} variant="contained">
          Submit
        </Button>
      </S.ButtonContainer>
    </>
  );
};

export default SubmitButton;
