import { FC } from "react";

import S from "./backButton.Styled";

interface CustomProps {
  handleClose: () => void;
}

const BackButton: FC<CustomProps> = ({ handleClose }) => {
  return (
    <>
      <S.BackButton onClick={handleClose}>Back</S.BackButton>
    </>
  );
};

export default BackButton;
