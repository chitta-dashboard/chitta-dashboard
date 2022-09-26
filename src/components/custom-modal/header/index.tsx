import { FC } from "react";

import TitleCloseButton from "../../buttons/title-close-button";

import S from "./header.styled";

interface CustomProps {
  children: string;
  handleClose: () => void;
}

const ModalHeader: FC<CustomProps> = ({ children, handleClose }) => {
  return (
    <S.ModalHeader>
      <h1>{children}</h1>
      <TitleCloseButton handleClose={handleClose} />
    </S.ModalHeader>
  );
};

export default ModalHeader;
