import { FC, useState } from "react";
import DecisionsTree from "../decisions-tree";
import DecisionsList from "../decisions-list";
import S from "./decisionsContent.styled";

interface CustomProps {
  view: "tree" | "list";
}

const DecisionsContent: FC<CustomProps> = ({ view }) => {
  const [decisionId, setDecisionId] = useState<string>("");

  return (
    <S.DecisionsContentContainer>
      {view === "tree" ? (
        <DecisionsTree decisionId={decisionId} setDecisionId={setDecisionId} />
      ) : (
        <DecisionsList decisionId={decisionId} setDecisionId={setDecisionId} />
      )}
    </S.DecisionsContentContainer>
  );
};

export default DecisionsContent;
