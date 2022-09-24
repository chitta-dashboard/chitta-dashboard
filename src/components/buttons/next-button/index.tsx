import { Button } from "@mui/material";

import Props from "../../modals/type/modalProps";

import S from "./Next.Styled";

const NextButton = (props: Props) => {
  return (
    <>
      <S.ButtonContainer>
        <Button  type="submit" onSubmit={props.submit}>
          Next
        </Button>
      </S.ButtonContainer>
    </>
  );
};

export default NextButton;
