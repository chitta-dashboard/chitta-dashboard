import { FC } from "react";
import { useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import S from "./farmer-row-modal-footer.styled";

interface CustomProps {
  handleClose: () => void;
  generateFunction: () => void;
}

const ShareDetailFooter: FC<CustomProps> = (props) => {
  //constants
  const { handleClose, generateFunction } = props;

  //state values
  const { setFarmerBankDetail } = useFarmerDetailsContext();

  return (
    <S.FarmerBankDetailFooterContainer>
      <S.CustomButton
        onClick={() => {
          handleClose();
          setFarmerBankDetail(false);
        }}
      >
        Cancel
      </S.CustomButton>
      <S.CustomButton onClick={generateFunction}>Ok</S.CustomButton>
    </S.FarmerBankDetailFooterContainer>
  );
};
export default ShareDetailFooter;
