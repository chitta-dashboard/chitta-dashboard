import { Button, FormControl } from "@mui/material";

import Props from "../../modals/type/modalProps";

import S from "./SubmitButton.Styled";

const SubmitButton = (props: Props) => {
  return (
    <>
      <S.ButtonContainer>
        <FormControl>
          <Button autoFocus variant="contained" type="submit">
            Submit
          </Button>
        </FormControl>
      </S.ButtonContainer>
    </>
  );
};

export default SubmitButton;
