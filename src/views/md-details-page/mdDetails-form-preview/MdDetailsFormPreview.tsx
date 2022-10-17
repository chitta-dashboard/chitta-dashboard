import MdFormPreviewLeft from "./MdDetailsFormPreviewLeft";
import MdFormPreviewRight from "./MdDetailsFormPreviewRight";
import { S } from "./mdDetails-form-preview.styled";

const MdFormPreview = () => {
  return (
    <S.MdFormPreviewMainContainer>
      <MdFormPreviewLeft />
      <MdFormPreviewRight />
    </S.MdFormPreviewMainContainer>
  );
};

export default MdFormPreview;
