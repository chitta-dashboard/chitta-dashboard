import { FC } from "react";
import S from "./customModal.styled";

interface CustomProps {
  children: React.ReactNode | string;
  handleClose?: () => void;
  openModal: boolean;
  openAddDecisionModal?: boolean;
}

const CustomModal: FC<CustomProps> = ({ children, openModal, openAddDecisionModal }) => {
  return (
    <S.ModalContainer open={openModal} openAddDecisionModal={openAddDecisionModal}>
      {children}
    </S.ModalContainer>
  );
};

export default CustomModal;
