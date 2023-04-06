import { FC } from "react";
import S from "./customModal.styled";

interface CustomProps {
  children: React.ReactNode | string;
  handleClose?: () => void;
  openModal: boolean;
  openAddResolutionModal?: boolean;
}

const CustomModal: FC<CustomProps> = (props) => {
  //constants
  const { children, openModal, openAddResolutionModal } = props;

  return (
    <S.ModalContainer open={openModal} openAddResolutionModal={openAddResolutionModal}>
      {children}
    </S.ModalContainer>
  );
};

export default CustomModal;
