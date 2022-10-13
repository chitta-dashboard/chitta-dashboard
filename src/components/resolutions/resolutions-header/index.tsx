import { FC, useState } from "react";
import IconWrapper from "../../../utils/iconWrapper";
import { useResolutionsProviderContext } from "../../../utils/context/resolutions";
import AddDecisionsModal from "../../modals/decisions-modal";
import S from "./resolutionsHeader.styled";

interface CustomProps {
  viewTree(): void;
  viewList(): void;
  treeView: boolean;
}

const ResolutionsHeader: FC<CustomProps> = ({ viewTree, viewList, treeView }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { resolutions, addResolution } = useResolutionsProviderContext();

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
      {modalOpen && <AddDecisionsModal openModal={true} handleClose={() => setModalOpen(false)} cb={addResolution} />}
    </>
  );
};

export default ResolutionsHeader;
