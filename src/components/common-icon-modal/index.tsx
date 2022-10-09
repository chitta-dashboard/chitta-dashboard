import CommonModalProps from "./type/commonModalProps";
import S from "./commonIconModal.styled";

const CommonIconModal = (props: CommonModalProps) => {
  return (
    <S.CustomModalContainer open={props.open} onClose={props.handleClose}>
      {props.children}
    </S.CustomModalContainer>
  );
};
export default CommonIconModal;
