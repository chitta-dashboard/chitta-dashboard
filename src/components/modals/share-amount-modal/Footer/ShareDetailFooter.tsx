import { FC } from "react";

import S from "./share-detail-footer.styled";

interface CustomProps {
  handleClose: () => void;
}

const ShareDetailFooter: FC<CustomProps> = ({ handleClose }) => {
  return (
    <S.ShareDetailFooterContainer>
      <S.CustomButton onClick={handleClose}>Cancel</S.CustomButton>
      <S.CustomButton>Ok</S.CustomButton>
    </S.ShareDetailFooterContainer>
  );
};
export default ShareDetailFooter;
