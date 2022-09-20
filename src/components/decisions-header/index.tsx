import arrowLeftGreen from "../../assets/images/arrowLeftGreen.svg";
import IconWrapper from "../../utils/iconWrapper";

import S from "./decisionsHeader.styled";

const DecisionsHeader = () => {
  return (
    <>
      <S.Header>
        <IconWrapper>back</IconWrapper>
        <S.Title>Board Resolution</S.Title>
        <S.Button>View All</S.Button>
        <S.Button>Add</S.Button>
      </S.Header>
    </>
  );
};

export default DecisionsHeader;
