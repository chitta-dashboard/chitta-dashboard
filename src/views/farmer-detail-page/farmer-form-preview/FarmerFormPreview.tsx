import FarmerFormPreviewLeft from "./FarmerFormPreviewLeft";
import FarmerFormPreviewRight from "./FarmerFormPreviewRight";
import { S } from "./farmer-form-preview.styled";

const FarmerFormPreview = () => {
  return (
    <S.FarmerFormPreviewMainContainer>
      <FarmerFormPreviewLeft />
      <FarmerFormPreviewRight />
    </S.FarmerFormPreviewMainContainer>
  );
};

export default FarmerFormPreview;
