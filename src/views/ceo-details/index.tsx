import S from "./ceo-details.styled";
import CeoDetailsCard from "./CeoDetailCard";

const CeoDetails = () => {
  return (
    <S.CeoDetailsContainer>
      <CeoDetailsCard />
      <S.CeoDetailAdd>
        <S.CustomButton>+</S.CustomButton>
      </S.CeoDetailAdd>
    </S.CeoDetailsContainer>
  );
};

export default CeoDetails;
