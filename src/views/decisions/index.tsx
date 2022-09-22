import { useState } from "react";
import DecisionsHeader from "../../components/decisions/decisions-header";
import DecisionsContent from "../../components/decisions/decisions-content";
import S from "./decisions.styled";

const Decisions = () => {
  const [treeView, setTreeView] = useState(true);

  return (
    <>
      <S.Decisions>
        <DecisionsHeader viewTree={() => setTreeView(true)} viewList={() => setTreeView(false)} treeView={treeView} />
        <DecisionsContent view={treeView ? "tree" : "list"} />
      </S.Decisions>
    </>
  );
};

export default Decisions;
