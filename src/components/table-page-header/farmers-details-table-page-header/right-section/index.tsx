import { FC } from "react";
import SelectDropDown from "../../../common-components/select-dropdown";
import { useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import S from "./rightSection.styled";
interface RightSectionProps {
  addModalHandler?: () => void;
  shareAmountModalHandler?: () => void;
}

const RightSection: FC<RightSectionProps> = (props) => {
  const { selectedFarmers } = useFarmerDetailsContext();

  return (
    <S.RightSectionContainer>
      <S.DropdownStack>
        <SelectDropDown />
      </S.DropdownStack>
      <S.ButtonStack>
        <S.CustomButton
          disabled={selectedFarmers.length === 0}
          onClick={() => {
            props.shareAmountModalHandler && props.shareAmountModalHandler();
          }}
        >
          Share Holder
        </S.CustomButton>
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
