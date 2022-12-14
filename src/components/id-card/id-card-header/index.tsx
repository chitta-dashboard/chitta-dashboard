import IdLogo from "../../../assets/images/logo.svg";
import { useFetch } from "../../../utils/hooks/query";
import { decryptText, ENDPOINTS } from "../../../utils/constants";
import { adminFormInputs } from "../../../views/admin-panel";
import S from "./idCardHeader.styled";

const IDCardHeader = () => {
  const {
    formatChangeSuccess: isSuccess,
    result: { data: adminDetails },
  } = useFetch(ENDPOINTS.admin);

  const { headerLogo, name, regNo, cinNo } = isSuccess && Object.values(adminDetails as adminFormInputs)[0];

  return (
    <>
      {isSuccess && (
        <S.IdHeaderWrapper>
          <S.HeaderLeft>
            <S.LogoImage src={headerLogo ? decryptText(headerLogo) : IdLogo} alt="Id-logo" />
          </S.HeaderLeft>
          <S.HeaderRight>
            <S.IdHeading>
              {name ? (
                <>
                  {name} உழவர் <br /> உற்பத்தியாளர் நிறுவனம்
                </>
              ) : (
                <>
                  {" "}
                  நெற்கதிர் உழவர் <br /> உற்பத்தியாளர் நிறுவனம்{" "}
                </>
              )}
            </S.IdHeading>
            <S.IdSubHeading>{regNo ? regNo : <>139086</>}</S.IdSubHeading>
            <S.IdSubHeading>{cinNo ? `CIN : ${cinNo}` : <>CIN : UO1409TN2020PTC139086</>}</S.IdSubHeading>
          </S.HeaderRight>
        </S.IdHeaderWrapper>
      )}
    </>
  );
};

export default IDCardHeader;
