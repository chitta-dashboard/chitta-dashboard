import { FC } from "react";

import S from "./body.styled";

interface CustomProps {
  id: string;
  onSubmit: () => void;
  children: React.ReactNode;
}

const ModalBody: FC<CustomProps> = ({ children, id, onSubmit }) => {
  return (
    <S.Container>
      <form id={id} onSubmit={onSubmit}>
        {children}
      </form>
    </S.Container>
  );
};

export default ModalBody;
