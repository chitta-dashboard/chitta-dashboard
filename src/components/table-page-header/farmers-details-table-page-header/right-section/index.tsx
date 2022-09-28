import React, { useState } from "react";

import SelectDropDown from "../../../common-components/select-dropdown";
import AddFarmersDetailsModal from "../../../modals/farmers-details-modal";

import S from "./rightSection.styled";

const RightSection = () => {
  const [addfarmersDetails, setAddFarmersDetails] = useState(false);

  const addFarmersDetailsModal = () => {
    console.log("first");
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
      <AddFarmersDetailsModal openModal={addfarmersDetails} handleClose={addFarmersDetailsModal} cb={() => {}}/>
    </S.RightSectionContainer>
  );
};

export default RightSection;
