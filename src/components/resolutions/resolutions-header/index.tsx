import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconWrapper from "../../../utils/iconWrapper";
import ResolutionModal from "../../modals/resolution-modal";
import { addResolution, changeTab } from "../../../utils/store/slice/resolution";
import { RootState } from "../../../utils/store";
import S from "./resolutionsHeader.styled";

const ResolutionsHeader: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { resolutions, tab } = useSelector((state: RootState) => state.resolution);

  return (
    <>
      <S.Header>
        <IconWrapper onClick={() => dispatch(changeTab("tree"))} isDummy={tab === "tree"}>
          back
        </IconWrapper>
        <S.Title>Board Resolution</S.Title>
        <S.ButtonBox>
          {Object.values(resolutions).length > 4 && tab === "tree" ? <S.Button onClick={() => dispatch(changeTab("list"))}>View All</S.Button> : null}
          <S.Button onClick={() => setModalOpen(true)}>Add</S.Button>
        </S.ButtonBox>
      </S.Header>
      {modalOpen && <ResolutionModal openModal={true} handleClose={() => setModalOpen(false)} cb={(data) => dispatch(addResolution(data))} />}
    </>
  );
};

export default ResolutionsHeader;
