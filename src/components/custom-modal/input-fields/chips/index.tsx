import Props from "../../../modals/type/modalProps";
import S from "./chips.styled";

const Chips = (props: Props) => {
  return (
    <>
      <S.ChipContainer direction={"row"} spacing={1}>
        <S.StyledChip label="signature.jpg" variant="outlined" onDelete={props.handleClose} size="small" />
      </S.ChipContainer>
    </>
  );
};

export default Chips;
