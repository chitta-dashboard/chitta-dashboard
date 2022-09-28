import { FC } from "react";
import { Button } from "@mui/material";

import S from "./SubmitButton.Styled";

interface CustomProps {
  formId?: string;
  handleSubmit: () => void;
}

const SubmitButton: FC<CustomProps> = ({ handleSubmit, formId }) => {
  return (
    <>
      <S.ButtonContainer>
        <Button type="submit" onSubmit={handleSubmit} form={formId as string}>
          Submit
        </Button>
      </S.ButtonContainer>
    </>
  );
};

export default SubmitButton;
