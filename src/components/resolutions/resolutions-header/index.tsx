import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconWrapper from "../../../utils/iconWrapper";
import ResolutionModal from "../../modals/resolution-modal";
import { changeTab } from "../../../utils/store/slice/resolution";
import { RootState } from "../../../utils/store";
import { ENDPOINTS } from "../../../utils/constants";
import { useAdd, useFetch } from "../../../utils/hooks/query";
import S from "./resolutionsHeader.styled";

const ResolutionsHeader: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { tab } = useSelector((state: RootState) => state.resolution);
  const {
    formatChangeSuccess,
    result: { data: resolutions },
  } = useFetch(ENDPOINTS.resolutions);
  const { mutate } = useAdd(ENDPOINTS.resolutions);

  return (
    <>
      <S.Header>
        <IconWrapper onClick={() => dispatch(changeTab("tree"))} isDummy={tab === "tree"}>
          back
        </IconWrapper>
        <S.Title>Board Resolution</S.Title>
        <S.ButtonBox>
          {formatChangeSuccess && Object.values(resolutions).length > 4 && tab === "tree" ? (
            <S.Button onClick={() => dispatch(changeTab("list"))}>View All</S.Button>
          ) : null}
          <S.Button onClick={() => setModalOpen(true)}>Add</S.Button>
        </S.ButtonBox>
      </S.Header>
      {modalOpen && <ResolutionModal openModal={true} handleClose={() => setModalOpen(false)} cb={(data) => mutate({ data: data })} />}
    </>
  );
};

export default ResolutionsHeader;
