import { FC } from "react";
import S from "./share-detail-footer.styled";

interface CustomProps {
  handleClose: () => void;
  generateTamilCertificate: () => void;
}

const ShareDetailFooter: FC<CustomProps> = ({ handleClose, generateTamilCertificate }) => {
  return (
    <S.ShareDetailFooterContainer>
      <S.CustomButton onClick={handleClose}>Cancel</S.CustomButton>
      <S.CustomButton onClick={generateTamilCertificate}>Ok</S.CustomButton>
    </S.ShareDetailFooterContainer>
  );
};
export default ShareDetailFooter;
