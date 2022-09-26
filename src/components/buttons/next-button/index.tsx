import { Button } from "@mui/material";
import { FC } from "react";

import S from "./Next.Styled";

interface CustomProps {
  submit: () => void;
}

const NextButton: FC<CustomProps> = ({ submit }) => {
  return (
    <>
      <S.ButtonContainer>
        <Button type="submit" onSubmit={submit}>
          Next
        </Button>
      </S.ButtonContainer>
    </>
  );
};

export default NextButton;
