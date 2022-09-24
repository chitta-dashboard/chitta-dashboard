import { FC } from "react";

import Props from "../../modals/type/modalProps";

import S from "./chips.styled";

const Chips: FC<Props> = (props) => {
  return (
    <>
      <S.ChipContainer direction={"row"} spacing={1}>
        <S.StyledChip label={props.label && props.label} variant="outlined" onDelete={props.handleClose} size="small" key={props.multiSelectKey} />
      </S.ChipContainer>
    </>
  );
};

export default Chips;
