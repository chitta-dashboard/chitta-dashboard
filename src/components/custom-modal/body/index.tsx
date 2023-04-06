import { FC } from "react";
import S from "./body.styled";

interface CustomProps {
  id?: string;
  onSubmit?: () => void;
  children: React.ReactNode;
  isPadding?: boolean;
}

const ModalBody: FC<CustomProps> = (props) => {
  //constant
  const { children, id, onSubmit, isPadding } = props;

  return (
    <S.Container isPadding={isPadding}>
      <form id={id} onSubmit={onSubmit}>
        {children}
      </form>
    </S.Container>
  );
};

export default ModalBody;
