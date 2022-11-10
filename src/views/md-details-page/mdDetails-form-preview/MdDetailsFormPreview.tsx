import { useParams } from "react-router-dom";
import MdFormPreviewLeft from "./MdDetailsFormPreviewLeft";
import MdFormPreviewRight from "./MdDetailsFormPreviewRight";
import { useFetch } from "../../../utils/hooks/query";
import ErrorPage from "../../../components/error-page";
import { ENDPOINTS } from "../../../utils/constants";
import { S } from "./mdDetails-form-preview.styled";

const MdFormPreview = () => {
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
