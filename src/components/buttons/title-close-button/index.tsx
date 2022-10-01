import { IconButton } from "@mui/material";
import { FC } from "react";

import S from "./titleCloseButton.styled";

const TitleCloseButton: FC<{ handleClose: () => void }> = ({ handleClose }) => {
  return (
    <>
      <IconButton onClick={handleClose}>
        <S.Wrapper>close</S.Wrapper>
      </IconButton>
    </>
  );
};

export default TitleCloseButton;
