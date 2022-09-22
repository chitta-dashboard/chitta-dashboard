import { FC, useState } from "react";
import IconWrapper from "../../../utils/iconWrapper";
import AddFarmersGroupModal from "../../modals/add-farmers-group-modal";
import S from "./decisionsHeader.styled";
import groupData from "../decisions.json";

interface CustomProps {
  viewTree(): void;
  viewList(): void;
  treeView: boolean;
}

const DecisionsHeader: FC<CustomProps> = ({ viewTree, viewList, treeView }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <S.Header>
        <IconWrapper onClick={viewTree} isDummy={treeView}>
          back
        </IconWrapper>
        <S.Title>Board Resolution</S.Title>
        <S.ButtonBox>
          {groupData.length > 4 && treeView ? <S.Button onClick={viewList}>View All</S.Button> : null}
          <S.Button onClick={() => setModalOpen(true)}>Add</S.Button>
        </S.ButtonBox>
      </S.Header>
      <AddFarmersGroupModal label="" openModal={modalOpen} handleClose={() => setModalOpen(false)} />
    </>
  );
};

export default DecisionsHeader;
