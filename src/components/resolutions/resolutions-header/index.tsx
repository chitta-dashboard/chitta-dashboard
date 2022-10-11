import { FC, useState } from "react";
import IconWrapper from "../../../utils/iconWrapper";
import AddDecisionsModal from "../../modals/decisions-modal";
import { IResolution, useResolutionsProviderContext } from "../../../utils/context/resolutions";
import S from "./resolutionsHeader.styled";

interface CustomProps {
  viewTree(): void;
  viewList(): void;
  treeView: boolean;
}

const ResolutionsHeader: FC<CustomProps> = ({ viewTree, viewList, treeView }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { resolutions, addResolution } = useResolutionsProviderContext();

  const addGroupData = (data: IResolution) => addResolution(data);

  return (
    <>
      <S.Header>
        <IconWrapper onClick={viewTree} isDummy={treeView}>
          back
        </IconWrapper>
        <S.Title>Board Resolution</S.Title>
        <S.ButtonBox>
          {Object.values(resolutions).length > 4 && treeView ? <S.Button onClick={viewList}>View All</S.Button> : null}
          <S.Button onClick={() => setModalOpen(true)}>Add</S.Button>
        </S.ButtonBox>
      </S.Header>
      {/* The below logic is because of dynamic current time updation in modal */}
      {modalOpen && <AddDecisionsModal openModal={true} handleClose={() => setModalOpen(false)} cb={addGroupData} />}
    </>
  );
};

export default ResolutionsHeader;
