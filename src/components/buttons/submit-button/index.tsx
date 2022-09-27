import { Button, FormControl } from "@mui/material";
import { FC } from "react";

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
