import Props from "../modals/type/modalProps";

import S from "./customModal.styled";

interface CustomModalInterface extends Props {
  children: React.ReactNode;
}

const CustomModal = (props: CustomModalInterface) => {
  return (
    <>
      <S.ModalContainer open={props.openModal} onClose={props.handleClose}>
        {props.children}
      </S.ModalContainer>
    </>
  );
};

export default CustomModal;
