import { FC } from "react";
import { useMdDetailsContext } from "../../../utils/context/md-details";

import S from "./YesOrNoButtons.Styled";

interface YesNOProps {
  deleteId?: number;
  openModal: boolean;
  handleClose?: () => void;
  // deleteMdDetails?: (id: number) => void; // Remove
  deleteFarmersGroup?: (id: number) => void;
  deleteFarmersDetails?: (id: number) => void;
}

const YesOrNo: FC<YesNOProps> = (props) => {
  const { deleteMdDetail }: any = useMdDetailsContext(); //(any) type have to update.
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
            deleteMdDetail(props.deleteId);
            // if (props.deleteMdDetails) props.deleteMdDetails(props.deleteId as number); // Remove
            if (props.deleteFarmersGroup) props.deleteFarmersGroup(props.deleteId as number);
            if (props.deleteFarmersDetails) props.deleteFarmersDetails(props.deleteId as number);
            if (props.handleClose) props.handleClose();
          }}
        >
          Yes
        </S.YesButton>
      </S.ButtonContainer>
    </>
  );
};

export default YesOrNo;
