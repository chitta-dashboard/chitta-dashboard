import { useNavigate } from "react-router-dom";
import S from "./error-page.styled";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <S.CertificateNodataContainer>
      <S.NoDataErrorText>404 Page Not Found</S.NoDataErrorText>
      <S.NoDataErrorText2 onClick={() => navigate(-1)}>
        <i>back</i> Go Back
      </S.NoDataErrorText2>
    </S.CertificateNodataContainer>
  );
};

export default ErrorPage;
