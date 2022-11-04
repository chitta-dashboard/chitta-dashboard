import S from "./loader.styled";
import LeafLine from "../../assets/images/leafLine.svg";

const Loader = () => {
  return (
    <S.container>
      <S.AnimationContainer>
        <S.LeafContainer>
          <img src={LeafLine} alt="leafLine" />
          <S.SmallLeaf></S.SmallLeaf>
          <S.BigLeaf></S.BigLeaf>
        </S.LeafContainer>
        <S.StemContainer>
          <S.OuterStem>
            <S.InnerStem></S.InnerStem>
          </S.OuterStem>
        </S.StemContainer>
      </S.AnimationContainer>
    </S.container>
  );
};

export default Loader;
