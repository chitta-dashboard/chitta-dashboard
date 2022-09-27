import React, { useState } from "react";
import TablePageHeader from "../../components/common-table-page-header";
import AddFarmersGroupModal from "../../components/modals/add-farmers-group-modal";
import FarmersGroupTable from "../../components/tables/farmers-group-table";
import { FarmerGroupDetailsContextProvider } from "../../utils/context/farmers-group";

import S from "./farmersGroup.styled";

const FarmersGroup = () => {
  const [addFarmersGroup, setAddFarmersGroup] = useState(false);

  const addFarmersGroupModalHandler = () => {
    setAddFarmersGroup(!addFarmersGroup);
  };

  return (
    <FarmerGroupDetailsContextProvider>
      <S.FarmersGroupContainer>
        <TablePageHeader addFarmersGroupModalHandler={addFarmersGroupModalHandler} />
        <FarmersGroupTable />
        <AddFarmersGroupModal openModal={addFarmersGroup} handleClose={addFarmersGroupModalHandler} cb={() => {}} />
      </S.FarmersGroupContainer>
    </FarmerGroupDetailsContextProvider>
  );
};

export default FarmersGroup;
