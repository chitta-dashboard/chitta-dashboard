import { IconButton } from "@mui/material";

import Props from "../../../modals/type/modalProps";

import S from "./titleCloseButton.styled";

const TitleCloseButton = (props: Props) => {
  return (
    <>
      <IconButton onClick={props.handleClose}>
        <S.Wrapper>close</S.Wrapper>
      </IconButton>
    </>
  );
};

export default TitleCloseButton;
