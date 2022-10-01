import { Button } from "@mui/material";
import { FC } from "react";

import S from "./Next.Styled";

interface CustomProps {
  handleNext: () => void;
  formId?: string;
}

const NextButton: FC<CustomProps> = ({ handleNext, formId }) => {
  return (
    <>
      <S.ButtonContainer>
        <Button type="submit" onSubmit={handleNext} form={formId as string}>
          Next
        </Button>
      </S.ButtonContainer>
    </>
  );
};

export default NextButton;
