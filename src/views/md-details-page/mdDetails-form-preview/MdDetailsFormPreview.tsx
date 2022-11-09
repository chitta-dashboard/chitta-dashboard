import MdFormPreviewLeft from "./MdDetailsFormPreviewLeft";
import MdFormPreviewRight from "./MdDetailsFormPreviewRight";
import { useFetch } from "../../../utils/hooks/query";
import { ENDPOINTS } from "../../../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { S } from "./mdDetails-form-preview.styled";

const MdFormPreview = () => {
  const {
    formatChangeSuccess: isSuccess,
    result: { data: mdDetailsById },
  } = useFetch(ENDPOINTS.mdDetails);
  const navigate = useNavigate();
  const { mdId } = useParams();

  return (
    <>
      {isSuccess && Object.keys(mdDetailsById).includes(mdId as string) ? (
        <S.MdFormPreviewMainContainer>
          <MdFormPreviewLeft />
          <MdFormPreviewRight />
        </S.MdFormPreviewMainContainer>
      ) : (
        <S.CertificateNodataContainer>
          <S.NoDataErrorText>404 Page Not Found</S.NoDataErrorText>
          <S.NoDataErrorText2 onClick={() => navigate(-1)}>
            <i>back</i> Go Back
          </S.NoDataErrorText2>
        </S.CertificateNodataContainer>
      )}
    </>
  );
};

export default MdFormPreview;
