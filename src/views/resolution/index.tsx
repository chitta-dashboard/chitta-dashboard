import { useState } from "react";
import ResolutionsHeader from "../../components/resolutions/resolutions-header";
import ResolutionsContent from "../../components/resolutions/resolutions-content";
import S from "./resolution.styled";

const Resolutions = () => {
  const [treeView, setTreeView] = useState(true);

  return (
    <S.Resolutions>
      <ResolutionsHeader viewTree={() => setTreeView(true)} viewList={() => setTreeView(false)} treeView={treeView} />
      <ResolutionsContent view={treeView ? "tree" : "list"} />
    </S.Resolutions>
  );
};

export default Resolutions;
