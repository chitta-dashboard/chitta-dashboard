import DecisionsHeader from "../../components/decisions-header";
import DecisionsTree from "../../components/decisions-tree";

import S from "./decisions.styled";

const Decisions = () => {
  return (
    <>
      <S.Decisions>
        <DecisionsHeader />
        <DecisionsTree />
      </S.Decisions>
    </>
  );
};

export default Decisions;
