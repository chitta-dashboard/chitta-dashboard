import IdLogo from "../../../assets/images/logo.svg";
import { useAuthContext } from "../../../utils/context/auth";
import { decryptText } from "../../../utils/constants";
import S from "./idCardHeader.styled";

const IDCardHeader = () => {
  const { headerImage, titleName, regNo, cinNo } = useAuthContext();
  return (
    <S.IdHeaderWrapper>
      <S.HeaderLeft>
        <S.LogoImage src={headerImage ? decryptText(headerImage) : IdLogo} alt="Id-logo" />
      </S.HeaderLeft>
      <S.HeaderRight>
        <S.IdHeading>
          {titleName ? (
            titleName
          ) : (
            <>
              நெற்கதிர் உழவர் <br /> உற்பத்தியாளர் நிறுவனம்
            </>
          )}
        </S.IdHeading>
        <S.IdSubHeading>{regNo ? regNo : <>139086</>}</S.IdSubHeading>
        <S.IdSubHeading>{cinNo ? `CIN :${cinNo}` : <>CIN : UO1409TN2020PTC139086</>}</S.IdSubHeading>
      </S.HeaderRight>
    </S.IdHeaderWrapper>
  );
};

export default IDCardHeader;
