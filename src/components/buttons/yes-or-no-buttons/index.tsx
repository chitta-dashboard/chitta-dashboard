import { FC } from "react";

import S from "./YesOrNoButtons.Styled";

interface YesNOProps {
  deleteId?: number;
  openModal: boolean;
  handleClose?: () => void;
  deleteMdDetails?: (id: number) => void;
  deleteFarmersGroup?: (id: number) => void;
  deleteFarmersDetails?: (id: number) => void;
}

const YesOrNo: FC<YesNOProps> = (props) => {
  return (
    <>
      <S.ButtonContainer>
        <S.NoButton
          autoFocus
          onClick={() => {
            if (props.handleClose) props.handleClose();
          }}
        >
          No
        </S.NoButton>
        <S.YesButton
          autoFocus
          onClick={() => {
            if (props.deleteMdDetails) props.deleteMdDetails(props.deleteId as number);
            if (props.deleteFarmersGroup) props.deleteFarmersGroup(props.deleteId as number);
            if (props.deleteFarmersDetails) props.deleteFarmersDetails(props.deleteId as number);
          }}
        >
          Yes
        </S.YesButton>
      </S.ButtonContainer>
    </>
  );
};

export default YesOrNo;
