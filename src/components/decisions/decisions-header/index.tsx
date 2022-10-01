import { FC, useState } from "react";
import IconWrapper from "../../../utils/iconWrapper";
import AddDecisionsModal from "../../modals/decisions-modal";
import S from "./decisionsHeader.styled";
import { useDecisionsProviderContext } from "../../../utils/context/decisionsContext";
import { IAddDecisionsFormInput } from "../../modals/type/formInputs";

interface CustomProps {
  viewTree(): void;
  viewList(): void;
  treeView: boolean;
}

const DecisionsHeader: FC<CustomProps> = ({ viewTree, viewList, treeView }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { decisions, addDecision } = useDecisionsProviderContext();

  const addGroupData = (data: IAddDecisionsFormInput) => {
    addDecision({
      groupName: data.groupName,
      groupTitle: data.decisionHeading,
      groupDescription: data.description,
      groupDescriptionRichText: data.descriptionRichText,
      timestamp: data.dob,
    });
  };

  return (
    <>
      <S.Header>
        <IconWrapper onClick={viewTree} isDummy={treeView}>
          back
        </IconWrapper>
        <S.Title>Board Resolution</S.Title>
        <S.ButtonBox>
          {decisions.length > 4 && treeView ? <S.Button onClick={viewList}>View All</S.Button> : null}
          <S.Button onClick={() => setModalOpen(true)}>Add</S.Button>
        </S.ButtonBox>
      </S.Header>
      <AddDecisionsModal openModal={modalOpen} handleClose={() => setModalOpen(false)} cb={addGroupData} />
    </>
  );
};

export default DecisionsHeader;
