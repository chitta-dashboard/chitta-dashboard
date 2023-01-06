import { FC } from "react";
import S from "./farmer-row-modalstyled";
import ToggleSwitch from "../../../../utils/ToggleSwitch";
import { useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import ConfirmationIcon from "../../confirmation-modal/body/confirmationIcon";

interface CustomProps {}

const ShareDetailBody: FC<CustomProps> = () => {
  // state values
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
