import { FC } from "react";
import S from "./farmer-row-modal-footer.styled";

interface CustomProps {
  handleClose: () => void;
  generateFunction: () => void;
}

const ShareDetailFooter: FC<CustomProps> = ({ handleClose, generateFunction }) => {
  return (
    <S.FarmerBankDetailFooterContainer>
      <S.CustomButton onClick={handleClose}>Cancel</S.CustomButton>
      <S.CustomButton onClick={generateFunction}>Ok</S.CustomButton>
    </S.FarmerBankDetailFooterContainer>
  );
};
export default ShareDetailFooter;
