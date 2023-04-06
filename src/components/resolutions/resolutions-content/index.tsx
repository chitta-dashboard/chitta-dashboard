import { useState } from "react";
import ResolutionsTree from "../resolutions-tree";
import ResolutionsList from "../resolutions-list";
import S from "./resolutionsContent.styled";
import { useResolutionContext } from "../../../utils/context/resolution";

const ResolutionsContent = () => {
  //state values
  const { tab } = useResolutionContext();
  const [resolutionId, setResolutionId] = useState<string | null>("");

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
