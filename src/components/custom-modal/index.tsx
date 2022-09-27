import { FC } from "react";

import S from "./customModal.styled";

interface CustomProps {
  children: React.ReactNode | string;
  handleClose: () => void;
  openModal: boolean;
  openAddDecisionModal?: boolean;
}

const CustomModal: FC<CustomProps> = ({ children, handleClose, openModal, openAddDecisionModal }) => {
  return (
    <>
      <S.ModalContainer open={openModal} onClose={handleClose} openAddDecisionModal={openAddDecisionModal}>
        {children}
      </S.ModalContainer>
    </>
  );
};

export default CustomModal;
