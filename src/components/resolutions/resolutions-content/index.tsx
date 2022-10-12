import { FC, useState } from "react";
import ResolutionsTree from "../resolutions-tree";
import ResolutionsList from "../resolutions-list";
import S from "./resolutionsContent.styled";

interface CustomProps {
  view: "tree" | "list";
}

const ResolutionsContent: FC<CustomProps> = ({ view }) => {
  const [resolutionId, setResolutionId] = useState<string>("");

  return (
    <S.ResolutionsContentContainer>
      {view === "tree" ? (
        <ResolutionsTree resolutionId={resolutionId} setResolutionId={setResolutionId} />
      ) : (
        <ResolutionsList resolutionId={resolutionId} setResolutionId={setResolutionId} />
      )}
    </S.ResolutionsContentContainer>
  );
};

export default ResolutionsContent;
