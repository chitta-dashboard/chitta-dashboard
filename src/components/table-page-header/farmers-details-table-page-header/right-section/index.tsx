import { FC } from "react";
import SelectDropDown from "../../../common-components/select-dropdown";

import { farmerDetail, useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import S from "./rightSection.styled";
interface RightSectionProps {
  addModalHandler?: () => void;
}

const RightSection: FC<RightSectionProps> = (props) => {
  const { selectedFarmers } = useFarmerDetailsContext();
  let shareButtonDisable = selectedFarmers.length > 0;

  return (
    <S.RightSectionContainer>
      <S.DropdownStack>
        <SelectDropDown />
      </S.DropdownStack>
      <S.ButtonStack>
        <S.CustomButton disabled={!shareButtonDisable}>Share Holder</S.CustomButton>
        <S.CustomButton>Export Farmers</S.CustomButton>
        <S.CustomButton
          onClick={() => {
            if (props.addModalHandler) props.addModalHandler();
          }}
        >
          Add
        </S.CustomButton>
      </S.ButtonStack>
    </S.RightSectionContainer>
  );
};

export default RightSection;
