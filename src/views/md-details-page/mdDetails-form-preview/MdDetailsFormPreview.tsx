import { useParams } from "react-router-dom";
import { S } from "./mdDetails-form-preview.styled";
import ErrorPage from "../../../components/error-page";
import { ENDPOINTS } from "../../../utils/constants";
import { useFetch } from "../../../utils/hooks/query";
import MdFormPreviewLeft from "./MdDetailsFormPreviewLeft";
import MdFormPreviewRight from "./MdDetailsFormPreviewRight";

const MdFormPreview = () => {
  // Queries
  const {
    formatChangeSuccess: isSuccess,
    result: { data: mdDetailsById },
  } = useFetch(ENDPOINTS.mdDetails);
  const { mdId } = useParams();

  return (
    <>
      {isSuccess && Object.keys(mdDetailsById).includes(mdId as string) ? (
        <S.MdFormPreviewMainContainer>
          <MdFormPreviewLeft />
          <MdFormPreviewRight />
        </S.MdFormPreviewMainContainer>
      ) : (
        <>{isSuccess && <ErrorPage />}</>
      )}
    </>
  );
};

export default MdFormPreview;
