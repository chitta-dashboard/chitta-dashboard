import { FC, useState } from "react";
import ResolutionsTree from "../resolutions-tree";
import ResolutionsList from "../resolutions-list";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";
import S from "./resolutionsContent.styled";

const ResolutionsContent: FC = () => {
  const [resolutionId, setResolutionId] = useState<string | null>("");
  const tab = useSelector((state: RootState) => state.resolution.tab);

  return (
    <S.ResolutionsContentContainer>
      {tab === "tree" ? (
        <ResolutionsTree resolutionId={resolutionId} setResolutionId={setResolutionId} />
      ) : (
        <ResolutionsList resolutionId={resolutionId} setResolutionId={setResolutionId} />
      )}
    </S.ResolutionsContentContainer>
  );
};

export default ResolutionsContent;
