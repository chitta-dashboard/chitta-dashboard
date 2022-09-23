import React, { useState } from "react";
import TablePageHeader from "../../components/common-table-page-header";
import AddFarmersGroupModal from "../../components/modals/add-farmers-group-modal";
import FarmersGroupTable from "../../components/tables/farmers-group-table";

import S from "./farmersGroup.styled";

const FarmersGroup = () => {
  const [addFarmersGroup, setAddFarmersGroup] = useState(false);

  const addFarmersGroupModalHandler = () => {
    setAddFarmersGroup(!addFarmersGroup);
  };

  return (
    <S.FarmersGroupContainer>
      <TablePageHeader addFarmersGroupModalHandler={addFarmersGroupModalHandler} />
      <FarmersGroupTable />
      <AddFarmersGroupModal openModal={addFarmersGroup} handleClose={addFarmersGroupModalHandler} />
    </S.FarmersGroupContainer>
  );
};

export default FarmersGroup;
