import { FC, useContext, useEffect, useState } from "react";
import IconWrapper from "../../../utils/iconWrapper";
import AddDecisionsModal from "../../modals/decisions-modal";
import S from "./decisionsHeader.styled";
import { decisionsContext } from "../../../utils/context/decisionsContext";

interface CustomProps {
  viewTree(): void;
  viewList(): void;
  treeView: boolean;
}

const DecisionsHeader: FC<CustomProps> = ({ viewTree, viewList, treeView }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { groupData, setGroupData } = useContext(decisionsContext);

  // const addGroupData = (data: { [input: string]: string }) => {
  //   setGroupData([
  //     ...groupData,
  //     {
  //       groupTitle: data && data.decisionHeading,
  //       groupDescription: data.decision,
  //       timestamp: data.dob,
  //       groupName: "No Data",
  //     },
  //   ]);
  // };

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
      <AddDecisionsModal openModal={modalOpen} handleClose={() => setModalOpen(false)} cb={() => {}} />
    </>
  );
};

export default DecisionsHeader;
