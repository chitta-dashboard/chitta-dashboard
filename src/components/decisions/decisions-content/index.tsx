import { FC } from "react";
import DecisionsTree from "../decisions-tree";
import DecisionsList from "../decisions-list";
import S from "./decisionsContent.styled";

interface CustomProps {
  view: "tree" | "list";
}

const DecisionsContent: FC<CustomProps> = ({ view }) => {
  return (
    <>
      <S.DecisionsContentContainer>{view === "tree" ? <DecisionsTree /> : <DecisionsList />}</S.DecisionsContentContainer>
    </>
  );
};

export default DecisionsContent;
