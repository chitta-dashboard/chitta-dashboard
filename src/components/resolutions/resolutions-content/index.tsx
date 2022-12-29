import { FC, useState } from "react";
import ResolutionsTree from "../resolutions-tree";
import ResolutionsList from "../resolutions-list";
import S from "./resolutionsContent.styled";
import { useResolutionContext } from "../../../utils/context/resolution";

const ResolutionsContent: FC = () => {
  const [resolutionId, setResolutionId] = useState<string | null>("");
  const { tab } = useResolutionContext();

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
