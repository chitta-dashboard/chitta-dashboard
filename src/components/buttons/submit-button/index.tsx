import { Button, FormControl } from "@mui/material";
import { FC } from "react";

import S from "./SubmitButton.Styled";

interface CustomProps {
  handleSubmit?: () => void;
}

const SubmitButton: FC<CustomProps> = ({ submit }) => {
  return (
    <>
      <S.ButtonContainer>
        <FormControl>
          <Button type="submit" onSubmit={submit}>
            Submit
          </Button>
        </FormControl>
      </S.ButtonContainer>
    </>
  );
};

export default SubmitButton;
