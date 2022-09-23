import React, { useState } from "react";

import SelectDropDown from "../../../common-components/select-dropdown";
import AddFarmersDetailsModalPage1 from "../../../modals/add-farmers-details-modal/page-1-modal";

import S from "./rightSection.styled";

const RightSection = () => {
  const [addfarmersDetails, setAddFarmersDetails] = useState(false);

  const addFarmersDetailsModal = () => {
    setAddFarmersDetails(!addfarmersDetails);
  };

  return (
    <S.RightSectionContainer>
      <S.DropdownStack>
        <SelectDropDown />
      </S.DropdownStack>
      <S.ButtonStack>
        <S.CustomButton>Share Holder</S.CustomButton>
        <S.CustomButton>Export Farmers</S.CustomButton>
        <S.CustomButton onClick={addFarmersDetailsModal}>Add</S.CustomButton>
      </S.ButtonStack>
      <AddFarmersDetailsModalPage1 openModal={addfarmersDetails} handleClose={addFarmersDetailsModal} />
    </S.RightSectionContainer>
  );
};

export default RightSection;
