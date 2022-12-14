import { FC } from "react";
import { useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import ToggleSwitch from "../../../../utils/ToggleSwitch";
import ConfirmationIcon from "../../confirmation-modal/body/confirmationIcon";
import S from "./farmer-row-modalstyled";

interface CustomProps {}

const ShareDetailBody: FC<CustomProps> = () => {
  const { farmerBankDetail, setFarmerBankDetail } = useFarmerDetailsContext();

  return (
    <S.FarmerBankDetailBodyContainer>
      <ConfirmationIcon />
      <S.ToggleSwitchContainer>
        Include bank details
        <ToggleSwitch
          selected={farmerBankDetail}
          toggleSelected={() => {
            setFarmerBankDetail(!farmerBankDetail);
          }}
        />
      </S.ToggleSwitchContainer>
    </S.FarmerBankDetailBodyContainer>
  );
};
export default ShareDetailBody;
