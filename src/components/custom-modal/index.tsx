import Props from "../modals/type/modalProps";

import S from "./customModal.styled";

interface CustomModalInterface extends Props {
  children: React.ReactNode | string;
}

const CustomModal = (props: CustomModalInterface) => {
  return (
    <>
      <S.ModalContainer  open={props.openModal} onClose={props.handleClose} addDecision={props.addDecision}>
        {props.children}
      </S.ModalContainer>
    </>
  );
};

export default CustomModal;
